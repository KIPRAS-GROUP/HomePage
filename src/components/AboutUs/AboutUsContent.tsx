// 1.kod:
"use client";

import React, { useState, useLayoutEffect } from "react";
import FsLightbox from "fslightbox-react";
import Image from "next/image";
import { usePathname } from 'next/navigation';

import aboutImg from "../../../public/images/about/about5.jpg";
import arrowIcon from "../../../public/images/about/arrow2.svg";
import videoThumb from "../../../public/images/about/about4.png";
import videoCircleImg from "../../../public/images/about/wrap.png";
import textShape from "../../../public/images/about/archi-text2.png";

import OurMissionAndVision from "./OurMissionAndVision";
import styles from './aboutUs.module.css';
import darkStyles from './aboutUsDark.module.css';

const AboutUsContent: React.FC = () => {
  const [toggler, setToggler] = useState<boolean>(false);
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useLayoutEffect(() => {
    document.body.classList.add(darkStyles.darkModeBody);
    return () => {
      document.body.classList.remove(darkStyles.darkModeBody);
    };
  }, []);

  const containerClassName = isDarkMode
    ? `${styles.aboutArea} ${darkStyles.aboutArea}`
    : styles.aboutArea;
  const titleClassName = isDarkMode
    ? `${styles.aboutThreeTitle} ${darkStyles.aboutThreeTitle}`
    : styles.aboutThreeTitle;
  const innerClassName = isDarkMode
    ? `${styles.aboutThreeInner} ${darkStyles.aboutThreeInner}`
    : styles.aboutThreeInner;
  const leftContentClassName = isDarkMode
    ? `${styles.aboutThreeLeftContent} ${darkStyles.aboutThreeLeftContent}`
    : styles.aboutThreeLeftContent;
  const rightContentClassName = isDarkMode
    ? `${styles.aboutThreeRightContent} ${darkStyles.aboutThreeRightContent}`
    : styles.aboutThreeRightContent;
  const aboutWrapContentClassName = isDarkMode
    ? `${styles.aboutWrapContent} ${darkStyles.aboutWrapContent}`
    : styles.aboutWrapContent;

  return (
    <>
      {/* Use here youtube Embed video link */}
      <FsLightbox
        toggler={toggler}
        sources={[
          "https://www.youtube.com/watch?v=SbZfAW8zv_A&ab_channel=netdm%C3%BCzik",
        ]}
      />

      <div className={containerClassName}>
        <div className="container">
          <div className={titleClassName}>
            <span>HAKKIMIZDA</span>
            <h2>
              Biz <b>KİPRAS GROUP</b>'uz. Hayalleri İnşa Ediyor, Geleceği Şekillendiriyoruz.
            </h2>
          </div>

          <div className={styles.aboutImageThree}>
            <Image src={aboutImg} alt="image" width={1320} height={430} />
          </div>

          <div className={innerClassName}>
            <div className="row justify-content-center">
              <div className="col-lg-6 col-md-12">
                <div className={leftContentClassName}>
                  <p className={`mb-0 ${isDarkMode ? darkStyles.aboutText : ''}`}>
                    KİPRAS GROUP olarak, mimari tasarım, inşaat ve proje yönetimindeki gelişmiş bakış açımızı 22 yıllık tecrübemizle hayata geçiriyoruz. Konut, ticari ve kamu projelerinde estetik, işlevsellik ve sürdürülebilirliği bir araya getirerek zamansız eserler oluşturuyoruz.
                  </p>

                  <ul className={isDarkMode ? darkStyles.aboutList : styles.list}>
                    <li>
                      <Image src={arrowIcon} alt="arrow" width={28} height={10} className={isDarkMode ? darkStyles.arrowIcon : ''} />
                      Yenilikçi Tasarım Anlayışı
                    </li>
                    <li>
                      <Image src={arrowIcon} alt="arrow" width={28} height={10} className={isDarkMode ? darkStyles.arrowIcon : ''} />
                      22 Yıllık Uzmanlık ve Deneyim
                    </li>
                    <li>
                      <Image src={arrowIcon} alt="arrow" width={28} height={10} className={isDarkMode ? darkStyles.arrowIcon : ''} /> A client-centric
                      Müşteri Odaklı Yaklaşım
                    </li>
                    <li>
                      <Image src={arrowIcon} alt="arrow" width={28} height={10} className={isDarkMode ? darkStyles.arrowIcon : ''} />
                      Sürdürülebilir Tasarım Uygulamaları
                    </li>
                  </ul>

                  <div className={styles.aboutImageWrap}>
                    <Image src={videoThumb} alt="image" width={1052} height={1120} />

                    <div className={styles.wrapVideo}>
                      <Image src={videoCircleImg} alt="image" width={184} height={184} />

                      <div
                        className={`video-btn text-decoration-none ${isDarkMode ? darkStyles.videoBtn : ''}`}
                        onClick={() => setToggler(!toggler)}
                      >
                        <i className="ri-play-fill"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-md-12">
                <div className={rightContentClassName}>
                  {/* OurMissionAndVision */}
                  <OurMissionAndVision isDarkMode={isDarkMode} />

                  <div className={aboutWrapContentClassName}>
                    <h2 className={isDarkMode ? darkStyles.aboutHeading : ''}>
                      Mimarlık ve İç Mimarlık Bizim İşimiz, Tutkumuz
                    </h2>
                    <p className={isDarkMode ? darkStyles.aboutText : ''}>
                      KİPRAS GROUP, mimari tasarım, master planlama, kentsel tasarım, iç
                      mimari, alan planlaması ve programlama gibi alanlarda geniş kapsamlı
                      hizmet veren bir tasarım firmasıdır. Tamamlanmış projelerimiz arasında
                      uluslararası çapta beğeni toplayan ve ödüllü işler bulunmaktadır.
                    </p>
                    <p className={isDarkMode ? darkStyles.aboutText : ''}>
                      KİPRAS GROUP olarak, mimarlığın yalnızca binalardan ibaret
                      olmadığına, yaşamımızı, çalışma şeklimizi ve çevremizle
                      etkileşimimizi şekillendiren bir sanat olduğuna inanıyoruz. Yapılı
                      çevreye dair derin bir anlayış ve sarsılmaz bir özveri ile
                      müşterilerimizin hayallerini gerçeğe dönüştürüyor, mekanlara kimlik
                      ve ruh katıyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.aboutWrapShape}>
          <Image src={textShape} alt="image" width={768} height={140} className={isDarkMode ? darkStyles.aboutWrapShapeImage : ''} />
        </div>
      </div>
    </>
  );
};

export default AboutUsContent;