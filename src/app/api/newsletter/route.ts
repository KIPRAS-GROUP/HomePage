import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Rate limiter kurulumu
const rateLimiter = new RateLimiterMemory({
  points: 3, // 3 istek hakkı
  duration: 60, // 60 saniye içinde
});

interface NewsletterData {
  email: string;
  systemInfo?: {
    ipAddress?: string;
    userAgent?: string;
    currentUrl?: string;
    localDateTime?: string;
  };
}

const sendEmail = async (data: NewsletterData) => {
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
    from: process.env.GMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `🔔 Yeni Mail Abonesi ${data.email}`,
    html: `
      <h2>Yeni Bülten Aboneliği</h2>
      <p>${data.email} mail adresi Kipras Group tarafından mail bültenine abone oldu.</p>
      <br>
      <h3>Sistem Log Bilgileri</h3>
      <p><strong>IP Adresi:</strong> ${data.systemInfo?.ipAddress || 'Bilinmiyor'}</p>
      <p><strong>Tarayıcı Bilgisi:</strong> ${data.systemInfo?.userAgent || 'Bilinmiyor'}</p>
      <p><strong>Kaynak URL:</strong> ${data.systemInfo?.currentUrl || 'Bilinmiyor'}</p>
      <p><strong>Yerel Tarih/Saat:</strong> ${data.systemInfo?.localDateTime || 'Bilinmiyor'}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

export async function POST(request: Request) {
  try {
    const data: NewsletterData = await request.json();
    const ip = data.systemInfo?.ipAddress || "";

    // Rate limiting kontrolü
    try {
      await rateLimiter.consume(ip);
    } catch (error) {
      console.error("Rate limit aşıldı:", ip);
      return NextResponse.json(
        { success: false, message: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    await sendEmail(data);
    console.info("Yeni bülten aboneliği:", { email: data.email, ip });

    return NextResponse.json({ 
      success: true, 
      message: 'Bülten aboneliğiniz başarıyla tamamlandı.' 
    });
  } catch (error) {
    console.error("Bülten aboneliği hatası:", error);
    return NextResponse.json({ 
      success: false, 
      message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.' 
    }, { status: 500 });
  }
}
