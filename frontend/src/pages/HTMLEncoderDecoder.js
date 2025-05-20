import React, { useState, useEffect } from "react";
import "./HTMLEncoderDecoder.css";

const HTMLEncoderDecoder = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState(""); // Encoded result
  const [decoded, setDecoded] = useState(""); // Decoded result
  const [error, setError] = useState(""); // Error state
  const [isEncodedHTML, setIsEncodedHTML] = useState(false); // Detect if it's encoded
  const [copyStatus, setCopyStatus] = useState(""); // Copy status message

  // Function to detect if the text is already encoded
  const isEncoded = (text) => {
    return /%[0-9A-F]{2}/i.test(text); // Check for encoded characters like "%20"
  };

  const onInputChange = (e) => {
    setText(e.target.value);
    setError("");
    setEncoded("");
    setDecoded("");
  };

  const encodeHTML = () => {
    if (!text) {
      setError("Please enter some text to encode.");
      return;
    }
    try {
      setEncoded(encodeURIComponent(text));
      setDecoded(""); // Reset decoded value when encoding
      setIsEncodedHTML(true); // Set as encoded
      setCopyStatus(""); // Reset copy status
    } catch (e) {
      setError("Error encoding text.");
    }
  };

  const decodeHTML = () => {
    if (!text) {
      setError("Please enter some text to decode.");
      return;
    }
    try {
      // Check if the text is a valid encoded string before decoding
      if (isEncoded(text)) {
        setDecoded(decodeURIComponent(text));
        setEncoded(""); // Reset encoded value when decoding
        setIsEncodedHTML(false); // Set as decoded
        setCopyStatus(""); // Reset copy status
      } else {
        setError("The input text is not properly encoded.");
      }
    } catch (e) {
      setError("Error decoding text.");
    }
  };

  const handleCopy = (content) => {
    if (!content) {
      setError("No content to copy.");
      return;
    }
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000); // Reset after 2 seconds
      })
      .catch(() => setError("Failed to copy text"));
  };

  // Effect to detect if text is encoded or not when the input changes
  useEffect(() => {
    if (text) {
      if (isEncoded(text)) {
        setIsEncodedHTML(true); // It's encoded, so show decode button
        setEncoded(""); // Clear encoded value
        setDecoded(""); // Clear decoded value
      } else {
        setIsEncodedHTML(false); // It's not encoded, so show encode button
        setEncoded(""); // Clear encoded value
        setDecoded(""); // Clear decoded value
      }
    }
  }, [text]);

  return (
    <div className="html-editor">
      <div className="html-header">
        <h2 className="html-title">Code Transformer</h2>
        <p className="html-subtitle">Encode/Decode HTML Entities</p>
      </div>

      <div className="html-input-container">
        <textarea
          rows={5}
          className="html-textarea"
          placeholder="Paste your HTML content here..."
          value={text}
          onChange={onInputChange}
        />
        <div className="html-action-buttons">
          {!isEncodedHTML && (
            <button
              className="html-button html-button-encode"
              onClick={encodeHTML}
            >
              <span className="html-button-icon">🔒</span>
              Encode HTML
            </button>
          )}
          {isEncodedHTML && (
            <button
              className="html-button html-button-decode"
              onClick={decodeHTML}
            >
              <span className="html-button-icon">🔓</span>
              Decode HTML
            </button>
          )}
        </div>
      </div>

      {error && <div className="html-alert html-alert-error">⚠️ {error}</div>}

      {(encoded || decoded) && (
        <div className="html-result">
          <div className="html-result-header">
            <h3 className="html-result-title">
              {encoded ? "Encoded Result" : "Decoded Result"}
            </h3>
          </div>
          <pre className="html-result-content">{encoded || decoded}</pre>
          <button
            className="html-copy-button"
            onClick={() => handleCopy(encoded || decoded)}
          >
            {copyStatus ? "Copied!" : "📋 Copy to Clipboard"}
          </button>
        </div>
      )}
    </div>
  );
};

export default HTMLEncoderDecoder;
