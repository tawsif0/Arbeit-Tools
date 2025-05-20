/* eslint-disable max-lines */
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MDBFooter, MDBRow, MDBCol, MDBIcon } from "mdb-react-ui-kit";
import "./Footer.css";

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname !== "/") {
      navigate("/", { state: { fromFooter: true } });
    } else {
      scrollToHero();
    }
  };

  const scrollToHero = () => {
    const hero = document.getElementById("hero-section");
    if (hero) {
      hero.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (location.state?.fromFooter && location.pathname === "/") {
      scrollToHero();
    }
  }, [location]);

  return (
    <MDBFooter className="text-lg-start text-muted footer-main">
      {/* Social Section */}
      <section className="footer-social-section container px-5 py-4">
        <MDBRow className="align-items-center justify-content-between g-0">
          <MDBCol md="6" className="mb-3 mb-md-0">
            <div className="footer-social-text">
              <span>Get connected with us on social networks:</span>
            </div>
          </MDBCol>

          <MDBCol md="6">
            <div className="footer-social-icons d-flex justify-content-md-end gap-2">
              <a
                href="https://www.facebook.com/arbeittechnology"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
              >
                <MDBIcon fab icon="facebook-f" />
              </a>
              <a
                href="https://wa.me/8801707387608"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-icon-link"
              >
                <MDBIcon fab icon="whatsapp" />
              </a>
            </div>
          </MDBCol>
        </MDBRow>
      </section>

      {/* Main Content */}
      <section className="footer-content-section container px-5 py-4">
        <MDBRow className="">
          {/* Logo Column */}
          <MDBCol lg="6" className="mb-4 footer-col pe-lg-5 align-items-start">
            <div onClick={handleClick} role="button" className="footer-brand">
              <p className="footer-description">
                Arbeit Technology delivers cutting-edge IT solutions, from
                custom websites to advanced management systems. We blend
                innovation, expertise, and technology to help businesses grow
                and streamline operations efficiently.
              </p>
            </div>
          </MDBCol>

          {/* Contact Column */}
          <MDBCol lg="6" className="mb-4 d-flex justify-content-md-end gap-2">
            <div className="contact-wrapper">
              <h6 className="footer-heading mb-4">Contact Info</h6>
              <div className="contact-content">
                <div className="d-flex align-items-center mb-3">
                  <MDBIcon icon="envelope" className="me-3 contact-icon" />
                  <a
                    href="mailto:makkamadinarpothe@gmail.com"
                    className="contact-link"
                  >
                    aliakbar@arbeittechnology.com
                  </a>
                </div>

                <div className="d-flex align-items-center">
                  <MDBIcon icon="phone-alt" className="me-3 contact-icon" />
                  <a href="tel:+8801707387608" className="contact-link">
                    +880 1707-387608
                  </a>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </section>

      {/* Copyright */}
      <div className="footer-copyright text-center p-4">
        © 2025 Copyrights Reserved{" "}
        <a
          href="https://arbeittechnology.com"
          className="footer-brand-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          Arbeit Technology
        </a>
      </div>
    </MDBFooter>
  );
}
