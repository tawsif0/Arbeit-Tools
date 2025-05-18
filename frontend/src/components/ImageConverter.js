// components/ImageConverter.js
import React, { useState } from "react";
import axios from "axios";

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl(null);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please upload an image file");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:5000/api/image/convert",
        formData,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(
        new Blob([response.data], { type: "image/png" })
      );
      setDownloadUrl(url);
      setError("");
    } catch {
      setError("Conversion failed.");
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>Image Converter</h3>
      <input
        type="file"
        className="form-control mb-3"
        onChange={handleFileChange}
      />
      <button
        className="btn btn-primary"
        onClick={handleConvert}
        disabled={!file}
      >
        Convert to PNG
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {downloadUrl && (
        <div className="mt-3">
          <a
            href={downloadUrl}
            download="converted.png"
            className="btn btn-success"
          >
            Download PNG
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageConverter;
