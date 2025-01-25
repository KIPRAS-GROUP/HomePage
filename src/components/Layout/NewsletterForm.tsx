"use client";

import React, { useState } from "react";

const getBrowser = (userAgent: string) => {
  const browsers = [
    { name: "Chrome", regex: /Chrome\/([0-9.]+)/ },
    { name: "Firefox", regex: /Firefox\/([0-9.]+)/ },
    { name: "Safari", regex: /Version\/([0-9.]+).*Safari/ },
    { name: "Edge", regex: /Edge\/([0-9.]+)/ },
    { name: "IE", regex: /MSIE\s+([0-9.]+)/ },
    { name: "Opera", regex: /Opera\/([0-9.]+)/ },
  ];

  for (const browser of browsers) {
    const match = userAgent.match(browser.regex);
    if (match) {
      return browser.name;
    }
  }

  return "Unknown";
};

const getBrowserVersion = (userAgent: string) => {
  const browsers = [
    { name: "Chrome", regex: /Chrome\/([0-9.]+)/ },
    { name: "Firefox", regex: /Firefox\/([0-9.]+)/ },
    { name: "Safari", regex: /Version\/([0-9.]+).*Safari/ },
    { name: "Edge", regex: /Edge\/([0-9.]+)/ },
    { name: "IE", regex: /MSIE\s+([0-9.]+)/ },
    { name: "Opera", regex: /Opera\/([0-9.]+)/ },
  ];

  for (const browser of browsers) {
    const match = userAgent.match(browser.regex);
    if (match) {
      return match[1];
    }
  }

  return "Unknown";
};

const getOS = (userAgent: string) => {
  const osList = [
    { name: "Windows", regex: /Windows/ },
    { name: "Mac OS", regex: /Mac OS/ },
    { name: "Linux", regex: /Linux/ },
    { name: "Android", regex: /Android/ },
    { name: "iOS", regex: /iPhone|iPad|iPod/ },
  ];

  for (const os of osList) {
    if (os.regex.test(userAgent)) {
      return os.name;
    }
  }

  return "Unknown";
};

const getOSVersion = (userAgent: string) => {
  const osList = [
    { name: "Windows", regex: /Windows NT ([0-9.]+)/ },
    { name: "Mac OS", regex: /Mac OS X ([0-9._]+)/ },
    { name: "Linux", regex: /Linux ([0-9.]+)/ },
    { name: "Android", regex: /Android ([0-9.]+)/ },
    { name: "iOS", regex: /iPhone OS ([0-9_]+)/ },
  ];

  for (const os of osList) {
    const match = userAgent.match(os.regex);
    if (match) {
      return match[1];
    }
  }

  return "Unknown";
};

const getDevice = () => {
  const devices = [
    { name: "Desktop", regex: /Windows|Macintosh|Linux/ },
    { name: "Mobile", regex: /Android|iPhone|iPad|iPod/ },
  ];

  for (const device of devices) {
    if (device.regex.test(navigator.userAgent)) {
      return device.name;
    }
  }

  return "Unknown";
};

const NewsletterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setStatus({
        type: "error",
        message: "Lütfen e-posta adresinizi giriniz.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          systemInfo: {
            browser: getBrowser(navigator.userAgent),
            browserVersion: getBrowserVersion(navigator.userAgent),
            os: getOS(navigator.userAgent),
            osVersion: getOSVersion(navigator.userAgent),
            device: getDevice(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'Doğrudan Erişim',
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            language: navigator.language,
            ipAddress: "",  // IP adresi sunucu tarafında alınacak
            currentUrl: window.location.href,
            localDateTime: new Date().toLocaleString('tr-TR'),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timeZoneOffset: new Date().getTimezoneOffset().toString()
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({
          type: "success",
          message: data.message,
        });
        setEmail("");
        console.info("Bülten aboneliği başarılı:", email);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Bülten aboneliği hatası:", error);
      setStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="single-footer-widget">
        <h3>BÜLTENE ABONE OLUN</h3>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="input-newsletter"
            placeholder="E-postanız.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? (
              <span className="loading-spinner"></span>
            ) : (
              <>
                <i className="ri-arrow-right-line"></i>BÜLTENE ABONE OLUN
              </>
            )}
          </button>

          {status.message && (
            <div className={`message ${status.type}`}>
              {status.message}
            </div>
          )}
        </form>
      </div>

      <style jsx>{`
        .message {
          margin-top: 10px;
          padding: 8px;
          border-radius: 4px;
          font-size: 14px;
        }
        .success {
          background-color: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }
        .error {
          background-color: #f8d7da;
          color: #721c24;
          border: 1px solid #f5c6cb;
        }
        .loading-spinner {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          border-top-color: transparent;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default NewsletterForm;
