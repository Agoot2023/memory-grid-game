import React from "react";
import Tile from "./Tile";

function ResultScreen({ patternGrid, userGrid, score, restart, theme, nextLevel }) {
  const size = patternGrid.length;
  const total = size * size;
  const accuracy = Math.round((score / total) * 100);

  return (
    <div className="screen-container">
      <h2>Results</h2>
      <p>Your Score: {score} / {total}</p>
      <p>Accuracy: {accuracy}%</p>

      <div style={{ display: "flex", justifyContent: "center", gap: "50px", marginTop: "20px" }}>
        {/* Original Grid */}
        <div>
          <h3>Original Pattern</h3>
          <div className="grid-wrapper" style={{ gridTemplateColumns: `repeat(${size}, 60px)` }}>
            {patternGrid.flat().map((emoji, index) => (
              <Tile key={`original-${index}`} value={emoji} disabled theme={theme} />
            ))}
          </div>
        </div>

        {/* User Grid */}
        <div>
          <h3>Your Attempt</h3>
          <div className="grid-wrapper" style={{ gridTemplateColumns: `repeat(${size}, 60px)` }}>
            {userGrid.flat().map((emoji, index) => (
              <Tile key={`user-${index}`} value={emoji || "⬜"} disabled theme={theme} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button
          style={{ fontSize: theme === "senior" ? "20px" : "16px" }}
          onClick={restart}
        >
          Try Again
        </button>

        {score === total && (
          <button
            onClick={nextLevel}
            style={{
              marginLeft: "10px",
              fontSize: theme === "senior" ? "20px" : "16px"
            }}
          >
            Continue to Next Level
          </button>
        )}
      </div>
    </div>
  );
}

export default ResultScreen;
