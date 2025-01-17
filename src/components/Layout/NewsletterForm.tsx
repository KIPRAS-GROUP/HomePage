"use client";

import React from "react";

const NewsletterForm: React.FC = () => {
  return (
    <>
      <div className="single-footer-widget">
        <h3>BÜLTENE ABONE OLUN</h3>

        <form className="newsletter-form">
          <input
            type="text"
            className="input-newsletter"
            placeholder="E-postanız.."
          />

          <button type="submit">
            <i className="ri-arrow-right-line"></i>BÜLTENE ABONE OLUN
          </button>
        </form>
      </div>
    </>
  );
};

export default NewsletterForm;
