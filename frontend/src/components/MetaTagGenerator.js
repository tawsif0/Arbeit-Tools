// components/MetaTagGenerator.js
import React, { useState } from "react";
import "./Meta.css";
const MetaTagGenerator = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keywords, setKeywords] = useState("");
  const [metaTags, setMetaTags] = useState("");

  const generateMetaTags = () => {
    const meta = `<meta name="title" content="${title}">
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">`;
    setMetaTags(meta);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaTags);
  };

  return (
    <div className="meta-generator">
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="meta-input-container">
          <label className="meta-label">Description</label>
          <textarea
            className="meta-input meta-textarea"
            placeholder="Page description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
      </div>

      <button className="meta-generate-button" onClick={generateMetaTags}>
        Generate Meta Tags
        <span className="meta-button-icon">🚀</span>
      </button>

      {metaTags && (
        <div className="meta-result">
          <div className="meta-result-header">
            <h3 className="meta-result-title">Your Meta Tags</h3>
            <button className="meta-copy-button" onClick={copyToClipboard}>
              📋 Copy
            </button>
          </div>
          <pre className="meta-code-block">{metaTags}</pre>
        </div>
      )}
    </div>
  );
};

export default MetaTagGenerator;
