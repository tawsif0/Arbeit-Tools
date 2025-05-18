// src/App.js
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import UnitConverter from "./components/UnitConverter";
import PDFConverter from "./components/PDFConverter";
import ImageConverter from "./components/ImageConverter";
import HexToRGBConverter from "./components/HexToRGBConverter";
import JSONFormatter from "./components/JSONFormatter";
import HTMLEncoderDecoder from "./components/HTMLEncoderDecoder";
import Base64EncoderDecoder from "./components/Base64EncoderDecoder";
import QRCodeGenerator from "./components/QRCodeGenerator";
import MetaTagGenerator from "./components/MetaTagGenerator";
import WordCharacterCounter from "./components/WordCharacterCounter";
import AgeCalculator from "./components/AgeCalculator";
import BMICalculator from "./components/BMICalculator";
import LoveCalculator from "./components/LoveCalculator";
import GPACalculator from "./components/GPACalculator";
import IPLookup from "./components/IPLookup";
import PdfToWordConverter from "./components/PdfTOWord";

function App() {
  const links = [
    { to: "/unit-converter", label: "Unit Converter" },
    { to: "/pdf-converter", label: "PDF Converter" },
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
    { to: "/pdf-to-word-converter", label: "PDF to Word Converter" }
  ];

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            Multi-Tool
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarNav"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            <ul className="navbar-nav flex-column flex-lg-row">
              {links.map(({ to, label }) => (
                <li className="nav-item" key={to}>
                  <NavLink
                    className={({ isActive }) =>
                      "nav-link" + (isActive ? " active" : "")
                    }
                    to={to}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      <div className="container my-4">
        <Routes>
          <Route
            path="/"
            element={<h2>Welcome! Select a tool from the menu.</h2>}
          />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/pdf-converter" element={<PDFConverter />} />
          <Route path="/image-converter" element={<ImageConverter />} />
          <Route path="/hex-to-rgb" element={<HexToRGBConverter />} />
          <Route path="/json-formatter" element={<JSONFormatter />} />
          <Route
            path="/html-encoder-decoder"
            element={<HTMLEncoderDecoder />}
          />
          <Route
            path="/base64-encoder-decoder"
            element={<Base64EncoderDecoder />}
          />
          <Route path="/qr-code-generator" element={<QRCodeGenerator />} />
          <Route path="/meta-tag-generator" element={<MetaTagGenerator />} />
          <Route
            path="/word-character-counter"
            element={<WordCharacterCounter />}
          />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/bmi-calculator" element={<BMICalculator />} />
          <Route path="/love-calculator" element={<LoveCalculator />} />
          <Route path="/gpa-calculator" element={<GPACalculator />} />
          <Route path="/ip-lookup" element={<IPLookup />} />
          <Route
            path="/pdf-to-word-converter"
            element={<PdfToWordConverter />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
