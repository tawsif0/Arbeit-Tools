// components/WordCharacterCounter.js
import React, { useState } from "react";

const WordCharacterCounter = () => {
  const [text, setText] = useState("");

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const characters = text.length;

  return (
    <div className="card p-4 shadow-sm">
      <h3>Word & Character Counter</h3>
      <textarea
        rows="6"
        className="form-control mb-3"
        placeholder="Type or paste text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div>
        <strong>Words:</strong> {words} &nbsp;&nbsp;{" "}
        <strong>Characters:</strong> {characters}
      </div>
    </div>
  );
};

export default WordCharacterCounter;
