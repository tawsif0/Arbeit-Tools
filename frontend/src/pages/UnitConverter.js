import React, { useState } from "react";
import axios from "axios";
import { FiArrowRight, FiRepeat, FiAirplay } from "react-icons/fi";
import "./UnitConverter.css";

const UnitConverter = () => {
  const [input, setInput] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isConverting, setIsConverting] = useState(false);

  const units = [
    { value: "meter", label: "Meter" },
    { value: "kilometer", label: "Kilometer" },
    { value: "mile", label: "Mile" },
    { value: "cm", label: "Centimeter" },
    { value: "ft", label: "Feet" },
    { value: "inch", label: "Inch" },
  ];

  const handleConvert = async () => {
    if (!input || isNaN(input)) {
      setError("Please enter a valid number");
      setResult(null);
      return;
    }

    setIsConverting(true);
    try {
      const res = await axios.post(
        "https://toolsapi.arbeittechnology.com/api/unit/convert",
        {
          input: Number(input),
          fromUnit,
          toUnit,
        }
      );
      setResult(res.data.result);
      setError("");
    } catch (err) {
      setError("Conversion failed. Please check your input");
    } finally {
      setIsConverting(false);
    }
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
  };

  return (
    <div className="converter-glass my-5">
      <div className="converter-header">
        <FiAirplay className="header-icon" />
        <h2>Unit Converter</h2>
      </div>

      <div className="converter-body">
        <div className="input-group">
          <input
            type="number"
            className="converter-input"
            placeholder="Enter value"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <span className="input-decoration" />
        </div>

        <div className="unit-selectors">
          <select
            className="unit-select"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>

          <button className="swap-btn" onClick={swapUnits}>
            <FiRepeat />
          </button>

          <select
            className="unit-select"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
          >
            {units.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </select>
        </div>

        <button
          className="convert-btn"
          onClick={handleConvert}
          disabled={isConverting}
        >
          {isConverting ? (
            <div className="spinner" />
          ) : (
            <>
              <FiArrowRight className="btn-icon" />
              Convert
            </>
          )}
        </button>

        {error && (
          <div className="json-alert json-alert-error">
            <span className="json-alert-icon">⚠️</span> {error}
          </div>
        )}

        {result !== null && !error && (
          <div className="result-card">
            <div className="result-value">
              {result.toFixed(4)}
              <span className="result-unit">{toUnit}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitConverter;
