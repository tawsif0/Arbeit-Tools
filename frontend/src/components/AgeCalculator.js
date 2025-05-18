// components/AgeCalculator.js
import React, { useState } from "react";
import axios from "axios";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = async () => {
    if (!dob) {
      setError("Please select a date of birth");
      setAge(null);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/age/calculate", {
        dob
      });
      setAge(res.data.age);
      setError("");
    } catch {
      setError("Calculation failed");
      setAge(null);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>Age Calculator</h3>
      <input
        type="date"
        className="form-control mb-3"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
      />
      <button className="btn btn-primary" onClick={calculateAge}>
        Calculate Age
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {age !== null && !error && (
        <div className="alert alert-success mt-3">Age: {age} years</div>
      )}
    </div>
  );
};

export default AgeCalculator;
