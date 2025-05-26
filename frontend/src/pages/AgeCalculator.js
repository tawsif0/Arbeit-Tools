import React, { useState } from "react";
import axios from "axios";
import {
  FiCalendar,
  FiGift,
  FiAlertCircle,
  FiChevronDown,
  FiClock,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "./AgeCalculator.css";

const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const [customDate, setCustomDate] = useState(""); // State to handle custom date
  const [age, setAge] = useState(null);
  const [error, setError] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Format date for input value (yyyy-mm-dd) for the date picker
  const formatDateForInput = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`; // Format to yyyy-mm-dd
  };

  // Parse date for backend (yyyy-mm-dd to yyyy-mm-dd)
  const parseDateForBackend = (date) => {
    return date; // No need to modify as it’s already in yyyy-mm-dd format
  };

  const calculateAge = async () => {
    if (!dob) {
      setError("Please select a date of birth");
      setAge(null);
      return;
    }

    setIsCalculating(true);
    try {
      const parsedDob = parseDateForBackend(dob); // Dob already in yyyy-mm-dd format
      const parsedCustomDate = customDate
        ? parseDateForBackend(customDate) // Custom date already in yyyy-mm-dd format
        : "";

      const res = await axios.post("http://localhost:5000/api/age/calculate", {
        dob: parsedDob,
        customDate: parsedCustomDate,
      });

      setAge(res.data);
      setError("");
    } catch {
      setError("Calculation failed. Please check your dates.");
      setAge(null);
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSetToday = () => {
    const today = new Date();
    setCustomDate(formatDateForInput(today)); // Set the custom date input to today's date
  };

  const handleClearAll = () => {
    setDob("");
    setCustomDate("");
    setAge(null);
    setError("");
  };

  return (
    <motion.div
      className="time-capsule"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="time-header">
        <motion.div
          className="time-icon"
          animate={{ rotate: isHovering ? 10 : 0 }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <FiGift />
        </motion.div>
        <h1>Age Alchemist</h1>
        <p>Transform moments into meaningful metrics</p>
      </div>

      <div className="time-inputs">
        <div className="time-input-group">
          <FiCalendar className="time-input-icon" />
          <input
            type="date"
            className="time-input"
            value={dob ? formatDateForInput(dob) : ""}
            onChange={(e) => setDob(e.target.value)} // Directly update with yyyy-mm-dd format
          />
          <label className="time-floating-label">Date of Birth</label>
          <div className="time-input-highlight"></div>
        </div>

        <div className="time-input-group">
          <FiCalendar className="time-input-icon" />
          <input
            type="date"
            className="time-input"
            value={customDate ? formatDateForInput(customDate) : ""}
            onChange={(e) => setCustomDate(e.target.value)} // Use yyyy-mm-dd format
          />
          <label className="time-floating-label">Custom Date</label>
          <button className="time-today-btn" onClick={handleSetToday}>
            Today
          </button>
          <div className="time-input-highlight"></div>
        </div>
      </div>

      <div className="time-actions">
        <motion.button
          className="time-calculate-btn"
          onClick={calculateAge}
          disabled={isCalculating}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isCalculating ? (
            <div className="time-spinner" />
          ) : (
            <>
              <span className="time-btn-shine"></span>
              <span className="time-btn-text">Reveal Age</span>
              <FiClock className="time-btn-icon" />
            </>
          )}
        </motion.button>

        <button className="time-clear-btn" onClick={handleClearAll}>
          Clear All
        </button>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="time-error-message"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <FiAlertCircle className="time-error-icon" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {age && !error && (
          <motion.div
            className="time-result-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="time-age-display">
              <div className="time-age-item">
                <span className="time-age-number">{age.years}</span>
                <span className="time-age-label">Years</span>
              </div>
              <div className="time-age-item">
                <span className="time-age-number">{age.months}</span>
                <span className="time-age-label">Months</span>
              </div>
              <div className="time-age-item">
                <span className="time-age-number">{age.days}</span>
                <span className="time-age-label">Days</span>
              </div>
            </div>

            <div className="time-particles">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="time-particle"
                  animate={{
                    y: [0, -20, 0],
                    rotate: [0, 180, 360],
                    opacity: [0.2, 0.8, 0.2],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <FiGift />
                </motion.div>
              ))}
            </div>

            <div
              className="time-details-toggle"
              onClick={() => setShowDetails(!showDetails)}
            >
              <span>Advanced Details</span>
              <FiChevronDown
                className={`time-details-icon ${showDetails ? "rotate" : ""}`}
              />
            </div>

            {showDetails && (
              <motion.div
                className="time-details"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="time-detail-item">
                  <span className="time-detail-label">Total Months:</span>
                  <span className="time-detail-value">
                    {age.years * 12 + age.months}
                  </span>
                </div>
                <div className="time-detail-item">
                  <span className="time-detail-label">Total Weeks:</span>
                  <span className="time-detail-value">
                    {Math.floor(
                      (age.years * 365 + age.months * 30 + age.days) / 7
                    )}
                  </span>
                </div>
                <div className="time-detail-item">
                  <span className="time-detail-label">Total Days:</span>
                  <span className="time-detail-value">
                    {age.years * 365 + age.months * 30 + age.days}
                  </span>
                </div>
                <div className="time-detail-item">
                  <span className="time-detail-label">Total Hours:</span>
                  <span className="time-detail-value">
                    {(age.years * 365 + age.months * 30 + age.days) * 24}
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AgeCalculator;
