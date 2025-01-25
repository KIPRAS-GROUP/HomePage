"use client";

import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import logo from "/public/images/kiprasImage/kipras.jpeg";
import blackLogo from "/public/images/black-logo.svg";

const Navbar: React.FC = () => {
  const currentRoute = usePathname();

  const [menu] = useState<boolean>(true);

  useEffect(() => {
    let elementId = document.getElementById("navbar");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        elementId?.classList.add("sticky");
      } else {
        elementId?.classList.remove("sticky");
      }
    });
  }, []);

  const classOne: string = menu
    ? "collapse navbar-collapse mean-menu"
    : "collapse navbar-collapse show";
  const classTwo: string = menu
    ? "navbar-toggler navbar-toggler-right collapsed mt-2"
    : "navbar-toggler navbar-toggler-right";

  // SearchModal
  const [isActive, setActive] = useState<boolean>(false);
  const handleToggleSearchModal = () => {
    setActive(!isActive);
  };

  // Mobile Menu
  const [isMobileMenuActive, setMobileMenuActive] = useState<boolean>(false);
  const handleToggleMobileMenu = () => {
    setMobileMenuActive(!isMobileMenuActive);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg " id="navbar">
        <div className="container-fluid position-relative ">
          <Link className="navbar-brand" href="/">
            <Image
              src={logo}
              style={{ borderRadius: "15px" }}
              alt="Kipras Logo"
              width={100}
              height={54}
            />
          </Link>

          {/* Toggle navigation */}
          <button
            className={classTwo}
            style={{ marginBottom: "10px" }}
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={handleToggleMobileMenu}
          >
            <span className="icon-bar top-bar"></span>
            <span className="icon-bar middle-bar"></span>
            <span className="icon-bar bottom-bar"></span>
          </button>

          {/* Menu For Desktop Device */}
          <div
            className={classOne}
            id="navbarSupportedContent"
            style={{ marginTop: "15px" }}
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  href="/"
                  className={`nav-link text-white ${
                    currentRoute === "/" ? "active" : ""
                  }`}
                >
                  Anasayfa
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href="/hakkimizda/"
                  className={`nav-link ${
                    currentRoute === "/hakkimizda/" ? "active" : ""
                  }`}
                >
                  Hakkımızda
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  href="/projeler/"
                  className={`nav-link ${currentRoute === "/projeler/" ? "active" : ""}`}
                >
                  Projelerimiz
                </Link>
              </li>

                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <Link
                      href="/projeler/detay/"
                      className={`nav-link ${
                        currentRoute === "/projeler/detay/" ? "active" : ""
                      }`}
                    >
                      Portfolio Details
                    </Link>
                  </li>
                </ul>

              <li className="nav-item">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  onClick={(e) => e.preventDefault()}
                >
                  Kurumsal
                </Link>

                <ul className="dropdown-menu">
                  <li className="nav-item">
                    <Link
                      className="nav-link dropdown-toggle"
                      href="#"
                      onClick={(e) => e.preventDefault()}
                    >
                      Hizmetler
                    </Link>

                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/hizmetler/"
                          className={`nav-link ${
                            currentRoute === "/hizmetler/" ? "active" : ""
                          }`}
                        >
                          Hizmetler
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          href="/hizmetler/detay/"
                          className={`nav-link ${
                            currentRoute === "/hizmetler/detay/" ? "active"
                              : ""
                          }`}
                        >
                          Hizmet Detay
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                  <Link
                      href="/hizmetler/detay/"
                      className={`nav-link ${
                        currentRoute === "/hizmetler/detay/" ? "active"
                          : ""
                      }`}
                    >
                      Vizyon
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/hizmetler/detay/"
                      className={`nav-link ${
                        currentRoute === "/hizmetler/detay/" ? "active"
                          : ""
                      }`}
                    >
                      Misyon
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/gizlilik-politikasi/"
                      className={`nav-link ${
                        currentRoute === "/gizlilik-politikasi/" ? "active" : ""
                      }`}
                    >
                      Gizlilik Politikamız
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      href="/galeri/"
                      className={`nav-link ${
                        currentRoute === "/galeri/" ? "active" : ""
                      }`}
                    >
                      Galeri
                    </Link>
                  </li>

                  

                  <li className="nav-item">
                    <Link
                      href="/gizlilik-politikasi/"
                      className={`nav-link ${
                        currentRoute === "/gizlilik-politikasi/" ? "active" : ""
                      }`}
                    >
                      Gizlilik Politikası
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/sartlar-kosullar/"
                      className={`nav-link ${
                        currentRoute === "/sartlar-kosullar/" ? "active" : ""
                      }`}
                    >
                      Şartlar ve Koşullar
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/kariyer/"
                      className={`nav-link ${
                        currentRoute === "/kariyer/" ? "active" : ""
                      }`}
                    >
                      Kariyer
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <Link
                  href="/blog/"
                  className={`nav-link ${
                    currentRoute === "/blog/" ? "active" : ""
                  }`}
                >
                  Blogumuz
                </Link>
              </li>

              <ul className="dropdown-menu">
                  <li className="nav-item">
                    <Link
                      href="/single-blog/"
                      className={`nav-link ${
                        currentRoute === "/single-blog/" ? "active" : ""
                      }`}
                    >
                      Single Blog
                    </Link>
                  </li>
                </ul>
              <li className="nav-item">
                <Link
                  href="/iletisim/"
                  className={`nav-link ${
                    currentRoute === "/iletisim/" ? "active" : ""
                  }`}
                >
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* others-options */}
          <div className="others-option d-flex align-items-center mt-3 xl:mt-4 2xl:mt-4 ">
            <div className="option-item">
              <div className="search-btn" onClick={handleToggleSearchModal}>
                <i className="ri-search-line"></i>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu For Mobile Device */}
      <div
        className={`modal mobile-menu-modal  ${
          isMobileMenuActive ? "show" : ""
        }`}
      >
        <div className="modal-dialog  modal-dialog-scrollable ">
          <div className="modal-content ">
            <div className="modal-header  d-flex align-items-center justify-content-between ">
              <div>
                <Image
                  src={logo}
                  style={{ borderRadius: "5px" }}
                  alt="Kipras Logo"
                  width={60}
                  height={80}
                />
              </div>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleToggleMobileMenu}
              >
                <i
                  style={{ color: "black", marginRight: "20px" }}
                  className="ri-close-line"
                ></i>
              </button>
            </div>

            <div className="modal-body">
              <Accordion allowZeroExpanded>
                <Link
                  href="/"
                  className={`nav-link ${currentRoute === "/" ? "active" : ""}`}
                >
                  Anasayfa
                </Link>

                <Link
                  href="/hakkimizda/"
                  className={`nav-link ${
                    currentRoute === "/hakkimizda/" ? "active" : ""
                  }`}
                >
                  Hakkımızda
                </Link>
                <Link
                  href="/projeler/"
                  className={`nav-link ${
                    currentRoute === "/projeler/" ? "active" : ""
                  }`}
                >
                  Projeler
                </Link>

                <AccordionItem uuid="c">
                  <AccordionItemHeading>
                    <AccordionItemButton>Kurumsal</AccordionItemButton>
                  </AccordionItemHeading>

                  <AccordionItemPanel>
                    <ul className="menu-list">
                      <li>
                        <Link
                          href="/hizmetler/"
                          className={`nav-link ${
                            currentRoute === "/hizmetler/" ? "active" : ""
                          }`}
                        >
                          Hizmetler
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/hizmetler/detay/"
                          className={`nav-link ${
                            currentRoute === "/hizmetler/detay/" ? "active"
                              : ""
                          }`}
                        >
                          Misyon
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/galeri/"
                          className={`nav-link ${
                            currentRoute === "/galeri/" ? "active" : ""
                          }`}
                        >
                          Galeri
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/gizlilik-politikamiz/"
                          className={`nav-link ${
                            currentRoute === "/gizlilik-politikamiz/"
                              ? "active"
                              : ""
                          }`}
                        >
                          Gizlilik Politikamız
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="/sartlar-ve-kosullar/"
                          className={`nav-link ${
                            currentRoute === "/sartlar-ve-kosullar/"
                              ? "active"
                              : ""
                          }`}
                        >
                          Şartlar ve Koşullar
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/kariyer/"
                          className={`nav-link ${
                            currentRoute === "/kariyer/" ? "active" : ""
                          }`}
                        >
                          Request A Quote
                        </Link>
                      </li> 
                    </ul>
                  </AccordionItemPanel>
                </AccordionItem>
                <Link
                  href="/blog/"
                  className={`nav-link ${
                    currentRoute === "/blog/" ? "active" : ""
                  }`}
                >
                  Bloğumuz
                </Link>

                 <AccordionItem uuid="d">
                  <AccordionItemHeading>
                    <AccordionItemButton>Blog</AccordionItemButton>
                  </AccordionItemHeading>

                  <AccordionItemPanel>
                    <ul className="menu-list">
                      <li>
                        <Link
                          href="/blog/"
                          className={`nav-link ${
                            currentRoute === "/blog/" ? "active" : ""
                          }`}
                        >
                          Blog Grid
                        </Link>
                      </li>

                      <li>
                        <Link
                          href="/single-blog/"
                          className={`nav-link ${
                            currentRoute === "/single-blog/" ? "active" : ""
                          }`}
                        >
                          Single Blog
                        </Link>
                      </li>

                    </ul>
                  </AccordionItemPanel>
                </AccordionItem> 
                <Link
                  href="/iletisim/"
                  className={`nav-link ${
                    currentRoute === "/iletisim/" ? "active" : ""
                  }`}
                >
                  İletişim
                </Link>
              </Accordion>
            </div>
          </div>
        </div>

        <div className="close-overlay" onClick={handleToggleMobileMenu}></div>
      </div>

      {/* Search Form */}
      <div className={`modal search-modal-area ${isActive ? "show" : ""}`}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleToggleSearchModal}
            >
              <i className="ri-close-line"></i>
            </button>
            <div className="modal-body">
              <div className="search-form">
                <form>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Arama.."
                  />
                  <button type="submit">
                    <i className="ri-search-line"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="close-overlay" onClick={handleToggleSearchModal}></div>
      </div>
    </>
  );
};

export default Navbar;
