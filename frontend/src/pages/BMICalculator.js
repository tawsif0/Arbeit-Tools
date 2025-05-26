import React, { useState } from "react";
import "./BMICalculator.css";

const BMICalculator = () => {
  // Weight parts
  const [weightUnit, setWeightUnit] = useState("kg");
  const [weightWhole, setWeightWhole] = useState(""); // kg or lbs
  const [weightFrac, setWeightFrac] = useState(""); // grams or ounces

  // Height parts
  const [heightUnit, setHeightUnit] = useState("cm");
  const [heightWhole, setHeightWhole] = useState(""); // meters, cm or feet
  const [heightFrac, setHeightFrac] = useState(""); // cm, mm or inches

  const [bmi, setBmi] = useState(null);
  const [error, setError] = useState("");

  // Convert weight input to kg
  const convertWeightToKg = () => {
    let whole = parseInt(weightWhole) || 0;
    let frac = parseInt(weightFrac) || 0;
    if (weightUnit === "kg") {
      // grams to kg
      return whole + frac / 1000;
    } else {
      // lbs + ounces to kg (1 lb = 0.453592 kg, 1 oz = 0.0283495 kg)
      return whole * 0.453592 + frac * 0.0283495;
    }
  };

  // Convert height input to meters
  const convertHeightToMeters = () => {
    let whole = parseInt(heightWhole) || 0;
    let frac = parseInt(heightFrac) || 0;
    switch (heightUnit) {
      case "m":
        // meters + centimeters to meters
        return whole + frac / 100;
      case "cm":
        // centimeters + millimeters to meters
        return (whole + frac / 10) / 100;
      case "ft":
        // feet + inches to meters
        return whole * 0.3048 + frac * 0.0254;
      default:
        return 0;
    }
  };

  // Format weight difference for output
  const formatWeightDiff = (kgDiff) => {
    if (weightUnit === "kg") {
      const kgPart = Math.floor(kgDiff);
      const gPart = Math.round((kgDiff - kgPart) * 1000);
      return `${kgPart} kg ${gPart} g`;
    } else {
      // lbs and ounces
      const lbsPart = Math.floor(kgDiff / 0.453592);
      const ozPart = Math.round((kgDiff / 0.453592 - lbsPart) * 16);
      return `${lbsPart} lbs ${ozPart} oz`;
    }
  };

  // Calculate BMI and weight difference needed
  const calculateBMI = () => {
    const weightKg = convertWeightToKg();
    const heightM = convertHeightToMeters();

    if (weightKg <= 0 || heightM <= 0) {
      setError("Please enter valid positive integers for all fields.");
      setBmi(null);
      return;
    }

    const bmiValue = weightKg / (heightM * heightM);
    setBmi(bmiValue.toFixed(1));
    setError("");
  };

  // Calculate weight to lose or gain for healthy BMI range (18.5 to 24.9)
  const getWeightDiffMessage = () => {
    if (!bmi) return null;

    const weightKg = convertWeightToKg();
    const heightM = convertHeightToMeters();

    const minHealthyWeight = 18.5 * heightM * heightM;
    const maxHealthyWeight = 24.9 * heightM * heightM;

    if (bmi < 18.5) {
      const diff = minHealthyWeight - weightKg;
      return `You should gain at least ${formatWeightDiff(
        diff
      )} to reach a healthy weight.`;
    } else if (bmi > 24.9) {
      const diff = weightKg - maxHealthyWeight;
      return `You should lose at least ${formatWeightDiff(
        diff
      )} to reach a healthy weight.`;
    }
    return "Your weight is within a healthy range!";
  };

  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return "Underweight 🌱";
    if (bmi < 25) return "Healthy Weight 🎯";
    if (bmi < 30) return "Overweight ⚠️";
    return "Obesity 🛑";
  };

  // Inputs accept only integers
  const handleIntInput = (setter) => (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setter(val);
    }
  };

  // Live normalize fractional weight input (grams or ounces)
  const handleWeightFracChange = (value) => {
    let frac = parseInt(value) || 0;
    let whole = parseInt(weightWhole) || 0;

    const fracLimit = weightUnit === "kg" ? 1000 : 16;

    if (frac >= fracLimit) {
      whole += Math.floor(frac / fracLimit);
      frac = frac % fracLimit;
      setWeightWhole(whole.toString());
    }
    setWeightFrac(frac.toString());
  };

  // Live normalize fractional height input (cm/mm or ft/in)
  const handleHeightFracChange = (value) => {
    let frac = parseInt(value) || 0;
    let whole = parseInt(heightWhole) || 0;

    const fracLimit = heightUnit === "m" ? 100 : heightUnit === "cm" ? 10 : 12;

    if (frac >= fracLimit) {
      whole += Math.floor(frac / fracLimit);
      frac = frac % fracLimit;
      setHeightWhole(whole.toString());
    }
    setHeightFrac(frac.toString());
  };

  return (
    <div className="bmi-calculator">
      <header className="bmi-header">
        <h1 className="bmi-title">Body Mass Index Calculator</h1>
        <p className="bmi-subtitle">Calculate your healthy weight range</p>
      </header>

      <div className="bmi-input-group">
        {/* Weight Section */}
        <div className="bmi-input-container">
          <label className="bmi-label">Weight</label>
          <div className="bmi-unit-selector">
            {["kg", "lbs"].map((unit) => (
              <button
                key={unit}
                className={`bmi-unit-btn ${
                  weightUnit === unit ? "active" : ""
                }`}
                onClick={() => {
                  setWeightUnit(unit);
                  setWeightWhole("");
                  setWeightFrac("");
                }}
              >
                {unit.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="bmi-weight-group">
            <input
              className="bmi-input"
              type="text"
              placeholder={weightUnit === "kg" ? "Kilograms" : "Pounds"}
              value={weightWhole}
              onChange={handleIntInput(setWeightWhole)}
            />
            <input
              className="bmi-input"
              type="text"
              placeholder={weightUnit === "kg" ? "Grams" : "Ounces"}
              value={weightFrac}
              onChange={(e) => handleWeightFracChange(e.target.value)}
              maxLength={weightUnit === "kg" ? 3 : 2}
            />
          </div>
        </div>

        {/* Height Section */}
        <div className="bmi-input-container">
          <label className="bmi-label">Height</label>
          <div className="bmi-unit-selector">
            {["cm", "m", "ft"].map((unit) => (
              <button
                key={unit}
                className={`bmi-unit-btn ${
                  heightUnit === unit ? "active" : ""
                }`}
                onClick={() => {
                  setHeightUnit(unit);
                  setHeightWhole("");
                  setHeightFrac("");
                }}
              >
                {unit.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="bmi-height-ft-in">
            <input
              className="bmi-input"
              type="text"
              placeholder={
                heightUnit === "m"
                  ? "Meters"
                  : heightUnit === "cm"
                  ? "Centimeters"
                  : "Feet"
              }
              value={heightWhole}
              onChange={handleIntInput(setHeightWhole)}
            />
            <input
              className="bmi-input"
              type="text"
              placeholder={
                heightUnit === "m"
                  ? "Centimeters"
                  : heightUnit === "cm"
                  ? "Millimeters"
                  : "Inches"
              }
              value={heightFrac}
              onChange={(e) => handleHeightFracChange(e.target.value)}
              maxLength={heightUnit === "cm" ? 1 : 2}
            />
          </div>
        </div>
      </div>

      <button className="bmi-calculate-btn" onClick={calculateBMI}>
        Calculate BMI
      </button>

      {error && <div className="bmi-alert error">⚠️ {error}</div>}

      {bmi &&
        !error &&
        (() => {
          const bmiValue = parseFloat(bmi);
          const minBMI = 18.5;
          const maxBMI = 30;
          let progressPercent = ((bmiValue - minBMI) / (maxBMI - minBMI)) * 100;
          progressPercent = Math.min(Math.max(progressPercent, 0), 100);

          // Calculate positions for scale markers as percentages
          const pos185 = ((18.5 - minBMI) / (maxBMI - minBMI)) * 100;
          const pos25 = ((25 - minBMI) / (maxBMI - minBMI)) * 100;
          const pos30 = ((30 - minBMI) / (maxBMI - minBMI)) * 100;

          return (
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
                  style={{ width: `${progressPercent}%` }}
                ></div>
                <div className="bmi-scale">
                  <span
                    style={{
                      left: `${pos185}%`,
                    }}
                  >
                    18.5
                  </span>
                  <span
                    style={{
                      left: `${pos25}%`,
                    }}
                  >
                    25
                  </span>
                  <span
                    style={{
                      left: `${pos30}%`,
                    }}
                  >
                    30
                  </span>
                </div>
              </div>
              <p className="bmi-recommendation">{getWeightDiffMessage()}</p>
            </div>
          );
        })()}
    </div>
  );
};

export default BMICalculator;
