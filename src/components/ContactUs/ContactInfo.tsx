"use client";

import React from "react";

// Social Links
const socialLinksData = [
  {
    id: "1",
    icon: "ri-instagram-line",
    link: "https://www.instagram.com/",
  },
  {
    id: "2",
    icon: "ri-twitter-line",
    link: "https://www.twitter.com/",
  },
];

const ContactInfo: React.FC = () => {
  return (
    <>
      <ul className="contact-info-list">
        <li>
          <span>ADRES</span>
          123 Maple Street Toronto, Ontario M1A 1A1 Canada
        </li>

        <li>
          <span>BİLGİ VE İLETİŞİM</span>
          <a href="mailto:info@kipras.com.tr">info@kipras.com.tr</a>
        </li>

        <li>
          <span>SOSYAL MEDYA</span>

          {socialLinksData && (
            <ul className="social">
              {socialLinksData &&
                socialLinksData.map((value, i) => (
                  <li key={i}>
                    <a href={value.link} target="_blank">
                      <i className={value.icon}></i>
                    </a>
                  </li>
                ))}
            </ul>
          )}
        </li>
      </ul>
    </>
  );
};

export default ContactInfo;
