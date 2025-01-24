"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import quoteIcon from "../../../public/images/client/quote.svg";

const clientsFeedbackData = [
  {
    id: "1",
    feedbackText:
      "Kipras Group ile çalışmak gerçekten harika bir deneyimdi. Projemizin her aşamasında profesyonel yaklaşımları ve yaratıcı çözümleriyle beklentilerimizin ötesine geçtiler. Özellikle detaylara verdikleri önem ve zamanında teslim konusundaki hassasiyetleri takdire şayan.",
    image: "/images/client/user1.png",
    name: "Ahmet Yılmaz",
    designation: "İş Merkezi Yöneticisi",
  },
  {
    id: "2",
    feedbackText:
      "Ofisimizin renovasyon projesinde Kipras Group'u tercih ettik ve sonuçtan çok memnun kaldık. Modern tasarım anlayışları ve kaliteli malzeme seçimleriyle mekanımıza bambaşka bir değer kattılar. İş sürecindeki şeffaf iletişimleri de ayrıca takdir edilesi.",
    image: "/images/client/user2.png",
    name: "Ayşe Kaya",
    designation: "Şirket Sahibi",
  },
  {
    id: "3",
    feedbackText:
      "Villa projemizde Kipras Group ekibiyle çalışmak muhteşemdi. Mimari vizyonları ve teknik uzmanlıkları sayesinde hayalimizdeki evi tam istediğimiz gibi tasarladılar. Süreç boyunca gösterdikleri özen ve sundukları çözümler için teşekkür ederiz.",
    image: "/images/client/user3.png",
    name: "Mehmet Demir",
    designation: "Konut Sahibi",
  },
  {
    id: "4",
    feedbackText:
      "Restoranımızın iç mekan tasarımında Kipras Group'un imzası var. Müşterilerimizden sürekli olumlu geri dönüşler alıyoruz. Özellikle mekanın fonksiyonelliği ve estetik dokunuşları konusunda gösterdikleri hassasiyet gerçekten etkileyici.",
    image: "/images/client/user4.png",
    name: "Dinçer Arslan",
    designation: "Restoran İşletmecisi",
  },
];

const ClientsFeedbackSlider: React.FC = () => {
  return (
    <>
      <div className="client-wrap-area pb-75">
        <div className="container">
          <div className="section-title-wrap">
            <span>REVIEWS</span>
            <h2>Our Clients Talk About Us & Believe In Our Work</h2>
          </div>
        </div>

        {clientsFeedbackData && (
          <div className="container-fluid">
            <Swiper
              spaceBetween={25}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 5000,
                disableOnInteraction: true,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                992: {
                  slidesPerView: 2,
                },
                1200: {
                  slidesPerView: 3,
                },
                1600: {
                  slidesPerView: 3,
                },
              }}
              modules={[Autoplay, Pagination]}
              className="client-swiper"
            >
              {clientsFeedbackData &&
                clientsFeedbackData.map((value, i) => (
                  <SwiperSlide key={i} style={{ paddingBottom: '30px' }}>
                    <div className="client-wrap-card">
                      <div className="icon">
                        <Image src={quoteIcon} alt="quote" width={56} height={56} />
                      </div>

                      <p>{value.feedbackText}</p>

                      <div className="info d-flex align-items-center">
                        <div className="image">
                          <Image
                            src={value.image}
                            alt="image"
                            width={70}
                            height={70}
                          />
                        </div>
                        <div className="title">
                          <h3>{value.name}</h3>
                          <span>{value.designation}</span>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
};

export default ClientsFeedbackSlider;
