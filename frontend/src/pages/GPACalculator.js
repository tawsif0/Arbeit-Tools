// components/GPACalculator.js
import React, { useState } from "react";
import axios from "axios";
import "./GPACal.css";
const GPACalculator = () => {
  const [grades, setGrades] = useState("");
  const [gpa, setGpa] = useState(null);
  const [error, setError] = useState("");

  const calculateGPA = async () => {
    try {
      const gradeList = grades
        .split(",")
        .map((g) => parseFloat(g.trim()))
        .filter((g) => !isNaN(g));
      if (gradeList.length === 0) {
        setError("Enter valid comma separated grades.");
        setGpa(null);
        return;
      }
      const res = await axios.post("http://localhost:5000/api/gpa/calculate", {
        grades: gradeList,
      });
      setGpa(res.data.gpa);
      setError("");
    } catch {
      setError("Calculation failed");
      setGpa(null);
    }
  };

  return (
    <div className="gpa-calculator my-5">
      <div className="gpa-header">
        <h2 className="gpa-title">Grade Master</h2>
        <p className="gpa-subtitle">Calculate your GPA in style</p>
      </div>

      <div className="gpa-input-group">
        <input
          type="text"
          className="gpa-input"
          placeholder="Enter grades (e.g., 3.5, 4.0, 3.8)..."
          value={grades}
          onChange={(e) => setGrades(e.target.value)}
        />
        <button className="gpa-button" onClick={calculateGPA}>
          <span className="gpa-button-text">Calculate</span>
          <span className="gpa-button-icon">📊</span>
        </button>
      </div>

      {error && <div className="gpa-alert gpa-alert-error">{error}</div>}

      {gpa !== null && !error && (
        <div className="gpa-result">
          <div className="gpa-result-label">Your GPA</div>
          <div className="gpa-result-score">{gpa}</div>
          <div className="gpa-result-stars">
            {Array.from({ length: Math.floor(gpa) }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GPACalculator;
