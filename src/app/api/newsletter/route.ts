import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { headers } from 'next/headers';

// Rate limiter kurulumu
const rateLimiter = new RateLimiterMemory({
  points: 3, // 3 istek hakkı
  duration: 60, // 60 saniye içinde
});

interface NewsletterData {
  email: string;
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
}

const getIpInfo = async (ip: string) => {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return {
      isp: data.isp || 'Bilinmiyor',
      asn: data.as || 'Bilinmiyor',
    };
  } catch (error) {
    console.error('IP bilgisi alınamadı:', error);
    return {
      isp: 'Bilinmiyor',
      asn: 'Bilinmiyor',
    };
  }
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const getClientIp = (request: Request): string => {
  const headersList = headers();
  const forwardedFor = headersList.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const xRealIp = headersList.get('x-real-ip');
  if (xRealIp) {
    return xRealIp;
  }

  return 'Bilinmiyor';
};

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
      <p><strong>Tarayıcı:</strong> ${data.systemInfo.browser} ${data.systemInfo.browserVersion}</p>
      <p><strong>İşletim Sistemi:</strong> ${data.systemInfo.os} ${data.systemInfo.osVersion}</p>
      <p><strong>Cihaz:</strong> ${data.systemInfo.device}</p>
      <p><strong>Ekran Çözünürlüğü:</strong> ${data.systemInfo.screenResolution}</p>
      <p><strong>Dil:</strong> ${data.systemInfo.language}</p>
      <p><strong>IP Adresi:</strong> ${data.systemInfo.ipAddress || 'Bilinmiyor'}</p>
      <p><strong>ISP:</strong> ${data.systemInfo.isp || 'Bilinmiyor'}</p>
      <p><strong>ASN:</strong> ${data.systemInfo.asn || 'Bilinmiyor'}</p>
      <p><strong>Zaman Dilimi:</strong> ${data.systemInfo.timeZone}</p>
      <p><strong>Yerel Tarih/Saat:</strong> ${data.systemInfo.localDateTime}</p>
      <p><strong>Referrer:</strong> ${data.systemInfo.referrer || 'Doğrudan Erişim'}</p>
      <p><strong>Mevcut URL:</strong> ${data.systemInfo.currentUrl || 'Bilinmiyor'}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email gönderme hatası:', error);
    throw new Error('Email gönderilemedi. Lütfen daha sonra tekrar deneyiniz.');
  }
};

export async function POST(request: Request) {
  try {
    const data: NewsletterData = await request.json();

    // Email validasyonu
    if (!validateEmail(data.email)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Geçersiz email adresi. Lütfen doğru bir email adresi giriniz.' 
      }, { status: 400 });
    }

    // IP adresini al ve systemInfo'ya ekle
    const clientIp = getClientIp(request);
    data.systemInfo.ipAddress = clientIp;

    // IP bilgilerini al
    if (clientIp && clientIp !== 'Bilinmiyor') {
      const ipInfo = await getIpInfo(clientIp);
      data.systemInfo.isp = ipInfo.isp;
      data.systemInfo.asn = ipInfo.asn;
    }

    // Rate limiting kontrolü
    try {
      await rateLimiter.consume(clientIp);
    } catch (error) {
      console.error("Rate limit aşıldı:", clientIp);
      return NextResponse.json(
        { success: false, message: "Çok fazla istek gönderdiniz. Lütfen daha sonra tekrar deneyin." },
        { status: 429 }
      );
    }

    await sendEmail(data);
    console.info("Yeni bülten aboneliği:", { 
      email: data.email, 
      ip: clientIp,
      browser: `${data.systemInfo.browser} ${data.systemInfo.browserVersion}`,
      os: `${data.systemInfo.os} ${data.systemInfo.osVersion}`,
      device: data.systemInfo.device,
      language: data.systemInfo.language,
      timeZone: data.systemInfo.timeZone
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Bülten aboneliğiniz başarıyla tamamlandı.' 
    });
  } catch (error) {
    console.error("Bülten aboneliği hatası:", error);
    const errorMessage = error instanceof Error ? error.message : 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.';
    return NextResponse.json({ 
      success: false, 
      message: errorMessage 
    }, { status: 500 });
  }
}
