import React, { useState } from "react";
import axios from "axios";
import {
  FiDroplet,
  FiRefreshCw,
  FiCheckCircle,
  FiAlertCircle,
} from "react-icons/fi";
import "./HexToRGBConverter.css";
const HexToRGBConverter = () => {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");
  const [error, setError] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const convert = async () => {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      setError("Invalid HEX format. Example: #FFAABB");
      setRgb("");
      return;
    }

    setIsConverting(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/hex/convert",
        { hex }
      );
      setRgb(response.data.rgb);
      setError("");
    } catch {
      setError("Conversion failed");
      setRgb("");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="rgb-converter-glass my-5">
      <div className="rgb-header">
        <FiDroplet className="rgb-header-icon" />
        <h2>Color Alchemist</h2>
        <p>Transform HEX to RGB</p>
      </div>

      <div className="rgb-input-group">
        <input
          className="rgb-input"
          placeholder="#FFFFFF"
          value={hex}
          onChange={(e) => setHex(e.target.value)}
          style={{
            borderColor: hex && !error ? hex : "#e0e0e0",
            boxShadow: hex && !error ? `0 0 15px ${hex}40` : "none",
          }}
        />
        <div
          className="rgb-color-preview"
          style={{ backgroundColor: hex && !error ? hex : "transparent" }}
        />
      </div>

      <button
        className="rgb-convert-btn"
        onClick={convert}
        disabled={isConverting}
      >
        {isConverting ? (
          <div className="rgb-spinner" />
        ) : (
          <>
            <FiRefreshCw className="rgb-btn-icon" />
            Alchemize Colors
          </>
        )}
      </button>

      {error && (
        <div className="rgb-error-message">
          <FiAlertCircle className="rgb-error-icon" />
          {error}
        </div>
      )}

      {rgb && (
        <div className="rgb-result-card">
          <FiCheckCircle className="rgb-success-icon" />
          <div className="rgb-result-content">
            <span className="rgb-result-label">RGB Result:</span>
            <span className="rgb-result-value">{rgb}</span>
          </div>
          <div
            className="rgb-result-preview"
            style={{ backgroundColor: rgb }}
          />
        </div>
      )}
    </div>
  );
};

export default HexToRGBConverter;
