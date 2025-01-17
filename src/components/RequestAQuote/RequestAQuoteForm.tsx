"use client";
import React, { useState, useEffect } from "react";
import ContactInfo from "../ContactUs/ContactInfo";
import Image from "next/image";

import contactImg from "../../../public/images/contact/contact2.png";

const RequestAQuoteForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    position: "",
    message: "",
    cv: "",
    ip: "", // IP ekledik
    screenResolution: "", // Ekran çözünürlüğü ekledik
    deviceType: "", // Cihaz türü ekledik
  });
  const [cvLoader, setCvLoader] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sending, setSending] = useState("Şimdi gönderin!");
  // Ekran çözünürlüğü ve cihaz türünü almak için fonksiyon
  const fetchDeviceDetails = () => {
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const deviceType = window.innerWidth < 768 ? "Mobile" : "Desktop"; // Basit bir çözüm

    setFormData((prevData) => ({
      ...prevData,
      screenResolution,
      deviceType,
    }));
  };

  // IP adresini almak için fonksiyon
  const fetchIP = async () => {
    try {
      const response = await fetch("/api/get-ip");
      const data = await response.json();
      setFormData((prevData) => ({
        ...prevData,
        ip: data.ip, // Alınan IP'yi formData'ya ekliyoruz
      }));
    } catch (error) {
      console.error("IP adresi alınamadı:", error);
    }
  };

  useEffect(() => {
    fetchDeviceDetails(); // Component yüklendiğinde cihaz bilgilerini al
    fetchIP(); // IP adresini al
  }, []); // [] boş bağımlılıklar, yalnızca bir kez çalışmasını sağlar

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
    const file = e.target.files ? e.target.files[0] : null;

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result?.toString();
        if (base64) {
          setFormData((prevData) => ({
            ...prevData,
            cv: base64,
          }));
        }
      };
      reader.readAsDataURL(file);

      setCvLoader("Yükleniyor..");
      setTimeout(() => {
        setCvLoader(`Yüklendi!, cv: ${file.name}`);
      }, 1000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSending("Gönderiliyor");
    try {
      const res = await fetch("/api/hiring", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Form başarıyla gönderildi!");
        setSending("Gönderildi");

        setFormData({
          fullName: "",
          phone: "",
          email: "",
          position: "",
          message: "",
          cv: "",
          ip: "",
          screenResolution: "",
          deviceType: "",
        }); // Formu sıfırlıyoruz

        setSending("Şimdi Gönderin!");
        setCvLoader("");
      } else {
        alert("Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
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
                  <h2>Projelerimizde yer alın</h2>
                </div>

                <div className="row justify-content-center">
                  <div className="col-lg-7 col-md-6">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>
                          Ad-soyad<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          id="fullName"
                          className="form-control"
                          placeholder="Lütfen isim giriniz"
                          onChange={handleInputChange}
                          value={formData.fullName}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          EMAIL ADRESİNİZ<span>*</span>
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          name="email"
                          className="form-control"
                          placeholder="Lütfen mailinizi giriniz"
                          onChange={handleInputChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          TELEFON NUMARANIZ<span>*</span>
                        </label>
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          placeholder="0542 123 123 1212"
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
                          className="form-select form-control"
                          onChange={handleInputChange}
                          value={formData.position}
                        >
                          <option value="">Seçiniz..</option>
                          <option value="Developer">Developer</option>
                          <option value="Tasarımcı">Tasarımcı</option>
                          <option value="Reklam">Reklam</option>
                          <option value="Kişisel Asistan">
                            Kişisel Asistan
                          </option>
                          <option value="Broker">Broker</option>
                          <option value="Mimar">Mimar</option>
                          <option value="İç Mimar">İç Mimar</option>
                          <option value="Diğer">Diğer</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>
                          CV Gönderin<span>*</span>
                        </label>

                        <input
                          type="file"
                          accept=".pdf"
                          name="cv"
                          disabled={formData.cv ? true : false}
                          onChange={handleFileChange}
                          className="w-full bg-gray-700 text-white p-3 rounded focus:outline-none"
                        />
                        {cvLoader}
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
    </>
  );
};

export default RequestAQuoteForm;
