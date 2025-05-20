// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";

import UnitConverter from "./pages/UnitConverter";
// import PDFConverter from "./pages/PDFConverter";
import ImageConverter from "./pages/ImageConverter";
import HexToRGBConverter from "./pages/HexToRGBConverter";
import JSONFormatter from "./pages/JSONFormatter";
import HTMLEncoderDecoder from "./pages/HTMLEncoderDecoder";
import Base64EncoderDecoder from "./pages/Base64EncoderDecoder";
import QRCodeGenerator from "./pages/QRCodeGenerator";
import MetaTagGenerator from "./pages/MetaTagGenerator";
import WordCharacterCounter from "./pages/WordCharacterCounter";
import AgeCalculator from "./pages/AgeCalculator";
import BMICalculator from "./pages/BMICalculator";
import LoveCalculator from "./pages/LoveCalculator";
import GPACalculator from "./pages/GPACalculator";
import IPLookup from "./pages/IPLookup";
import PdfToWordConverter from "./pages/PdfTOWord";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      {/* Use Navbar here */}
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;
