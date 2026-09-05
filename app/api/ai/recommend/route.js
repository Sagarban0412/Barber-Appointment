import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getGemini } from "@/lib/gemini";
import Service from "@/models/serviceModel";
import "@/models/categoryModel";

export async function POST(request) {
  try {
    const body = await request.json();
    const { faceShape, hairType, lifestyle, maintenance, notes } = body;

    if (!faceShape || !hairType || !lifestyle || !maintenance) {
      return NextResponse.json(
        { message: "Please answer all questions" },
        { status: 400 },
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        {
          message:
            "AI service is not configured. Please contact the shop to enable it.",
        },
        { status: 503 },
      );
    }

    await connectDB();
    const services = await Service.find({ isActive: { $ne: false } })
      .populate("category", "name")
      .lean();

    if (services.length === 0) {
      return NextResponse.json(
        { message: "No services available to recommend right now" },
        { status: 503 },
      );
    }

    const catalog = services.map((s) => ({
      id: s._id.toString(),
      name: s.name,
      price: s.price,
      duration: s.duration,
      category: s.category?.name ?? "Other",
      description: s.description,
    }));

    const systemPrompt = `You are a friendly, expert barber consultant for a men's grooming shop.
You will receive a customer's answers to a short quiz and the live service catalog. Recommend ONE primary service and up to 2 add-on services from the catalog that suit the customer.
You may ONLY recommend service IDs that appear in the catalog provided. Never invent IDs.
Keep reasoning to 2-3 sentences, warm and practical, no emojis, no marketing fluff.
Return ONLY valid JSON matching this schema, no markdown:
{
  "recommendation": string,
  "reasoning": string,
  "recommendedServiceId": string,
  "addOnServiceIds": string[]
}`;

    const userPrompt = `Customer answers:
- Face shape: ${faceShape}
- Hair type: ${hairType}
- Lifestyle: ${lifestyle}
- Maintenance: ${maintenance}
${notes ? `- Notes: ${notes}` : ""}

Catalog (JSON):
${JSON.stringify(catalog)}

Return your recommendation.`;

    const gemini = getGemini();
    let text = "";
    console.log("userPrompt", userPrompt);
    try {
      const response = await gemini.models.generateContent({
        model: "gemini-2.0-flash",
        contents: userPrompt,
        config: { systemInstruction: systemPrompt, temperature: 0.7 },
      });
      text = response.text ?? "";
    } catch (err) {
      console.error("gemini error:", err);
      return NextResponse.json(
        {
          message:
            "AI service is temporarily unavailable. Please try again in a moment.",
        },
        { status: 502 },
      );
    }

    const cleaned = text
      .trim()
      .replace(/^```(?:json)?/i, "")
      .replace(/```$/, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("gemini returned non-JSON:", text);
      return NextResponse.json(
        {
          message:
            "Could not understand the recommendation. Please try again.",
        },
        { status: 502 },
      );
    }

    const validIds = new Set(catalog.map((s) => s.id));
    const primary = validIds.has(parsed.recommendedServiceId)
      ? catalog.find((s) => s.id === parsed.recommendedServiceId)
      : null;

    if (!primary) {
      const fallback = catalog[0];
      return NextResponse.json({
        recommendation: `${fallback.name} — a versatile choice for any style.`,
        reasoning:
          "Our most popular service that works for a wide range of styles.",
        recommendedServiceId: fallback.id,
        addOnServiceIds: [],
        services: [fallback],
        estimatedMinutes: fallback.duration,
        estimatedPrice: fallback.price,
      });
    }

    const addOns = Array.isArray(parsed.addOnServiceIds)
      ? parsed.addOnServiceIds
        .filter((id) => id !== primary.id && validIds.has(id))
        .slice(0, 2)
        .map((id) => catalog.find((s) => s.id === id))
        .filter(Boolean)
      : [];

    const servicesForUi = [primary, ...addOns];
    const totalMinutes = servicesForUi.reduce((sum, s) => sum + s.duration, 0);
    const totalPrice = servicesForUi.reduce((sum, s) => sum + s.price, 0);

    return NextResponse.json({
      recommendation: String(parsed.recommendation ?? primary.name),
      reasoning: String(parsed.reasoning ?? ""),
      recommendedServiceId: primary.id,
      addOnServiceIds: addOns.map((s) => s.id),
      services: servicesForUi,
      estimatedMinutes: totalMinutes,
      estimatedPrice: totalPrice,
    });
  } catch (err) {
    console.error("recommend error:", err);
    return NextResponse.json(
      { message: err.message || "Failed to get a recommendation" },
      { status: 500 },
    );
  }
}
