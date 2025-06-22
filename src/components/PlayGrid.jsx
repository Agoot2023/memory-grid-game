import React, { useState } from "react";
import Tile from "./Tile";
import EmojiPicker from "./EmojiPicker";

function PlayGrid({
  level,
  patternGrid,
  userGrid,
  setUserGrid,
  setScore,
  goToResult,
  lives,
  setLives,
  theme,
  goBack,
  nextLevel,
  triggerGameOver,
  emojiSet,
  totalScore,
  setTotalScore
}) {
  const totalTiles = level;
  const size = Math.ceil(Math.sqrt(totalTiles));
  const emojis = emojiSet || [];

  const [grid, setGrid] = useState(
    Array.from({ length: size }, () => Array.from({ length: size }, () => ""))
  );
  const [selectedCell, setSelectedCell] = useState(null);
  const [lastScore, setLastScore] = useState(null);

  const handleTileClick = (rowIdx, colIdx) => {
    setSelectedCell({ row: rowIdx, col: colIdx });
  };

  const handleEmojiSelect = (emoji) => {
    if (selectedCell) {
      const { row, col } = selectedCell;
      const updatedGrid = grid.map((r, rIdx) =>
        r.map((cell, cIdx) => (rIdx === row && cIdx === col ? emoji : cell))
      );
      setGrid(updatedGrid);
      setSelectedCell(null);
    }
  };

  const handleSubmit = () => {
    let correct = 0;
    let total = 0;

    for (let r = 0; r < patternGrid.length; r++) {
      for (let c = 0; c < patternGrid[r].length; c++) {
        if (patternGrid[r][c] !== undefined) {
          total++;
          if (grid[r][c] === patternGrid[r][c]) {
            correct++;
          }
        }
      }
    }

    setUserGrid(grid);
    setScore(correct);
    setLastScore(correct);

    const threshold = total * 0.5;

    if (correct === total) {
      alert("Perfect! You matched the entire pattern!");
      setTotalScore(prev => prev + level);
    } else if (correct < threshold) {
      if (lives > 1) {
        alert(`Only ${correct} correct. You lost a life! (${lives - 1} left)`);
        setLives(prev => prev - 1);
        setTotalScore(prev => Math.max(prev - 1, 0));
        setGrid(Array.from({ length: size }, () => Array.from({ length: size }, () => "")));
      } else {
        alert("Game over! No lives left.");
        triggerGameOver();
      }
    } else {
      goToResult();
    }
  };

  return (
    <div className="screen-container">
      <h2>Recreate the Pattern</h2>
      <p>Click a tile to select an emoji</p>
      <p>Lives remaining: {lives}</p>

      {selectedCell && <EmojiPicker options={emojis} onSelect={handleEmojiSelect} />}

      <div
        className="grid-wrapper"
        style={{ gridTemplateColumns: `repeat(${size}, 60px)` }}
      >
        {grid.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <Tile
              key={`${rowIdx}-${colIdx}`}
              value={cell || "⬜"}
              onClick={() => handleTileClick(rowIdx, colIdx)}
              theme={theme}
            />
          ))
        )}
      </div>

      <button onClick={handleSubmit}>Submit</button>
      <button onClick={goBack}>Exit to Menu</button>

      {lastScore !== null && (
        <div style={{ marginTop: "20px" }}>
          <p>Your score for this level: {lastScore}</p>
          <p>Total score so far: {totalScore}</p>
        </div>
      )}

      {lastScore === totalTiles && (
        <button onClick={nextLevel}>Continue to Next Level</button>
      )}
    </div>
  );
}

export default PlayGrid;
