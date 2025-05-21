import React, { useState, useEffect } from "react";
import "./json.css";

const JSONFormatter = () => {
  const [input, setInput] = useState(""); // User input (key-value pairs)
  const [output, setOutput] = useState(""); // Formatted JSON output
  const [error, setError] = useState(""); // Error message for invalid input
  const [isValid, setIsValid] = useState(false); // Validity of the JSON
  const [copyStatus, setCopyStatus] = useState(""); // Copy status message
  // Format the user input into JSON
  const formatJSON = () => {
    try {
      // Attempt to create JSON structure from input string
      const formattedInput = input
        .split(",") // Split by commas for key-value pairs
        .map((pair) => pair.split(":")) // Split each pair by colon
        .reduce((acc, [key, value]) => {
          acc[key.trim()] = value.trim();
          return acc;
        }, {});

      setOutput(JSON.stringify(formattedInput, null, 2)); // Format into JSON
      setError(""); // Clear error on successful conversion
      setIsValid(true); // Mark the JSON as valid
    } catch (err) {
      setError("Invalid input format: " + err.message); // Handle any error
      setOutput(""); // Clear output if invalid
      setIsValid(false); // Mark the JSON as invalid
    }
  };

  // Clear all data
  const clearAll = () => {
    setInput(""); // Reset input
    setOutput(""); // Reset output
    setError(""); // Reset error
    setIsValid(false); // Reset validation state
  };

  // Copy formatted JSON to clipboard
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(output)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000); // Reset after 2 seconds
      })
      .catch(() => setError("Failed to copy text"));
  };

  // Clear error message as soon as the user starts typing
  useEffect(() => {
    if (input !== "") {
      setError(""); // Reset error when the user types something
    }
  }, [input]);

  return (
    <div className="json-formatter my-5">
      <div className="json-header">
        <h2 className="json-title">JSON Beautifier</h2>
        <p className="json-subtitle">Format & Validate Data into JSON</p>
      </div>

      <div className="json-input-container">
        <textarea
          className={`json-textarea ${error && !isValid ? "json-error" : ""}`}
          rows="8"
          placeholder="Enter data like key:value, separated by commas..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <div className="json-button-group">
          <button
            className="json-button json-format-button"
            onClick={formatJSON}
          >
            <span className="json-button-icon">✨</span> Convert to JSON
          </button>
          <button className="json-button json-clear-button" onClick={clearAll}>
            <span className="json-button-icon">🗑️</span> Clear
          </button>
        </div>
      </div>

      {error && (
        <div className="json-alert json-alert-error">
          <span className="json-alert-icon">⚠️</span> {error}
        </div>
      )}

      {output && (
        <div className="json-result">
          <div className="json-result-header">
            <h3 className="json-result-title">Formatted JSON</h3>
            <button className="json-copy-button" onClick={copyToClipboard}>
              <span className="json-copy-icon">
                {copyStatus ? "Copied!" : "📋 Copy"}
              </span>
            </button>
          </div>
          <pre className="json-output">{output}</pre>
        </div>
      )}
    </div>
  );
};

export default JSONFormatter;
