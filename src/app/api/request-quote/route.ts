import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface FormData {
  [x: string]: any;
  fullName: string;
  phone: string;
  email: string;
  position: string;
  message: string;
  files: Array<{
    name: string;
    type: string;
    data: string;
  }>;
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
    subject: `🎯 İş Başvurusu - ${formData.fullName} - ${formData.position}`,
    html: `
      <h2>Form Bilgileri</h2>
      <p><strong>Tam Ad:</strong> ${formData.fullName}</p>
      <p><strong>E-posta:</strong> ${formData.email}</p>
      <p><strong>Telefon Numarası:</strong> ${formData.phone}</p>
      <p><strong>Pozisyon:</strong> ${formData.position}</p>
      <p><strong>Mesaj:</strong> ${formData.message}</p>
      <br>
      <h3>Sistem Log Bilgileri</h3>
      <p><strong>Tarayıcı:</strong> ${formData.systemInfo.browser} ${formData.systemInfo.browserVersion}</p>
      <p><strong>İşletim Sistemi:</strong> ${formData.systemInfo.os} ${formData.systemInfo.osVersion}</p>
      <p><strong>Cihaz:</strong> ${formData.systemInfo.device}</p>
      <p><strong>Ekran Çözünürlüğü:</strong> ${formData.systemInfo.screenResolution}</p>
      <p><strong>Dil:</strong> ${formData.systemInfo.language}</p>
      <p><strong>IP Adresi:</strong> ${formData.systemInfo.ipAddress}</p>
      <p><strong>ISP:</strong> ${formData.systemInfo.isp}</p>
      <p><strong>ASN:</strong> ${formData.systemInfo.asn}</p>
      <p><strong>Zaman Dilimi:</strong> ${formData.systemInfo.timeZone}</p>
      <p><strong>Yerel Tarih/Saat:</strong> ${formData.systemInfo.localDateTime}</p>
      <p><strong>Referrer:</strong> ${formData.systemInfo.referrer}</p>
      <p><strong>Mevcut URL:</strong> ${formData.systemInfo.currentUrl}</p>
    `,
    attachments: formData.files.map(file => ({
      filename: file.name,
      content: file.data.split('base64,')[1],
      encoding: 'base64',
      contentType: file.type
    }))
  };

  await transporter.sendMail(mailOptions);
};

const getIpInfo = async (ip: string) => {
  try {
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await response.json();
    return {
      isp: data.isp,
      asn: data.as,
    };
  } catch (error) {
    console.error("IP bilgileri alınamadı:", error);
    return { isp: "Bilinmiyor", asn: "Bilinmiyor" };
  }
};

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const ipInfo = await getIpInfo(formData.systemInfo.ipAddress || "");
    
    formData.systemInfo = {
      ...formData.systemInfo,
      ...ipInfo,
    };

    await sendEmail(formData);

    return NextResponse.json(
      { message: "Form başarıyla gönderildi" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Form gönderme hatası:", error);
    return NextResponse.json(
      { message: "Form gönderilirken bir hata oluştu" },
      { status: 500 }
    );
  }
}
