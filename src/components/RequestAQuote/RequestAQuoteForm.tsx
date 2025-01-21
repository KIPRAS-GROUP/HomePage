"use client";
import React, { useState, useEffect } from "react";
import ContactInfo from "../ContactUs/ContactInfo";
import Image from "next/image";

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
const RequestAQuoteForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: "",
    message: "",
    files: [] as File[],
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
  });
  const [cvLoader, setCvLoader] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sending, setSending] = useState("Şimdi gönderin!");

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

    setFormData((prev) => ({
      ...prev,
      files: selectedFiles,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSending("Gönderiliyor...");

    try {
      const response = await fetch("/api/request-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Form gönderimi başarısız");
      }

      setFormData({
        fullName: "",
        phone: "",
        email: "",
        position: "",
        message: "",
        files: [],
        systemInfo: formData.systemInfo,
      });

      setSending("Başarıyla gönderildi!");
      setTimeout(() => setSending("Şimdi gönderin!"), 3000);
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
                    <form onSubmit={handleSubmit}>
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
                          type="text"
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
                          defaultValue={formData.position}
                          className="form-select form-control h-[52px] bg-[#f8f9fa] border-[#ced4da] text-[#495057] text-[15px] rounded-md focus:ring-2 focus:ring-[#80bdff] focus:border-[#80bdff] block w-full px-4 cursor-pointer hover:bg-white hover:border-[#80bdff] transition-all duration-200 appearance-none"
                          onChange={handleInputChange}
                          value={formData.position}
                        >
                          <option value="" disabled className="text-[#6c757d]">Pozisyonu Seçiniz..</option>
                          <option value="Developer" className="py-3 px-4 text-[#212529]">Developer</option>
                          <option value="Tasarımcı" className="py-3 px-4 text-[#212529]">Tasarımcı</option>
                          <option value="Reklam" className="py-3 px-4 text-[#212529]">Reklam</option>
                          <option value="Kişisel Asistan" className="py-3 px-4 text-[#212529]">Kişisel Asistan</option>
                          <option value="Broker" className="py-3 px-4 text-[#212529]">Broker</option>
                          <option value="Mimar" className="py-3 px-4 text-[#212529]">Mimar</option>
                          <option value="İnşaat" className="py-3 px-4 text-[#212529]">İnşaat</option>
                          <option value="İç Mimar" className="py-3 px-4 text-[#212529]">İç Mimar</option>
                          <option value="Diğer" className="py-3 px-4 text-[#212529]">Diğer</option>
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

export default RequestAQuoteForm;
