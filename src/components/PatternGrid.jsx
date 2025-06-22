import React, { useEffect, useState } from "react";
import Tile from "./Tile";

const emojiPools = {
  animals: ["🐶", "🐱", "🐸", "🦁", "🐵", "🐰", "🐯", "🐷", "🐼", "🐮"],
  flowers: ["🌸", "🌼", "🌻", "🌷", "💐", "🌺", "🪷", "🌹", "🌾", "🌿"],
  objects: ["📱", "🚗", "💡", "🕰️", "🖥️", "📚", "📷", "🛏️", "🎧", "🎒"],
};

function PatternGrid({ level, category, setPatternGrid, setEmojiSet, next, goBack, theme }) {
  const [grid, setGrid] = useState([]);
  const [timeLeft, setTimeLeft] = useState(5);

  const size = Math.ceil(Math.sqrt(level));
  const totalTiles = level;

  // ✅ Generate Grid Once
  useEffect(() => {
    const items =
      category === "random"
        ? [...emojiPools.animals, ...emojiPools.flowers, ...emojiPools.objects]
        : emojiPools[category] || emojiPools.animals;

    const selected = items.slice(0, level);
    setEmojiSet(selected);

    const flatGrid = Array.from({ length: totalTiles }, () =>
      selected[Math.floor(Math.random() * selected.length)]
    );

    const structuredGrid = [];
    for (let i = 0; i < size; i++) {
      structuredGrid.push(flatGrid.slice(i * size, i * size + size));
    }

    setGrid(structuredGrid);
    setPatternGrid(structuredGrid);
  }, [category, level, size, totalTiles, setEmojiSet, setPatternGrid]);

  // ✅ Start Timer and move to next phase after 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);

    const timeout = setTimeout(() => {
      next();
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [next]);

  return (
    <div className="screen-container">
      <h2>Memorize the Pattern</h2>

      <div
        style={{
          height: "10px",
          width: "80%",
          background: "#ddd",
          margin: "10px auto",
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(timeLeft / 5) * 100}%`,
            background: theme === "senior" ? "#444" : "#76c7c0",
            transition: "width 1s linear",
            borderRadius: "5px",
          }}
        />
      </div>

      <div
        className="grid-wrapper"
        style={{
          display: "grid",
          gap: "10px",
          justifyContent: "center",
          gridTemplateColumns: `repeat(${size}, 60px)`,
        }}
      >
        {grid.map((row, rowIdx) =>
          row.map((emoji, colIdx) => (
            <Tile
              key={`${rowIdx}-${colIdx}`}
              value={emoji}
              disabled
              theme={theme}
            />
          ))
        )}
      </div>

      <button onClick={goBack} style={{ marginTop: "20px" }}>
        Exit to Menu
      </button>
    </div>
  );
}

export default PatternGrid;
