import * as nodemailer from "nodemailer";

let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;
  cachedTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  return cachedTransporter;
}

export async function sendOtpEmail({ to, name, otp, subject = "Your verification code" }) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text: `Hello ${name || ""},\n\nYour verification code is ${otp}\n\nThis code expires in 5 minutes.`,
  });
}
