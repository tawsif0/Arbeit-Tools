import React, { useState, useEffect } from "react";

const HTMLEncoderDecoder = () => {
  const [text, setText] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [isEncodedHTML, setIsEncodedHTML] = useState(false);
  const [error, setError] = useState("");

  // Check if input contains HTML numeric entities like &#123;
  const checkIsEncodedHTML = (str) => {
    if (!str) return false;
    return /&#\d+;/.test(str);
  };

  useEffect(() => {
    setEncoded("");
    setDecoded("");
    setError("");
    setIsEncodedHTML(checkIsEncodedHTML(text));
  }, [text]);

  const encodeHTML = () => {
    if (!text.trim()) {
      setError("Please enter text to encode.");
      setEncoded("");
      return;
    }
    setError("");
    const encodedStr = text.replace(
      /[\u00A0-\u9999<>&]/gim,
      (char) => `&#${char.charCodeAt(0)};`
    );
    setEncoded(encodedStr);
  };

  const decodeHTML = () => {
    if (!text.trim()) {
      setError("Please enter encoded HTML text to decode.");
      setDecoded("");
      return;
    }
    setError("");
    const decodedStr = text.replace(/&#(\d+);/g, (match, dec) =>
      String.fromCharCode(dec)
    );
    setDecoded(decodedStr);
  };

  const onInputChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>HTML Encoder / Decoder</h3>
      <textarea
        rows={5}
        className="form-control mb-3"
        placeholder="Enter text here"
        value={text}
        onChange={onInputChange}
      />

      {!isEncodedHTML && (
        <button className="btn btn-primary me-2" onClick={encodeHTML}>
          Encode
        </button>
      )}

      {isEncodedHTML && (
        <button className="btn btn-secondary" onClick={decodeHTML}>
          Decode
        </button>
      )}

      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}

      {encoded && (
        <div className="mt-3">
          <strong>Encoded:</strong>
          <pre className="bg-light p-2 border rounded">{encoded}</pre>
        </div>
      )}

      {decoded && (
        <div className="mt-3">
          <strong>Decoded:</strong>
          <pre className="bg-light p-2 border rounded">{decoded}</pre>
        </div>
      )}
    </div>
  );
};

export default HTMLEncoderDecoder;
