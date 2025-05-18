// components/MetaTagGenerator.js
import React, { useState } from "react";

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

  return (
    <div className="card p-4 shadow-sm">
      <h3>Meta Tag Generator</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Page Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Keywords (comma separated)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <button className="btn btn-primary" onClick={generateMetaTags}>
        Generate Meta Tags
      </button>
      {metaTags && (
        <pre
          className="bg-light p-3 mt-3 rounded"
          style={{ whiteSpace: "pre-wrap" }}
        >
          {metaTags}
        </pre>
      )}
    </div>
  );
};

export default MetaTagGenerator;
