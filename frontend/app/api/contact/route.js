import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    const { name, email, subject, message } = body;

   
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        {
          status: 400,
        }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"FantasyPilot Contact Form" <${process.env.EMAIL_USER}>`,

      to: process.env.EMAIL_USER,

      replyTo: email,

      subject: `📩 ${subject}`,

      html: `
      <div style="font-family:Arial,sans-serif;padding:20px">

        <h2 style="color:#15803d">
          📬 New Contact Form Submission
        </h2>

        <hr>

        <p>
          <strong>Name:</strong> ${name}
        </p>

        <p>
          <strong>Email:</strong> ${email}
        </p>

        <p>
          <strong>Subject:</strong> ${subject}
        </p>

        <p>
          <strong>Message:</strong>
        </p>

        <div
          style="
          background:#f3f4f6;
          padding:15px;
          border-radius:8px;
          "
        >
          ${message.replace(/\n/g, "<br>")}
        </div>

      </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message.",
      },
      {
        status: 500,
      }
    );
  }
}