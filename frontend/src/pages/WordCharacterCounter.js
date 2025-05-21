import React, { useState } from "react";
import { FiBook, FiType, FiMessageSquare, FiAlignLeft } from "react-icons/fi";
import "./WordCharacterCounter.css";

const WordCharacterCounter = () => {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;

  const sentences = text.trim()
    ? (text.match(/[^.!?]+[.!?]+[\s$]|[^.!?]+$/g) || []).length
    : 0;

  const lines = text === "" ? 0 : text.split(/\r\n|\r|\n/).length;

  return (
    <div className="word-counter-container my-5">
      <div className="word-counter-glass">
        <h2 className="word-counter-title">
          <FiBook className="title-icon" />
          Text Analyzer
        </h2>

        <div className="text-input-container">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="word-counter-textarea"
            rows="6"
          />
          <label className="floating-label">Your Text</label>
        </div>

        <div className="stats-grid">
          <StatCard
            icon={<FiType />}
            value={words}
            label="Words"
            color="var(--word-primary)"
          />
          <StatCard
            icon={<FiAlignLeft />}
            value={characters}
            label="Characters"
            color="var(--word-secondary)"
          />
          <StatCard
            icon={<FiMessageSquare />}
            value={sentences}
            label="Sentences"
            color="var(--word-primary)"
          />
          <StatCard
            icon={<FiAlignLeft />}
            value={lines}
            label="Lines"
            color="var(--word-secondary)"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label, color }) => (
  <div className="stat-card" style={{ "--card-color": color }}>
    <div className="stat-icon" style={{ backgroundColor: color }}>
      {icon}
    </div>
    <div className="stat-content">
      <h3>{value}</h3>
      <p>{label}</p>
    </div>
  </div>
);

export default WordCharacterCounter;
