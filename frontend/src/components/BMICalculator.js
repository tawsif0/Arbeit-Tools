import React, { useState } from "react";
import axios from "axios";
import "./BMICalculator.css";
const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [heightUnit, setHeightUnit] = useState("m"); // default to meters
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");

  // Helper function to convert height to meters
  const convertHeightToMeters = (height, unit) => {
    if (unit === "m") {
      return height; // already in meters
    } else if (unit === "cm") {
      return height / 100; // convert cm to meters
    } else if (unit === "ft") {
      return height * 0.3048; // convert feet to meters
    }
    return height;
  };

  const calculateBMI = async () => {
    if (!weight || !height || weight <= 0 || height <= 0) {
      setError("Please enter valid positive numbers for weight and height.");
      setBmi(null);
      return;
    }

    // Convert height to meters
    const heightInMeters = convertHeightToMeters(height, heightUnit);

    try {
      const res = await axios.post("http://localhost:5000/api/bmi/calculate", {
        weight: Number(weight),
        height: heightInMeters,
      });
      setBmi(res.data.bmi);
      setError("");
    } catch {
      setError("Calculation failed.");
      setBmi(null);
    }
  };
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight 🌱";
    if (bmi < 25) return "Healthy Weight 🎯";
    if (bmi < 30) return "Overweight ⚠️";
    return "Obesity 🛑";
  };
  return (
    <div className="bmi-calculator">
      <div className="bmi-header">
        <h2 className="bmi-title">Body Mass Index Calculator</h2>
        <p className="bmi-subtitle">Know your health status</p>
      </div>

      <div className="bmi-input-group">
        <div className="bmi-input-container">
          <label className="bmi-label">Weight (kg)</label>
          <input
            type="number"
            className="bmi-input"
            placeholder="Enter weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        <div className="bmi-input-container">
          <label className="bmi-label">Height</label>
          <div className="bmi-height-group">
            <input
              type="number"
              className="bmi-input"
              placeholder="Enter height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
            <div className="bmi-unit-selector">
              {["m", "cm", "ft"].map((unit) => (
                <button
                  key={unit}
                  className={`bmi-unit-btn ${
                    heightUnit === unit ? "active" : ""
                  }`}
                  onClick={() => setHeightUnit(unit)}
                >
                  {unit.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="bmi-calculate-btn" onClick={calculateBMI}>
        Calculate BMI
        <span className="bmi-btn-icon">⚡</span>
      </button>

      {error && <div className="bmi-alert error">⚠️ {error}</div>}

      {bmi && !error && (
        <div className="bmi-result">
          <div className="bmi-result-value">
            Your BMI: <span className="highlight">{bmi}</span>
          </div>
          <div
            className={`bmi-category ${getBmiCategory(bmi)
              .replace(/\s\W+/g, "")
              .toLowerCase()}`}
          >
            {getBmiCategory(bmi)}
          </div>
          <div className="bmi-progress">
            <div
              className="bmi-progress-bar"
              style={{ width: `${Math.min((bmi / 40) * 100, 100)}%` }}
            ></div>
            <div className="bmi-scale">
              <span>18.5</span>
              <span>25</span>
              <span>30</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
