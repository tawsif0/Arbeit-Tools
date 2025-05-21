import React, { useState } from "react";
import axios from "axios";
import {
  FiUpload,
  FiFileText,
  FiDownload,
  FiAlertCircle,
} from "react-icons/fi";
import "./PDFConverter.css";

const PDFConverter = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setDownloadUrl(null);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please upload a file");
      return;
    }

    setLoading(true);
    setError("");
    setDownloadUrl(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "http://localhost:5000/api/pdf/generate",
        formData,
        { responseType: "blob" }
      );

      // Create a blob URL for the PDF file
      const url = URL.createObjectURL(
        new Blob([response.data], { type: "application/pdf" })
      );
      setDownloadUrl(url);
    } catch (err) {
      console.error("Conversion error:", err);
      setError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="pdf-converter-glass my-5">
      <div className="pdf-header">
        <FiFileText className="header-icon" />
        <h2>File to PDF Converter</h2>
        <p>Convert various formats to PDF</p>
      </div>

      <div className="file-upload-area">
        <input
          type="file"
          id="pdfFileInput"
          onChange={handleFileChange}
          accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.html"
        />
        <label htmlFor="pdfFileInput" className="upload-label">
          <FiUpload className="upload-icon" />
          {file ? (
            <span className="file-name">{file.name}</span>
          ) : (
            <>
              <span>Choose File</span>
              <span className="supported-formats">
                (DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, HTML)
              </span>
            </>
          )}
        </label>
      </div>

      <button
        className="convert-btn"
        onClick={handleConvert}
        disabled={!file || loading}
      >
        {loading ? (
          <div className="spinner" />
        ) : (
          <>
            <FiFileText className="btn-icon" />
            Convert to PDF
          </>
        )}
      </button>

      {error && (
        <div className="error-message">
          <FiAlertCircle className="error-icon" />
          {error}
        </div>
      )}

      {downloadUrl && (
        <a
          href={downloadUrl}
          download={`${file.name.split(".")[0]}.pdf`}
          className="download-btn"
          onClick={() => {
            setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
          }}
        >
          <FiDownload className="btn-icon" />
          Download PDF
        </a>
      )}
    </div>
  );
};

export default PDFConverter;
