import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { RateLimiterMemory } from "rate-limiter-flexible";

// Rate limiter kurulumu
const rateLimiter = new RateLimiterMemory({
  points: 3, // 3 istek hakkı
  duration: 60, // 60 saniye içinde
});

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
    isp?: string;
    asn?: string;
    localDateTime: string;
    timeZone: string;
    timeZoneOffset: string;
  };
  reCaptchaToken: string;
}

// ReCAPTCHA doğrulama fonksiyonu
async function verifyRecaptcha(token: string) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

  try {
    const response = await fetch(verificationUrl, { method: "POST" });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("ReCAPTCHA doğrulama hatası:", error);
    return false;
  }
}

const sendEmail = async (formData: FormData) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: `${formData.email}`,
    to: "info@kipras.com.tr",
    subject: `📬 İletişim Formu - ${formData.fullName}`,
    html: `
      <h2>Form Bilgileri</h2>
      <p><strong>Tam Ad:</strong> ${formData.fullName}</p>
      <p><strong>E-posta:</strong> ${formData.email}</p>
      <p><strong>Telefon Numarası:</strong> ${formData.phone}</p>
      <p><strong>Mesaj:</strong> ${formData.message}</p>
      <br>
      <h3>Sistem Log Bilgileri</h3>
      <p><strong>Tarayıcı:</strong> ${formData.systemInfo.browser} ${formData.systemInfo.browserVersion}</p>
      <p><strong>İşletim Sistemi:</strong> ${formData.systemInfo.os}</p>
      <p><strong>Cihaz:</strong> ${formData.systemInfo.device}</p>
      <p><strong>Ekran Çözünürlüğü:</strong> ${formData.systemInfo.screenResolution}</p>
      <p><strong>Dil:</strong> ${formData.systemInfo.language}</p>
      <p><strong>IP Adresi:</strong> ${formData.systemInfo.ipAddress || 'Bilinmiyor'}</p>
      <p><strong>ISP:</strong> ${formData.systemInfo.isp || 'Bilinmiyor'}</p>
      <p><strong>ASN:</strong> ${formData.systemInfo.asn || 'Bilinmiyor'}</p>
      <p><strong>Zaman Dilimi:</strong> ${formData.systemInfo.timeZone}</p>
      <p><strong>Yerel Tarih/Saat:</strong> ${formData.systemInfo.localDateTime}</p>
      <p><strong>Referrer:</strong> ${formData.systemInfo.referrer || 'Doğrudan Erişim'}</p>
      <p><strong>Mevcut URL:</strong> ${formData.systemInfo.currentUrl || 'Bilinmiyor'}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

const getIpInfo = async (ip: string) => {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return {
      isp: data.isp || 'Bilinmiyor',
      asn: data.as || 'Bilinmiyor',
    };
  } catch (error) {
    console.error("IP bilgileri alınamadı:", error);
    return { isp: "Bilinmiyor", asn: "Bilinmiyor" };
  }
};

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Get IP from headers
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 
               request.headers.get('x-real-ip') || 
               'Bilinmiyor';

    // Get current URL and referrer from headers
    const currentUrl = request.headers.get('referer') || 'Bilinmiyor';
    formData.systemInfo.currentUrl = currentUrl;

    // Rate limiting kontrolü
    try {
      await rateLimiter.consume(ip);
    } catch (error) {
      return NextResponse.json(
        { error: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    // ReCAPTCHA doğrulama
    const isRecaptchaValid = await verifyRecaptcha(formData.reCaptchaToken);
    if (!isRecaptchaValid) {
      return NextResponse.json(
        { error: "ReCAPTCHA doğrulaması başarısız" },
        { status: 400 }
      );
    }

    // Form validasyonu
    if (!formData.fullName?.trim() || 
        !formData.email?.trim() || 
        !formData.phone?.trim() || 
        !formData.message?.trim()) {
      return NextResponse.json(
        { error: "Tüm alanları doldurmak zorunludur" },
        { status: 400 }
      );
    }

    // Email format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: "Geçerli bir email adresi giriniz" },
        { status: 400 }
      );
    }

    // Telefon format kontrolü
    const phoneRegex = /^[0-9\s+()-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      return NextResponse.json(
        { error: "Geçerli bir telefon numarası giriniz" },
        { status: 400 }
      );
    }

    // IP bilgilerini al ve forma ekle
    formData.systemInfo.ipAddress = ip;
    const ipInfo = await getIpInfo(ip);
    formData.systemInfo.isp = ipInfo.isp;
    formData.systemInfo.asn = ipInfo.asn;

    await sendEmail(formData);

    return NextResponse.json(
      { message: "Form başarıyla gönderildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form gönderme hatası:", error);
    return NextResponse.json(
      { error: "Form gönderilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
