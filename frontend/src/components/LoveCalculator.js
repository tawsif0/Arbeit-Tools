// components/LoveCalculator.js
import React, { useState } from "react";
import axios from "axios";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateLove = async () => {
    if (!name1.trim() || !name2.trim()) {
      setError("Please enter both names.");
      setResult(null);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/love/calculate", {
        name1,
        name2
      });
      setResult(res.data.compatibility);
      setError("");
    } catch {
      setError("Calculation failed");
      setResult(null);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>Love Calculator / Name Compatibility</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Your Name"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Partner's Name"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
      />
      <button className="btn btn-primary" onClick={calculateLove}>
        Calculate Compatibility
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {result !== null && !error && (
        <div className="alert alert-success mt-3">Compatibility: {result}%</div>
      )}
    </div>
  );
};

export default LoveCalculator;
