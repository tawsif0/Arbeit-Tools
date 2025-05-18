import React, { useState, useEffect } from "react";
import axios from "axios";

const Base64EncoderDecoder = () => {
  const [input, setInput] = useState("");
  const [encoded, setEncoded] = useState("");
  const [decoded, setDecoded] = useState("");
  const [loadingEncode, setLoadingEncode] = useState(false);
  const [loadingDecode, setLoadingDecode] = useState(false);
  const [error, setError] = useState("");
  const [isBase64, setIsBase64] = useState(false);

  // Function to check if input is valid Base64 string
  const checkIsBase64 = (str) => {
    if (!str) return false;
    const trimmed = str.trim();
    // Simple regex to check Base64 pattern (allows padding)
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return base64Regex.test(trimmed);
  };

  // Update isBase64 flag whenever input changes
  useEffect(() => {
    setEncoded("");
    setDecoded("");
    setError("");
    setIsBase64(checkIsBase64(input));
  }, [input]);

  const encode = async () => {
    if (!input.trim()) {
      setError("Please enter text to encode.");
      setEncoded("");
      return;
    }
    setError("");
    setLoadingEncode(true);
    setEncoded("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/base64/encode",
        { input: input.trim() }
      );
      setEncoded(response.data.encoded);
    } catch {
      setError("Error encoding.");
      setEncoded("");
    } finally {
      setLoadingEncode(false);
    }
  };

  const decode = async () => {
    if (!input.trim()) {
      setError("Please enter Base64 to decode.");
      setDecoded("");
      return;
    }
    setError("");
    setLoadingDecode(true);
    setDecoded("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/base64/decode",
        { input: input.trim() }
      );
      setDecoded(response.data.decoded);
    } catch (error) {
      console.error("Decode error:", error.response?.data || error.message);
      setError("Error decoding.");
      setDecoded("");
    } finally {
      setLoadingDecode(false);
    }
  };

  const onInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>Base64 Encoder / Decoder</h3>
      <textarea
        rows="4"
        className="form-control mb-3"
        placeholder="Enter text or Base64"
        value={input}
        onChange={onInputChange}
      />

      {!isBase64 && (
        <button
          className="btn btn-primary me-2"
          onClick={encode}
          disabled={loadingEncode}
        >
          {loadingEncode ? "Encoding..." : "Encode"}
        </button>
      )}

      {isBase64 && (
        <button
          className="btn btn-secondary"
          onClick={decode}
          disabled={loadingDecode}
        >
          {loadingDecode ? "Decoding..." : "Decode"}
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

export default Base64EncoderDecoder;
