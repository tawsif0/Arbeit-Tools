// components/UnitConverter.js
import React, { useState } from "react";
import axios from "axios";

const UnitConverter = () => {
  const [input, setInput] = useState("");
  const [fromUnit, setFromUnit] = useState("meter");
  const [toUnit, setToUnit] = useState("kilometer");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleConvert = async () => {
    if (!input || isNaN(input)) {
      setError("Please enter a valid number.");
      setResult(null);
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/unit/convert", {
        input: Number(input),
        fromUnit,
        toUnit
      });
      setResult(res.data.result);
      setError("");
    } catch (err) {
      setError("Conversion failed.");
      setResult(null);
    }
  };

  return (
    <div className="card p-4 shadow-sm">
      <h3>Unit Converter</h3>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="mb-3 d-flex gap-2">
        <select
          className="form-select"
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
        >
          <option value="meter">Meter</option>
          <option value="kilometer">Kilometer</option>
          <option value="mile">Mile</option>
        </select>
        <select
          className="form-select"
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
        >
          <option value="meter">Meter</option>
          <option value="kilometer">Kilometer</option>
          <option value="mile">Mile</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={handleConvert}>
        Convert
      </button>
      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {result !== null && !error && (
        <div className="alert alert-success mt-3">
          Result: {result} {toUnit}
        </div>
      )}
    </div>
  );
};

export default UnitConverter;
