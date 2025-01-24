"use client";

import React, { useState } from "react";

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
            ipAddress: "",  // IP adresi sunucu tarafında alınacak
            userAgent: navigator.userAgent,
            currentUrl: window.location.href,
            localDateTime: new Date().toLocaleString('tr-TR'),
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
