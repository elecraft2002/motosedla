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
  return string.replaceAll("-", " ");
};

async function validateCaptcha(captchaToken: string): Promise<any> {
  const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${"6LdxQugqAAAAAEpa7OnyaBlIe0m3HhY2IevbLlq-"}&response=${captchaToken}`;
  const response = await fetch(verifyUrl, { method: "POST" });
  return await response.json();
}

export async function POST(request: Request) {
  const { email, data, token, link } = await request.json();
  const reCaptcha: any = await validateCaptcha(token);
  if (reCaptcha.score < 0.7)
    return NextResponse.json(
      { success: false, message: "Neplatná reCAPTCHA." },
      { status: 500 }
    );
  let message = recursiveHTMLParser({ email, ...data });
  const htmlLink = `<a href="${link}">Detail sedla</a>`;
  console.log("reCaptcha: ", reCaptcha);
  // Konfigurace transportéru nodemailer
  // const transporter = nodemailer.createTransport({
  //   service: "gmail", // nebo jiná služba (např. SMTP server)
  //   auth: {
  //     user: process.env.EMAIL_USER,
  //     pass: process.env.EMAIL_PASS,
  //   },
  // });
  const transporter = nodemailer.createTransport({
    host: "smtp.forpsi.com",
    port: 587, // Doporučený port s TLS
    secure: false, // Musí být false pro TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // Umožní spojení i v případě neověřeného certifikátu
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: `${process.env.EMAIL_TO_USER}, ${email}`,
    subject: `Motosedla - Zpráva`,
    html: message + htmlLink,
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
