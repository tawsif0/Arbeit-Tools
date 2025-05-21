import React, { useState } from "react";
import axios from "axios";
import "./BMICalculator.css";

const BMICalculator = () => {
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightCm, setHeightCm] = useState("");
  const [heightM, setHeightM] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [heightUnit, setHeightUnit] = useState("cm"); // default to cm
  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");

  // Convert height to meters based on selected unit
  const convertHeightToMeters = () => {
    switch (heightUnit) {
      case "cm":
        return heightCm / 100;
      case "m":
        return heightM;
      case "ft":
        return (
          parseFloat(heightFt || 0) * 0.3048 +
          parseFloat(heightIn || 0) * 0.0254
        );
      default:
        return 0;
    }
  };

  // Convert weight to kg based on selected unit
  const convertWeightToKg = () => {
    return weightUnit === "kg"
      ? parseFloat(weight || 0)
      : parseFloat(weight || 0) * 0.453592;
  };

  // Handle inch input - convert to feet if >= 12
  const handleInchChange = (value) => {
    let inches = parseFloat(value) || 0;
    let feet = parseFloat(heightFt) || 0;

    if (inches >= 12) {
      feet += Math.floor(inches / 12);
      inches = inches % 12;
    }

    setHeightFt(feet.toString());
    setHeightIn(inches.toString());
  };

  const calculateBMI = async () => {
    const heightInMeters = convertHeightToMeters();
    const weightInKg = convertWeightToKg();

    if (!weight || weight <= 0) {
      setError("Please enter a valid positive weight.");
      setBmi(null);
      return;
    }

    if (
      (heightUnit === "cm" && (!heightCm || heightCm <= 0)) ||
      (heightUnit === "m" && (!heightM || heightM <= 0)) ||
      (heightUnit === "ft" && (!heightFt || heightFt <= 0))
    ) {
      setError("Please enter valid positive height values.");
      setBmi(null);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/bmi/calculate", {
        weight: weightInKg,
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
          <label className="bmi-label">Weight</label>
          <div className="bmi-weight-group">
            <input
              type="number"
              className="bmi-input"
              placeholder={`Enter weight in ${weightUnit}`}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <div className="bmi-unit-selector">
              {["kg", "lbs"].map((unit) => (
                <button
                  key={unit}
                  className={`bmi-unit-btn ${
                    weightUnit === unit ? "active" : ""
                  }`}
                  onClick={() => setWeightUnit(unit)}
                >
                  {unit.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="bmi-input-container">
          <label className="bmi-label">Height</label>
          <div className="bmi-unit-selector">
            {["cm", "m", "ft"].map((unit) => (
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

          {heightUnit === "cm" && (
            <input
              type="number"
              className="bmi-input"
              placeholder="Height in centimeters"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
            />
          )}

          {heightUnit === "m" && (
            <input
              type="number"
              className="bmi-input"
              placeholder="Height in meters"
              value={heightM}
              onChange={(e) => setHeightM(e.target.value)}
            />
          )}

          {heightUnit === "ft" && (
            <div className="bmi-height-ft-in">
              <input
                type="number"
                className="bmi-input"
                placeholder="Feet"
                value={heightFt}
                onChange={(e) => setHeightFt(e.target.value)}
              />
              <input
                type="number"
                className="bmi-input"
                placeholder="Inches"
                value={heightIn}
                onChange={(e) => handleInchChange(e.target.value)}
              />
            </div>
          )}
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
