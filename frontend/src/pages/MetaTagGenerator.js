import React, { useState } from "react";
import "./Meta.css";

const MetaTagGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [metaTags, setMetaTags] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [error, setError] = useState(""); // Error message state

  // Function to reset error message when typing starts
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    if (e.target.value !== "") {
      setError(""); // Reset error if the user starts typing
    }
  };

  const generateMetaTags = () => {
    // Check if all fields are filled
    if (!title || !description || !keywords) {
      setError("Please provide all the information to generate meta tags.");
      return; // Don't proceed further if any field is empty
    }

    setError(""); // Clear error if all fields are filled

    const meta = `<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">`;
    setMetaTags(meta);
  };

  const copyToClipboard = (metaTags) => {
    navigator.clipboard
      .writeText(metaTags)
      .then(() => {
        setCopyStatus("Copied!");
        setTimeout(() => setCopyStatus(""), 2000); // Reset after 2 seconds
      })
      .catch(() => setError("Failed to copy text"));
  };

  return (
    <div className="meta-generator my-5">
      <div className="meta-header">
        <h2 className="meta-title">Meta Magic ✨</h2>
        <p className="meta-subtitle">Generate Perfect Meta Tags</p>
      </div>

      <div className="meta-input-group">
        <div className="meta-input-container">
          <label className="meta-label">Page Title</label>
          <input
            type="text"
            className="meta-input"
            placeholder="Your page title..."
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)} // Reset error on input change
          />
        </div>

        <div className="meta-input-container">
          <label className="meta-label">Description</label>
          <textarea
            className="meta-input meta-textarea"
            placeholder="Page description..."
            value={description}
            onChange={(e) => handleInputChange(e, setDescription)} // Reset error on input change
            rows="3"
          />
        </div>

        <div className="meta-input-container">
          <label className="meta-label">Keywords</label>
          <input
            type="text"
            className="meta-input"
            placeholder="comma, separated, keywords"
            value={keywords}
            onChange={(e) => handleInputChange(e, setKeywords)} // Reset error on input change
          />
        </div>
      </div>

      {/* Show error message if any field is empty */}
      {error && (
        <div className="json-alert json-alert-error">
          <span className="json-alert-icon">⚠️</span> {error}
        </div>
      )}

      <button className="meta-generate-button" onClick={generateMetaTags}>
        Generate Meta Tags
        <span className="meta-button-icon">🚀</span>
      </button>

      {metaTags && (
        <div className="meta-result">
          <div className="meta-result-header">
            <h3 className="meta-result-title">Your Meta Tags</h3>
            <button
              className="meta-copy-button"
              onClick={() => copyToClipboard(metaTags)}
            >
              {copyStatus ? "Copied!" : "📋 Copy"}
            </button>
          </div>
          <pre className="meta-code-block">{metaTags}</pre>
        </div>
      )}
    </div>
  );
};

export default MetaTagGenerator;
