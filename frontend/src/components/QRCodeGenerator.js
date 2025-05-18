// components/QRCodeGenerator.js
import React, { useState } from "react";
import axios from "axios";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const generateQRCode = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/qr/generate",
        { text }
      );
      setQrCode(`data:image/png;base64,${response.data.qrCode}`);
    } catch {
      alert("QR code generation failed");
    }
  };

  return (
    <div className="container">
      <div className="qr-card">
        <h2 className="title">🔮 QR Code Generator</h2>

        <div className="form-group">
          <input
            type="text"
            className="form-control neon-input"
            placeholder="Enter text or URL..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button
          className="btn btn-glow"
          onClick={generateQRCode}
          disabled={!text}
        >
          🌟 Generate Sexy QR Code 🌟
        </button>

        {qrCode && (
          <div className="qr-container">
            <img src={qrCode} alt="Generated QR Code" className="qr-image" />
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
