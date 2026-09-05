import Stripe from "stripe";

let cached = null;

export function getStripe() {
  if (cached) return cached;
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  cached = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2024-06-20",
  });
  return cached;
}
