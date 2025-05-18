// components/GPACalculator.js
import React, { useState } from "react";
import axios from "axios";

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
        grades: gradeList
      });
      setGpa(res.data.gpa);
      setError("");
    } catch {
      setError("Calculation failed");
      setGpa(null);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>GPA Calculator</h3>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter grades comma separated, e.g. 3.5,4.0,3.8"
        value={grades}
        onChange={(e) => setGrades(e.target.value)}
      />
      <button className="btn btn-primary" onClick={calculateGPA}>
        Calculate GPA
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {gpa !== null && !error && (
        <div className="alert alert-success mt-3">GPA: {gpa}</div>
      )}
    </div>
  );
};

export default GPACalculator;
