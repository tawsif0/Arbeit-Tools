import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiLock, FiUnlock, FiCopy } from "react-icons/fi";
import "./Base64Styles.css";

const Base64EncoderDecoder = () => {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [loading, setLoading] = useState({ encode: false, decode: false });
  const [error, setError] = useState("");
  const [isBase64, setIsBase64] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const checkIsBase64 = (str) => {
    if (!str) return false;
    const trimmed = str.trim();
    return /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(
      trimmed
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const base64Check = checkIsBase64(input);
      setIsBase64(base64Check);
      setEncoded("");
      setDecoded("");
      setError("");
    }, 300);
    return () => clearTimeout(timeout);
  }, [input]);

  const handleAction = async (type) => {
    if (!input.trim()) {
      setError(
        `Please enter ${type === "encode" ? "text" : "Base64"} to ${type}`
      );
      return;
    }

    setLoading((prev) => ({ ...prev, [type]: true }));
    setError("");

    try {
      const response = await axios.post(
        `https://toolsapi.arbeittechnology.com/api/base64/${type}`,
        { input: input.trim() }
      );
      type === "encode"
        ? setEncoded(response.data.encoded)
        : setDecoded(response.data.decoded);
    } catch (err) {
      setError(err.response?.data?.error || `Error ${type}ing`);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <div className="base64-container my-5">
      <div className="base64-glass">
        <div className="base64-header">
          <h1>
            <span className="gradient-text">Base64</span>
            <span className="brand-text"> Transformer</span>
          </h1>
          <div className="animated-border" />
        </div>

        <div className="input-container">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter text or Base64 string..."
            className="base64-textarea"
            style={{
              borderColor: error ? "#ff4d4d" : isBase64 ? "#4dffb8" : "#6969ff",
            }}
          />
          <label className="floating-label">
            {isBase64 ? "Base64 Detected!" : "Enter your text..."}
          </label>
        </div>

        {error && (
          <div className="json-alert json-alert-error">
            <span className="json-alert-icon">⚠️</span> {error}
          </div>
        )}

        <div className="action-buttons">
          <button
            onClick={() => handleAction("encode")}
            disabled={loading.encode || isBase64}
            className={`encode-btn ${isBase64 ? "disabled" : ""}`}
          >
            <FiLock />
            {loading.encode ? (
              <div className="spinner" />
            ) : (
              <>
                Encode
                <div className="btn-shine" />
              </>
            )}
          </button>

          <button
            onClick={() => handleAction("decode")}
            disabled={loading.decode || !isBase64}
            className={`decode-btn ${!isBase64 ? "disabled" : ""}`}
          >
            <FiUnlock />
            {loading.decode ? (
              <div className="spinner" />
            ) : (
              <>
                Decode
                <div className="btn-shine" />
              </>
            )}
          </button>
        </div>

        {(encoded || decoded) && (
          <div className="result-container">
            <div className="result-card">
              <div className="result-header">
                <h3>{encoded ? "Encoded" : "Decoded"} Result</h3>
                <div className="copy-wrapper">
                  <button
                    onClick={() => copyToClipboard(encoded || decoded)}
                    className="copy-btn"
                  >
                    <FiCopy />
                    {isCopied && <span className="copy-feedback">Copied!</span>}
                  </button>
                </div>
              </div>
              <pre className="result-content">{encoded || decoded}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Base64EncoderDecoder;
