"use client";
import React, { useState, useEffect, useRef } from "react";
import ContactInfo from "../ContactUs/ContactInfo";
import Image from "next/image";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import contactImg from "../../../public/images/contact/contact2.png";

/**
 * İş Başvuru Formu Bileşeni
 * ----------------------------
 * Özellikler:
 * - Kişisel bilgi girişi (ad, telefon, email)
 * - Pozisyon seçimi dropdown
 * - Çoklu dosya yükleme (CV, portfolyo vb.)
 * - Sistem bilgisi loglama (tarayıcı, IP, cihaz)
 * - Form doğrulama ve hata kontrolü
 */
const initialFormState = {
  fullName: "",
  phone: "",
  email: "",
  position: "",
  message: "",
  files: [] as { name: string; type: string; data: string }[],
  systemInfo: {
    browser: "",
    browserVersion: "",
    os: "",
    osVersion: "",
    device: "",
    userAgent: "",
    referrer: "",
    screenResolution: "",
    language: "",
    ipAddress: "",
    currentUrl: "",
    timeZone: "",
    timeZoneOffset: "",
    localDateTime: "",
  },
};

const RequestAQuoteFormContent = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [cvLoader, setCvLoader] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sending, setSending] = useState("Şimdi gönderin!");
  const [submitCount, setSubmitCount] = useState(0);
  const lastSubmitTime = useRef<number>(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const formRef = useRef<HTMLFormElement>(null);

  // Form sıfırlama fonksiyonu
  const resetForm = () => {
    setFormData(initialFormState);
    if (formRef.current) {
      formRef.current.reset();
    }
    setSending("Şimdi gönderin!");
    setIsSubmitting(false);
  };

  useEffect(() => {
    // Get system information when component mounts
    const userAgent = window.navigator.userAgent;
    const browserInfo = detectBrowser(userAgent);
    const osInfo = detectOS(userAgent);

    setFormData((prev) => ({
      ...prev,
      systemInfo: {
        ...prev.systemInfo,
        browser: browserInfo.browser,
        browserVersion: browserInfo.version,
        os: osInfo.os,
        osVersion: osInfo.version,
        device: detectDevice(),
        userAgent: userAgent,
        referrer: document.referrer,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        language: navigator.language,
        currentUrl: window.location.href,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        timeZoneOffset: new Date().getTimezoneOffset().toString(),
        localDateTime: new Date().toLocaleString(),
      },
    }));

    // Get IP address
    fetch("/api/get-ip")
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({
          ...prev,
          systemInfo: {
            ...prev.systemInfo,
            ipAddress: data.ip,
          },
        }));
      })
      .catch(console.error);
  }, []);

  const detectBrowser = (userAgent: string) => {
    const browsers = [
      { name: "Chrome", pattern: "Chrome" },
      { name: "Firefox", pattern: "Firefox" },
      { name: "Safari", pattern: "Safari" },
      { name: "Edge", pattern: "Edg" },
      { name: "Opera", pattern: "Opera" },
    ];

    for (const browser of browsers) {
      const match = userAgent.match(new RegExp(`${browser.pattern}\\/([\\d.]+)`));
      if (match) {
        return { browser: browser.name, version: match[1] };
      }
    }
    return { browser: "Unknown", version: "Unknown" };
  };

  const detectOS = (userAgent: string) => {
    const os = [
      { name: "Windows", pattern: "Windows" },
      { name: "MacOS", pattern: "Mac" },
      { name: "Linux", pattern: "Linux" },
      { name: "iOS", pattern: "iPhone|iPad|iPod" },
      { name: "Android", pattern: "Android" },
    ];

    for (const system of os) {
      if (new RegExp(system.pattern).test(userAgent)) {
        const match = userAgent.match(new RegExp(`${system.pattern}\\s?([\\d._]+)?`));
        return { os: system.name, version: match?.[1] || "Unknown" };
      }
    }
    return { os: "Unknown", version: "Unknown" };
  };

  const detectDevice = () => {
    const width = window.innerWidth;
    if (width < 768) return "Mobile";
    if (width < 1024) return "Tablet";
    return "Desktop";
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/gif",
    ];

    const selectedFiles = Array.from(files).filter((file) =>
      allowedTypes.includes(file.type)
    );

    if (selectedFiles.length !== files.length) {
      alert("Sadece PDF, Word ve görsel dosyaları yükleyebilirsiniz.");
    }

    // Dosyaları base64'e çevir ve isimlerini sakla
    Promise.all(
      selectedFiles.map((file) => {
        return new Promise<{ name: string; type: string; data: string }>(
          (resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                name: file.name,
                type: file.type,
                data: reader.result as string,
              });
            };
            reader.readAsDataURL(file);
          }
        );
      })
    ).then((fileData) => {
      setFormData((prev) => ({
        ...prev,
        files: fileData,
      }));
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Rate limiting kontrolü - 1 dakikada en fazla 3 gönderim
    const now = Date.now();
    if (now - lastSubmitTime.current < 20000) { // 20 saniye bekleme süresi
      alert("Lütfen yeni bir form göndermeden önce biraz bekleyin.");
      return;
    }
    if (submitCount >= 3) {
      alert("Çok fazla form gönderimi yaptınız. Lütfen daha sonra tekrar deneyin.");
      return;
    }

    // Form validasyonu
    if (
      !formData.fullName.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.position ||
      !formData.message.trim() ||
      formData.files.length === 0
    ) {
      alert("Lütfen tüm alanları doldurun ve en az bir dosya yükleyin!");
      return;
    }

    // Email formatını kontrol et
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Lütfen geçerli bir email adresi girin!");
      return;
    }

    // Telefon numarası formatını kontrol et
    const phoneRegex = /^[0-9\s+()-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Lütfen geçerli bir telefon numarası girin!");
      return;
    }

    if (!executeRecaptcha) {
      alert("ReCAPTCHA yüklenemedi. Lütfen sayfayı yenileyip tekrar deneyin.");
      return;
    }

    setIsSubmitting(true);
    setSending("Gönderiliyor...");

    try {
      // ReCAPTCHA token'ı al
      const reCaptchaToken = await executeRecaptcha('form_submit');

      const response = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          reCaptchaToken
        }),
      });

      if (!response.ok) {
        throw new Error("Form gönderimi başarısız");
      }

      // Form başarıyla gönderildi
      resetForm();
      setSending("Başarıyla gönderildi!");
      setTimeout(() => setSending("Şimdi gönderin!"), 3000);
      
      // Rate limiting sayaçlarını güncelle
      setSubmitCount(prev => prev + 1);
      lastSubmitTime.current = Date.now();

    } catch (error) {
      console.error("Form gönderme hatası:", error);
      setSending("Hata oluştu!");
      setTimeout(() => setSending("Şimdi gönderin!"), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="contact-area bg-white-wrap ptb-100">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-12 pe-5">
              <div className="contact-image">
                <Image
                  src={contactImg}
                  alt="contact"
                  width={700}
                  height={1012}
                />
              </div>
            </div>

            <div className="col-lg-7 col-md-12 ps-5 position-relative">
              <div className="contact-form-wrap">
                <div className="title">
                  <h2>Kariyer İletişim Talebi</h2>
                </div>

                <div className="row justify-content-center">
                  <div className="col-lg-7 col-md-6">
                    <form onSubmit={handleSubmit} ref={formRef}>
                      <div className="form-group">
                        <label>
                          Ad Soyad<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          className="form-control"
                          placeholder="Lütfen adınızı ve soyadınızı giriniz"
                          onChange={handleInputChange}
                          value={formData.fullName}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          E-posta adresiniz<span>*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          name="email"
                          className="form-control"
                          placeholder="Lütfen e-posta adresinizi giriniz"
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Telefon Numaranız<span>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          className="form-control"
                          placeholder="Lütfen telefon numaranızı giriniz"
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Pozisyon<span>*</span>
                        </label>

                        <select
                          id="position"
                          name="position"
                          defaultValue=""
                          className="form-select form-control h-[52px] bg-[#f8f9fa] border-[#ced4da] text-[#495057] text-[15px] rounded-md focus:ring-2 focus:ring-[#80bdff] focus:border-[#80bdff] block w-full px-4 cursor-pointer hover:bg-white hover:border-[#80bdff] transition-all duration-200 appearance-none"
                          onChange={handleInputChange}
                          value={formData.position}
                          required
                        >
                          <option value="" disabled className="text-[#6c757d]">
                            Pozisyonu Seçiniz..
                          </option>
                          <option value="Developer" className="py-3 px-4 text-[#212529]">
                            Developer
                          </option>
                          <option value="Tasarımcı" className="py-3 px-4 text-[#212529]">
                            Tasarımcı
                          </option>
                          <option value="Reklam" className="py-3 px-4 text-[#212529]">
                            Reklam
                          </option>
                          <option
                            value="Kişisel Asistan"
                            className="py-3 px-4 text-[#212529]"
                          >
                            Kişisel Asistan
                          </option>
                          <option value="Broker" className="py-3 px-4 text-[#212529]">
                            Broker
                          </option>
                          <option value="Mimar" className="py-3 px-4 text-[#212529]">
                            Mimar
                          </option>
                          <option value="İnşaat" className="py-3 px-4 text-[#212529]">
                            İnşaat
                          </option>
                          <option
                            value="İç Mimar"
                            className="py-3 px-4 text-[#212529]"
                          >
                            İç Mimar
                          </option>
                          <option value="Diğer" className="py-3 px-4 text-[#212529]">
                            Diğer
                          </option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          Dosyalar<span>*</span>
                        </label>

                        <input
                          type="file"
                          className="form-control"
                          id="cv"
                          name="cv"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                          multiple
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Mesaj<span>*</span>
                        </label>
                        <textarea
                          className="form-control h-[120px] bg-[#f8f9fa] border-[#ced4da] text-[#495057] text-[15px] rounded-md focus:ring-2 focus:ring-[#80bdff] focus:border-[#80bdff] block w-full px-4 py-3 cursor-text hover:bg-white hover:border-[#80bdff] transition-all duration-200 resize-none"
                          name="message"
                          placeholder="Kendinizi tanıtın..."
                          value={formData.message}
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <button type="submit" className="default-btn">
                        {sending}
                      </button>
                    </form>
                  </div>

                  <div className="col-lg-5 col-md-6">
                    {/* ContactInfo */}
                    <ContactInfo />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .form-select {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m2 5 6 6 6-6'/%3e%3c/svg%3e");
          background-position: right 1rem center;
          background-repeat: no-repeat;
          background-size: 16px 12px;
        }

        .form-select option {
          margin: 8px 0;
          background-color: white;
          color: #212529;
          font-size: 15px;
          cursor: pointer;
        }

        .form-select option:first-child {
          color: #6c757d;
        }

        .form-select option:hover,
        .form-select option:focus {
          background-color: #f8f9fa;
        }

        .form-select:focus {
          box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
          outline: 0;
        }

        @media (max-width: 768px) {
          .form-select {
            font-size: 16px; /* Prevents zoom on mobile */
          }
        }
      `}</style>
    </>
  );
};

const RequestAQuoteForm = () => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}>
      <RequestAQuoteFormContent />
    </GoogleReCaptchaProvider>
  );
};

export default RequestAQuoteForm;
