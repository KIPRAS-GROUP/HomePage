"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

import whiteLogo from "../../../public/images/kiprasImage/kipras.jpeg";
import NewsletterForm from "./NewsletterForm";

// Social Links
const socialLinksData = [
  {
    id: "2",
    name: "Instagram",
    link: "https://www.instagram.com/kiprasgroup/",
  },
  {
    id: "3",
    name: "Linkedin",
    link: "https://www.linkedin.com/company/kipras/posts/?feedView=all",
  },
];

// Page Links
const pageLinksData = [
  {
    id: "1",
    name: "Projeler",
    link: "/portfolio",
  },
  {
    id: "2",
    name: "Haberler",
    link: "/blog",
  },
  {
    id: "3",
    name: "Teklif alın",
    link: "/request-quote",
  },
  {
    id: "4",
    name: "Kurumsal",
    link: "/services",
  },
];

const Footer: React.FC = () => {
  return (
    <>
      <footer className="footer-area pt-100 pb-75">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-4 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="single-footer-widget">
                <div className="widget-logo">
                  <Link href="/">
                    <Image
                      style={{
                        borderRadius: "10px",
                        boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.4)",
                      }}
                      src={whiteLogo}
                      alt="image"
                      width={113}
                      height={54}
                    />
                  </Link>
                </div>
                <p>
                  Hayalinizdeki mekanın veya ev projenizin bir parçası olmayı
                  çok isteriz.
                </p>
              </div>
            </div>

            <div
              className="col-lg-2 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="single-footer-widget ps-5">
                <h3>Sosyal Medyamız</h3>

                {socialLinksData && (
                  <ul className="social-link">
                    {socialLinksData &&
                      socialLinksData.map((value, i) => (
                        <li key={i}>
                          <a href={value.link} target="_blank">
                            <i className="ri-arrow-right-line"></i> {value.name}
                          </a>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="300"
              data-aos-duration="600"
              data-aos-once="true"
            >
              <div className="single-footer-widget ps-5">
                <h3>Kısayollar</h3>

                {pageLinksData && (
                  <ul className="quick-link">
                    {pageLinksData &&
                      pageLinksData.map((value, i) => (
                        <li key={i}>
                          <a href={value.link}>{value.name}</a>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            <div
              className="col-lg-3 col-sm-6"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="600"
              data-aos-once="true"
            >
              {/* NewsletterForm */}
              <NewsletterForm />
            </div>
          </div>
        </div>
      </footer>

      <div className="copyright-area">
        <div className="container">
          <div className="copyright-area-content">
            <p>
              © <span>Kipras</span> Group 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
