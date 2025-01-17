import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  message: string;
}

// E-posta gönderme işlemi
const sendEmail = async (formData: FormData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // Gmail servisi
    auth: {
      user: process.env.GMAIL_USER, // Gmail hesabınız
      pass: process.env.GMAIL_PASS, // Gmail şifreniz veya App Password
    },
    tls: {
      rejectUnauthorized: false, // Bu satır bazı güvenlik hatalarını engelleyebilir
    },
  });

  const mailOptions = {
    from: `${formData.email}`,
    to: "info@kipras.com.tr", // E-posta gönderilecek adres
    subject: `${formData.email} - ${formData.fullName}`,
    html: `
      <p><strong>Tam Ad:</strong> ${formData.fullName}</p>
      <p><strong>E-posta:</strong> ${formData.email}</p>
      <p><strong>Telefon Numarası:</strong> ${formData.phone}</p>
      <p><strong>Mesaj:</strong> ${formData.message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Mail gönderilemedi:", error);
    throw new Error("Mail gönderilemedi");
  }
};

// POST isteğini işlemek için named export
export async function POST(request: Request) {
  try {
    const formData: FormData = await request.json();

    await sendEmail(formData);
    return NextResponse.json(
      { message: "Form başarıyla gönderildi!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Hata:", error);
    return NextResponse.json({ error: "Bir hata oluştu" }, { status: 500 });
  }
}
