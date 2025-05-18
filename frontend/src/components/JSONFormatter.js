// components/JSONFormatter.js
import React, { useState } from "react";

const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 4));
      setError("");
    } catch {
      setError("Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>JSON Formatter & Validator</h3>
      <textarea
        className="form-control mb-3"
        rows="8"
        placeholder="Paste JSON here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <button className="btn btn-primary" onClick={formatJSON}>
        Format JSON
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {output && (
        <pre
          className="bg-light p-3 mt-3 rounded"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {output}
        </pre>
      )}
    </div>
  );
};

export default JSONFormatter;
