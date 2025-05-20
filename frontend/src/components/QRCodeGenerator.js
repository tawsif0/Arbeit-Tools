/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import "./QRCodeGenerator.css";

const QRCodeGenerator = () => {
  const ref = useRef(null);
  const [qrCodeInstance, setQrCodeInstance] = useState(null);
  const [logoObjectUrl, setLogoObjectUrl] = useState(null);

  const [text, setText] = useState("https://example.com");
  const [dotColor, setDotColor] = useState("#000000"); // fresh blue
  const [bgColor, setBgColor] = useState("#f0f4ff"); // very light blue
  const [pattern, setPattern] = useState("square");
  const [logoFile, setLogoFile] = useState(null);

  // Manage logo object URL and cleanup
  useEffect(() => {
    if (!logoFile) {
      setLogoObjectUrl(null);
      return;
    }
    const url = URL.createObjectURL(logoFile);
    setLogoObjectUrl(url);

    return () => {
      URL.revokeObjectURL(url);
      setLogoObjectUrl(null);
    };
  }, [logoFile]);

  useEffect(() => {
    const qr = new QRCodeStyling({
      width: 260,
      height: 260,
      data: text,
      dotsOptions: {
        color: dotColor,
        type: pattern,
      },
      backgroundOptions: {
        color: bgColor,
      },
      image: logoObjectUrl,
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
        imageSize: 0.35,
      },
    });

    if (ref.current) {
      ref.current.innerHTML = "";
      qr.append(ref.current);
    }

    setQrCodeInstance(qr);

    return () => {
      if (ref.current) ref.current.innerHTML = "";
    };
  }, []); // run once

  useEffect(() => {
    if (!qrCodeInstance) return;

    qrCodeInstance.update({
      data: text,
      dotsOptions: { color: dotColor, type: pattern },
      backgroundOptions: { color: bgColor },
      image: logoObjectUrl,
      imageOptions: { crossOrigin: "anonymous", margin: 20, imageSize: 0.35 },
    });
  }, [text, dotColor, bgColor, pattern, logoObjectUrl, qrCodeInstance]);

  return (
    <main className="qrgen-wrapper">
      <h1 className="qrgen-title">⚡ QR Code Generator ⚡</h1>

      <section className="qrgen-inputs">
        <div className="qrgen-input-group">
          <input
            type="text"
            placeholder="Enter text or URL"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="qrgen-input"
            aria-label="QR Code Content"
          />
          <span className="qrgen-input-icon">🔗</span>
        </div>

        <label className="qrgen-file-label">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setLogoFile(e.target.files[0])}
            className="qrgen-file-input"
            aria-label="Upload Logo"
          />
          <span className="qrgen-file-button">📁 Add Logo</span>
          {logoFile && (
            <span className="qrgen-file-name">
              <span className="qrgen-file-text">{logoFile.name}</span>
              <button
                type="button"
                className="qrgen-clear-logo-btn"
                aria-label="Remove logo"
                onClick={() => setLogoFile(null)}
              >
                ×
              </button>
            </span>
          )}
        </label>

        <div className="qrgen-color-group">
          <div className="qrgen-color-picker">
            <label className="qrgen-color-label">
              <span className="qrgen-color-text">Dot Color</span>
              <input
                type="color"
                value={dotColor}
                onChange={(e) => setDotColor(e.target.value)}
                className="qrgen-color-input"
                aria-label="Select Dot Color"
              />
            </label>
          </div>

          <div className="qrgen-color-picker">
            <label className="qrgen-color-label">
              <span className="qrgen-color-text">Background</span>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="qrgen-color-input"
                aria-label="Select Background Color"
              />
            </label>
          </div>
        </div>

        <div className="qrgen-pattern-group">
          <label className="qrgen-pattern-label" htmlFor="patternSelect">
            Pattern Style:
          </label>
          <select
            id="patternSelect"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="qrgen-select"
            aria-label="Select QR Code Pattern"
          >
            <option value="dots">Dots</option>
            <option value="rounded">Rounded</option>
            <option value="square">Square</option>
            <option value="classy">Classy</option>
            <option value="classy-rounded">Classy Rounded</option>
            <option value="extra-rounded">Extra Rounded</option>
          </select>
        </div>
      </section>

      <section className="qrgen-preview-container">
        <div ref={ref} className="qrgen-preview" aria-label="QR Code Preview" />
      </section>

      <button
        onClick={() => qrCodeInstance?.download({ extension: "png" })}
        className="qrgen-download-btn"
        aria-label="Download QR Code as PNG"
      >
        <span className="qrgen-download-text">Download PNG</span>
      </button>
    </main>
  );
};

export default QRCodeGenerator;
