// components/BMICalculator.js
import React, { useState } from "react";
import axios from "axios";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");

  const calculateBMI = async () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      setError("Please enter valid positive numbers for weight and height.");
      setBmi(null);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/bmi/calculate", {
        weight: Number(weight),
        height: Number(height)
      });
      setBmi(res.data.bmi);
      setError("");
    } catch {
      setError("Calculation failed.");
      setBmi(null);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>BMI Calculator</h3>
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Weight (kg)"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Height (m)"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <button className="btn btn-primary" onClick={calculateBMI}>
        Calculate BMI
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {bmi && !error && (
        <div className="alert alert-success mt-3">BMI: {bmi}</div>
      )}
    </div>
  );
};

export default BMICalculator;
