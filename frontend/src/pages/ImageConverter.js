import React, { useState } from "react";
import axios from "axios";
import {
  FiImage,
  FiUpload,
  FiDownload,
  FiAlertCircle,
  FiFile,
} from "react-icons/fi";
import "./ImageConverter.css";

const ImageConverter = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl(null);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select an image file");
      return;
    }

    setIsConverting(true);
    setError("");

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
    } catch (err) {
      setError(err.response?.data?.error || "Conversion failed");
    } finally {
      setIsConverting(false);
    }
  };

  return (
    <div className="image-converter-glass">
      <div className="converter-headers">
        <FiImage className="header-icons" />
        <h2>Image Converter</h2>
        <p>Transform images to PNG format</p>
      </div>

      <div className="file-upload-areas">
        <input
          type="file"
          id="imageFileInput"
          onChange={handleFileChange}
          accept="image/*"
        />
        <label htmlFor="imageFileInput" className="upload-labels">
          <FiUpload className="upload-icons" />
          {file ? (
            <div className="file-previews">
              <FiFile className="file-icons" />
              <span className="file-names">{file.name}</span>
            </div>
          ) : (
            <span className="upload-texts">Drag & drop or click to upload</span>
          )}
        </label>
      </div>

      <button
        className="convert-btns"
        onClick={handleConvert}
        disabled={!file || isConverting}
      >
        {isConverting ? (
          <div className="spinners" />
        ) : (
          <>
            <FiImage className="btn-icons" />
            Convert to PNG
          </>
        )}
      </button>

      {error && (
        <div className="error-messages">
          <FiAlertCircle className="error-icons" />
          {error}
        </div>
      )}

      {downloadUrl && (
        <a
          href={downloadUrl}
          download="converted.png"
          className="download-btns"
        >
          <FiDownload className="btn-icon" />
          Download PNG
        </a>
      )}
    </div>
  );
};

export default ImageConverter;
