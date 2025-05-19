import React, { useState } from "react";
import axios from "axios";
import { FiHeart, FiArrowRight, FiAlertTriangle } from "react-icons/fi";
import "./LoveCalculator.css";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateLove = async () => {
    if (!name1.trim() || !name2.trim()) {
      setError("Please enter both names");
      setResult(null);
      return;
    }

    setIsCalculating(true);
    try {
      const res = await axios.post("http://localhost:5000/api/love/calculate", {
        name1,
        name2,
      });
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
          <h2>Soulmate Spark</h2>
          <p>Discover Your Cosmic Connection</p>
        </div>

        <div className="love-inputs">
          <div className="love-input-group">
            <input
              type="text"
              className="love-input"
              placeholder="Your Name"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
            />
            <div className="love-input-decoration"></div>
          </div>

          <div className="love-heart-divider">
            <FiHeart className="love-divider-icon" />
          </div>

          <div className="love-input-group">
            <input
              type="text"
              className="love-input"
              placeholder="Partner's Name"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
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
              Ignite the Spark
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
          <div className="love-result-card">
            <div className="love-percentage">{result}%</div>
            <div className="love-compatibility-text">
              Cosmic Compatibility Score
            </div>
            <div className="love-heart-particles">
              {[...Array(5)].map((_, i) => (
                <FiHeart key={i} className="love-particle" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoveCalculator;
