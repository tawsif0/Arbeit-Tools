import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/images/logo.png";
const Navbar = () => {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { to: "/unit-converter", label: "Unit Converter" },
    // { to: "/pdf-converter", label: "PDF Converter" },
    { to: "/image-converter", label: "Image Converter" },
    { to: "/hex-to-rgb", label: "Hex to RGB Converter" },
    { to: "/json-formatter", label: "JSON Formatter" },
    { to: "/html-encoder-decoder", label: "HTML Encoder/Decoder" },
    { to: "/base64-encoder-decoder", label: "Base64 Encoder/Decoder" },
    { to: "/qr-code-generator", label: "QR Code Generator" },
    { to: "/meta-tag-generator", label: "Meta Tag Generator" },
    { to: "/word-character-counter", label: "Word & Character Counter" },
    { to: "/age-calculator", label: "Age Calculator" },
    { to: "/bmi-calculator", label: "BMI Calculator" },
    { to: "/love-calculator", label: "Love Calculator" },
    { to: "/gpa-calculator", label: "GPA Calculator" },
    { to: "/ip-lookup", label: "IP Lookup" },
    { to: "/pdf-to-word-converter", label: "PDF to Word Converter" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".navbar__tools-menu") &&
        !e.target.closest(".navbar__tools-trigger")
      ) {
        setDesktopOpen(false);
      }
      if (
        !e.target.closest(".navbar__mobile-menu") &&
        !e.target.closest(".navbar__mobile-toggle")
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__brand">
          <span className="navbar__title">
            <span className="gradient-text">
              <img src={logo} alt="logo" className="" />
            </span>
          </span>
        </NavLink>

        {/* Desktop Dropdown */}
        <div className="navbar__tools">
          <button
            className="navbar__tools-trigger"
            onClick={() => {
              setDesktopOpen(!desktopOpen);
              setMobileOpen(false); // Close mobile menu when desktop menu is opened
            }}
          >
            Explore Tools
            <svg
              className={`navbar__dropdown-icon ${desktopOpen ? "open" : ""}`}
              viewBox="0 0 24 24"
              width="18"
              height="18"
            >
              <path d="M7 10l5 5 5-5z" />
            </svg>
          </button>

          <div className={`navbar__tools-menu ${desktopOpen ? "open" : ""}`}>
            <div className="home-tools-grid">
              {links.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `tools-grid__item ${isActive ? "active" : ""}`
                  }
                  onClick={() => setDesktopOpen(false)}
                >
                  <div className="tool-content">{label}</div>
                </NavLink>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className={`navbar__mobile-toggle ${mobileOpen ? "open" : ""}`}
          onClick={() => {
            setMobileOpen(!mobileOpen); // Toggle mobile menu
            setDesktopOpen(false); // Close desktop menu when mobile menu is opened
          }}
        >
          <span className="navbar__mobile-icon"></span>
          <span className="navbar__mobile-icon"></span>
          <span className="navbar__mobile-icon"></span>
        </button>
      </div>
      {/* Mobile Menu */}
      <div className={`navbar__mobile-menu ${mobileOpen ? "open" : ""}`}>
        <div className="tools-grid mobile">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `tools-grid__item ${isActive ? "active" : ""}`
              }
              onClick={() => setMobileOpen(false)} // Close mobile menu on link click
            >
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
