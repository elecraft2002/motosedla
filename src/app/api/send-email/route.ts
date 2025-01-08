// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const recursiveHTMLParser = (data: any, key?: string): string => {
  let string = "";
  if (typeof data !== "object")
    return `<li><strong>${key}</strong>: ${data}</li>`;
  if (key) string += `<h4>${key}:</h4>`;
  string += "<ul>";
  Object.keys(data).forEach((key) => {
    string += recursiveHTMLParser(data[key], key);
  });
  string += "</ul>";
  return string;
};

export async function POST(request: Request) {
  const { email, data } = await request.json();
  let message = recursiveHTMLParser(data);

  // Konfigurace transportéru nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // nebo jiná služba (např. SMTP server)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO_USER,
    subject: `Motosedla - ${email}`,
    text: message,
  };

  try {
    // Odeslání e-mailu
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, message: "E-mail odeslán!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "E-mail nebyl odeslán." },
      { status: 500 }
    );
  }
}
