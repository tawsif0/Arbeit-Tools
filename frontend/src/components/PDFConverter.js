import React, { useState } from "react";
import axios from "axios";

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
    <div className="card p-4 shadow-sm">
      <h3>PDF Converter</h3>
      <input
        type="file"
        className="form-control mb-3"
        accept=".doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.html"
        onChange={handleFileChange}
      />
      <button
        className="btn btn-primary"
        onClick={handleConvert}
        disabled={!file || loading}
      >
        {loading ? "Converting..." : "Convert to PDF"}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {downloadUrl && (
        <div className="mt-3">
          <a
            href={downloadUrl}
            download={`${file.name.split(".")[0]}.pdf`}
            className="btn btn-success"
            onClick={() => {
              // Release the blob URL after download to avoid memory leaks
              setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
            }}
          >
            Download PDF
          </a>
        </div>
      )}
    </div>
  );
};

export default PDFConverter;
