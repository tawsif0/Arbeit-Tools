import React, { useState } from "react";
import axios from "axios";
import { FiFile, FiUpload, FiDownload, FiAlertCircle } from "react-icons/fi";
import "./PdfTOWord.css";
const PdfToWordConverter = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleConvert = async () => {
    if (!file) {
      setError("Please select a PDF file to convert");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/pdf-to-word/convert",
        formData,
        { responseType: "blob" }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      const contentDisposition = response.headers["content-disposition"];
      let fileName = "converted.docx";
      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
        if (fileNameMatch.length === 2) fileName = fileNameMatch[1];
      }

      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="words-converter-glass">
      <div className="words-header">
        <FiFile className="words-header-icon" />
        <h2>Document Alchemist</h2>
        <p>Transform PDFs to Editable Word Documents</p>
      </div>

      <div className="words-upload-area">
        <input
          type="file"
          id="wordFileInput"
          accept="application/pdf"
          onChange={handleFileChange}
        />
        <label htmlFor="wordFileInput" className="words-upload-label">
          <FiUpload className="words-upload-icon" />
          {file ? (
            <div className="words-file-preview">
              <span className="words-file-name">{file.name}</span>
            </div>
          ) : (
            <>
              <span className="words-upload-text">Drag & Drop PDF Here</span>
              <span className="words-upload-subtext">or click to browse</span>
            </>
          )}
        </label>
      </div>

      <button
        className="words-convert-btn"
        onClick={handleConvert}
        disabled={loading}
      >
        {loading ? (
          <div className="words-spinner" />
        ) : (
          <>
            <span className="words-btn-shine"></span>
            <FiDownload className="words-btn-icon" />
            Alchemize to Word
          </>
        )}
      </button>

      {error && (
        <div className="words-error-message">
          <FiAlertCircle className="words-error-icon" />
          {error}
        </div>
      )}
    </div>
  );
};

export default PdfToWordConverter;
