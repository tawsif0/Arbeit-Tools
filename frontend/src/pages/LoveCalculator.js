import React, { useState } from "react";
import axios from "axios";
import { FiHeart, FiArrowRight, FiAlertTriangle } from "react-icons/fi";
import "./LoveCalculator.css";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [dob1, setDob1] = useState("");
  const [dob2, setDob2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [isSpecialMatch, setIsSpecialMatch] = useState(false);

  const calculateLove = async () => {
    if (!name1.trim() || !name2.trim() || !dob1 || !dob2) {
      setError("Please fill all fields");
      setResult(null);
      return;
    }

    setIsCalculating(true);
    try {
      // 1% chance to get 100% compatibility
      const isLuckyMatch = Math.random() < 0.01;
      setIsSpecialMatch(isLuckyMatch);

      const res = await axios.post(
        "https://toolsapi.arbeittechnology.com/api/love/calculate",
        {
          name1,
          name2,
          dob1,
          dob2,
          isLuckyMatch,
        }
      );

      setResult(res.data.compatibility);
      setError("");
    } catch {
      setError("Failed to calculate love");
      setResult(null);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="love-glass-container">
      <div className="love-heart-bg"></div>

      <div className="love-content">
        <div className="love-header">
          <FiHeart className="love-icon" />
          <h2> Love Calculator</h2>
          <p>Discover your compatibility with your partner</p>
        </div>

        <div className="love-inputs">
          <div className="love-input-group">
            <label htmlFor="name1" className="love-input-label">
              Your Name
            </label>
            <input
              type="text"
              id="name1"
              className="love-input"
              placeholder="Your Name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
            <div className="love-input-decoration"></div>
          </div>

          <div className="love-input-group">
            <label htmlFor="dob1" className="love-input-label">
              Your Date of Birth
            </label>
            <input
              type="date"
              id="dob1"
              className="love-input"
              value={dob1}
              onChange={(e) => setDob1(e.target.value)}
            />
            <div className="love-input-decoration"></div>
          </div>

          <div className="love-heart-divider">
            <FiHeart className="love-divider-icon" />
          </div>

          <div className="love-input-group">
            <label htmlFor="name2" className="love-input-label">
              Partner's Name
            </label>
            <input
              type="text"
              id="name2"
              className="love-input"
              placeholder="Partner's Name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
            />
            <div className="love-input-decoration"></div>
          </div>

          <div className="love-input-group">
            <label htmlFor="dob2" className="love-input-label">
              Partner's Date of Birth
            </label>
            <input
              type="date"
              id="dob2"
              className="love-input"
              value={dob2}
              onChange={(e) => setDob2(e.target.value)}
            />
            <div className="love-input-decoration"></div>
          </div>
        </div>

        <button
          className="love-calculate-btn"
          onClick={calculateLove}
          disabled={isCalculating}
        >
          {isCalculating ? (
            <div className="love-spinner" />
          ) : (
            <>
              <span className="love-btn-shine"></span>
              <FiArrowRight className="love-btn-icon" />
              Calculate Compatibility
            </>
          )}
        </button>

        {error && (
          <div className="love-error-message">
            <FiAlertTriangle className="love-error-icon" />
            {error}
          </div>
        )}

        {result !== null && !error && (
          <div
            className={`love-result-card ${
              isSpecialMatch ? "special-match" : ""
            }`}
          >
            <div className="love-percentage">{result}%</div>
            <div className="love-compatibility-text">
              {isSpecialMatch ? (
                <>
                  Soulmate Found! 💘
                  <br />
                  You're among the 1% perfect matches!
                </>
              ) : (
                "Love Compatibility Score"
              )}
            </div>
            <div className="love-heart-particles">
              {[...Array(isSpecialMatch ? 15 : 5)].map((_, i) => (
                <FiHeart key={i} className="love-particle" />
              ))}
            </div>
            {result > 80 && (
              <div className="love-zodiac-info">
                Your signs are highly compatible!
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveCalculator;
