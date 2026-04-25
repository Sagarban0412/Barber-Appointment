import * as nodemailer from 'nodemailer'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const formData = await request.json()
  console.log(formData)
  const otp = Math.floor(100000 + Math.random() * 900000);

  // Create a transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: formData.email,
    subject: 'Booking Confirmation',
    text: `Hello ${formData.name},\n\nYour OTP is ${otp}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: 'Email sent successfully', otp })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { message: 'Failed to send email' },
      { status: 500 }
    )
  }
}