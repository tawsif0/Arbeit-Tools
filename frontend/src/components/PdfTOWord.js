import React, { useState } from "react";
import axios from "axios";

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
      setError("Please select a PDF file to convert.");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
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
        {
          responseType: "blob" // Important for file download
        }
      );

      // Create a Blob URL for the Word file
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;

      // Use Content-Disposition filename or fallback
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
      setLoading(false);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>PDF to Word Converter</h3>
      <input
        type="file"
        accept="application/pdf"
        className="form-control mb-3"
        onChange={handleFileChange}
      />
      <button
        className="btn btn-primary"
        onClick={handleConvert}
        disabled={loading}
      >
        {loading ? "Converting..." : "Convert to Word"}
      </button>
      {error && (
        <div className="alert alert-danger mt-3" role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default PdfToWordConverter;
