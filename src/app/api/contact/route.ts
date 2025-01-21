import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface FormData {
  [x: string]: any;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  systemInfo: {
    browser: string;
    browserVersion: string;
    os: string;
    osVersion: string;
    device: string;
    userAgent: string;
    referrer: string;
    screenResolution: string;
    language: string;
    ipAddress?: string;
    currentUrl?: string;
  };
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
    subject: `📢 İletişim Talebi - ${formData.fullName}`,
    html: `
      <h2>Form Bilgileri</h2>
      <p><strong>Tam Ad:</strong> ${formData.fullName}</p>
      <p><strong>E-posta:</strong> ${formData.email}</p>
      <p><strong>Telefon Numarası:</strong> ${formData.phone}</p>
      <p><strong>Mesaj:</strong> ${formData.message}</p>
      
      <h2>Sistem Log Bilgileri</h2>
      <p><strong>IP Adresi:</strong> ${formData.systemInfo.ipAddress}</p>
      <p><strong>Mevcut Sayfa:</strong> ${formData.systemInfo.currentUrl}</p>
      <p><strong>Referans URL:</strong> ${formData.systemInfo.referrer}</p>
      <p><strong>Tarayıcı:</strong> ${formData.systemInfo.browser} ${formData.systemInfo.browserVersion}</p>
      <p><strong>İşletim Sistemi:</strong> ${formData.systemInfo.os}</p>
      <p><strong>Cihaz Tipi:</strong> ${formData.systemInfo.device}</p>
      <p><strong>Ekran Çözünürlüğü:</strong> ${formData.systemInfo.screenResolution}</p>
      <p><strong>Dil:</strong> ${formData.systemInfo.language}</p>
      <p><strong>User Agent:</strong> ${formData.systemInfo.userAgent}</p>
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
    
    // Get IP from X-Forwarded-For header or direct IP
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : request.headers.get('x-real-ip') || 'Unknown IP';
    
    // Get current URL
    const currentUrl = request.headers.get('referer') || 'Unknown URL';
    
    // Add IP and URL to systemInfo
    formData.systemInfo.ipAddress = ip;
    formData.systemInfo.currentUrl = currentUrl;

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
