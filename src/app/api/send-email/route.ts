// app/api/send-email/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {} from "next-recaptcha-v3";

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

async function validateCaptcha(captchaToken: string): Promise<boolean> {
  const minimumCaptchaScore = 0.7;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY || "";
  const data = new FormData();
  data.append("secret", secretKey);
  data.append("response", captchaToken);
  const captchaResponse = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      body: data,
    }
  );
  const res = await captchaResponse.json();
  console.log(`captcha score: ${res.score}`);
  return res.score && res.score >= minimumCaptchaScore;
}

export async function POST(request: Request) {
  const { email, data, token } = await request.json();
  const isValid = await validateCaptcha(token);
  let message = recursiveHTMLParser(data);
  console.log("isValid: ",isValid);
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
  return NextResponse.json({ success: true, data, captcha: isValid });
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
