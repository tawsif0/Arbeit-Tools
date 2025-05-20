import React, { useState } from "react";
import axios from "axios";
import { FiCalendar, FiGift, FiAlertCircle } from "react-icons/fi"; // Replaced FiCake with FiGift
import "./AgeCalculator.css";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [customDate, setCustomDate] = useState(""); // New state to handle custom date
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  // Helper function to format the date in dd/mm/yyyy format
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Helper function to parse dd/mm/yyyy into yyyy-mm-dd format for input[type="date"]
  const parseDateForBackend = (date) => {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  };

  const calculateAge = async () => {
    if (!dob) {
      setError("Please select a date of birth");
      setAge(null);
      return;
    }

    setIsCalculating(true);
    try {
      const parsedDob = parseDateForBackend(dob);
      const parsedCustomDate = customDate
        ? parseDateForBackend(customDate)
        : "";

      const res = await axios.post("http://localhost:5000/api/age/calculate", {
        dob: parsedDob,
        customDate: parsedCustomDate,
      });

      setAge(res.data);
      setError("");
    } catch {
      setError("Calculation failed");
      setAge(null);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="dob-glass-container">
      <div className="dob-header">
        <FiGift className="dob-header-icon" />
        <h2>Time Alchemist</h2>
        <p>Discover Your Temporal Journey</p>
      </div>

      <div className="dob-inputs">
        <div className="dob-input-group">
          <FiCalendar className="dob-input-icon" />
          <input
            type="date"
            className="dob-input"
            value={dob ? dob.split("/").reverse().join("-") : ""} // Convert dd/mm/yyyy to yyyy-mm-dd for input value
            onChange={(e) => setDob(formatDateForInput(e.target.value))}
          />
          <label className="floating-label">Date of Birth</label>
          <div className="dob-input-highlight"></div>
        </div>

        <div className="dob-input-group">
          <FiCalendar className="dob-input-icon" />
          <input
            type="date"
            className="dob-input"
            value={customDate ? customDate.split("/").reverse().join("-") : ""} // Convert dd/mm/yyyy to yyyy-mm-dd for input value
            onChange={(e) => setCustomDate(formatDateForInput(e.target.value))}
          />
          <label className="floating-label">Custom Date (Optional)</label>
          <div className="dob-input-highlight"></div>
        </div>
      </div>

      <button
        className="dob-calculate-btn"
        onClick={calculateAge}
        disabled={isCalculating}
      >
        {isCalculating ? (
          <div className="dob-spinner" />
        ) : (
          <>
            <span className="dob-btn-shine"></span>
            Unveil Time's Secret
          </>
        )}
      </button>

      {error && (
        <div className="dob-error-message">
          <FiAlertCircle className="dob-error-icon" />
          {error}
        </div>
      )}

      {age && !error && (
        <div className="dob-result-card">
          <div className="dob-age-display">
            <span className="dob-age-number">{age.years}</span>
            <span className="dob-age-label">Years</span>
          </div>
          <div className="dob-age-display">
            <span className="dob-age-number">{age.months}</span>
            <span className="dob-age-label">Months</span>
          </div>
          <div className="dob-age-display">
            <span className="dob-age-number">{age.days}</span>
            <span className="dob-age-label">Days</span>
          </div>
          <div className="dob-particles">
            {[...Array(6)].map((_, i) => (
              <FiGift key={i} className="dob-particle" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AgeCalculator;
