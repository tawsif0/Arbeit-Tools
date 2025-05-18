// components/HexToRGBConverter.js
import React, { useState } from "react";
import axios from "axios";

const HexToRGBConverter = () => {
  const [hex, setHex] = useState("");
  const [rgb, setRgb] = useState("");
  const [error, setError] = useState("");

  const convert = async () => {
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) {
      setError("Invalid HEX format. Example: #FFAABB");
      setRgb("");
      return;
    }
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
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>Hex to RGB Converter</h3>
      <input
        className="form-control mb-3"
        placeholder="#FFFFFF"
        value={hex}
        onChange={(e) => setHex(e.target.value)}
      />
      <button className="btn btn-primary" onClick={convert}>
        Convert
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {rgb && <div className="alert alert-success mt-3">{rgb}</div>}
    </div>
  );
};

export default HexToRGBConverter;
