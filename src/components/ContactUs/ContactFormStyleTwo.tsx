"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import ContactInfo from "./ContactInfo";
import Image from "next/image";

import contactImg from "../../../public/images/contact/contact.png";
import shape from "../../../public/images/contact/shape.png";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface SystemInfo {
  browser: string;
  browserVersion: string;
  os: string;
  osVersion: string;
  device: string;
  userAgent: string;
  referrer: string;
  screenResolution: string;
  language: string;
  localTime: string;
  timeZone: string;
  timeZoneFormatted: string;
}

const ContactFormStyleTwo: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const getSystemInfo = (): SystemInfo => {
    const userAgent = window.navigator.userAgent;
    const browserInfo = {
      chrome: /chrome/i.test(userAgent),
      safari: /safari/i.test(userAgent),
      firefox: /firefox/i.test(userAgent),
      opera: /opera/i.test(userAgent),
      ie: /msie/i.test(userAgent) || /trident/i.test(userAgent),
      edge: /edge/i.test(userAgent),
    };

    const osInfo = {
      windows: /windows/i.test(userAgent),
      mac: /macintosh/i.test(userAgent),
      linux: /linux/i.test(userAgent),
      android: /android/i.test(userAgent),
      ios: /iphone|ipad|ipod/i.test(userAgent),
    };

    const getBrowser = () => {
      if (browserInfo.edge) return 'Edge';
      if (browserInfo.chrome) return 'Chrome';
      if (browserInfo.firefox) return 'Firefox';
      if (browserInfo.safari) return 'Safari';
      if (browserInfo.opera) return 'Opera';
      if (browserInfo.ie) return 'Internet Explorer';
      return 'Unknown';
    };

    const getOS = () => {
      if (osInfo.windows) return 'Windows';
      if (osInfo.mac) return 'MacOS';
      if (osInfo.linux) return 'Linux';
      if (osInfo.android) return 'Android';
      if (osInfo.ios) return 'iOS';
      return 'Unknown';
    };

    // Get local time information
    const now = new Date();
    const localTime = now.toLocaleTimeString('tr-TR', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false 
    });
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const timeZoneOffset = now.getTimezoneOffset();
    const timeZoneOffsetHours = Math.abs(Math.floor(timeZoneOffset / 60));
    const timeZoneOffsetMinutes = Math.abs(timeZoneOffset % 60);
    const timeZoneFormatted = `UTC${timeZoneOffset <= 0 ? '+' : '-'}${String(timeZoneOffsetHours).padStart(2, '0')}:${String(timeZoneOffsetMinutes).padStart(2, '0')}`;

    return {
      browser: getBrowser(),
      browserVersion: userAgent.split(getBrowser())[1]?.split(' ')[0] || 'Unknown',
      os: getOS(),
      osVersion: userAgent,
      device: /mobile/i.test(userAgent) ? 'Mobile' : 'Desktop',
      userAgent: userAgent,
      referrer: document.referrer || 'Direct',
      screenResolution: `${window.screen.width}x${window.screen.height}`,
      language: navigator.language || 'Unknown',
      localTime,
      timeZone,
      timeZoneFormatted
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setResponseMessage(null);

    try {
      const systemInfo = getSystemInfo();
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          systemInfo: systemInfo,
        }),
      });

      if (response.ok) {
        setResponseMessage("Form başarıyla gönderildi!");
        setFormData({ name: "", email: "", phone: "", message: "" });
        setShowAlert(true);
      } else {
        const errorData = await response.json();
        setResponseMessage(errorData.error || "Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      setResponseMessage("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000); // 3 saniye sonra alert kapanır

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      <div className="contact-area bg-white-wrap">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-5 col-md-12 pe-5 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="contact-image">
                <Image
                  src={contactImg}
                  alt="contact"
                  width={700}
                  height={1012}
                />
              </div>
            </div>

            <div
              className="col-lg-7 col-md-12 position-relative ps-5 aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="contact-form-wrap">
                <div className="title">
                  <span>İLETİŞİM</span>
                  <h2>Bizimle iletişime geçin, her zaman sizinleyiz..</h2>
                </div>

                <div className="row align-items-center">
                  <div className="col-lg-7 col-md-6">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>
                          Ad Soyad<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Adınız Soyadınız"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          E-posta<span>*</span>
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="E-posta adresiniz"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Telefon<span>*</span>
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Telefon numaranız"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Mesajınız<span>*</span>
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          className="form-control"
                          placeholder="Mesajınız"
                          required
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="default-btn"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Gönderiliyor..." : "Gönder"}
                      </button>
                    </form>
                    {showAlert && (
                      <div className="alert alert-success mt-3" role="alert">
                        {responseMessage}
                      </div>
                    )}
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

        <div className="contact-shape1">
          <Image src={shape} alt="image" width={116} height={82} />
        </div>
      </div>
    </>
  );
};

export default ContactFormStyleTwo;
