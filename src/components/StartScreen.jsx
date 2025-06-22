import React from 'react';

function StartScreen({ setLevel, setCategory, setTheme, startGame, isDark, setIsDark, setTotalScore }) {
  const hasSaved = localStorage.getItem("level") && localStorage.getItem("theme") && localStorage.getItem("score");

  const handleResume = () => {
    const savedLevel = parseInt(localStorage.getItem("level"));
    const savedTheme = localStorage.getItem("theme");
    const savedScore = parseInt(localStorage.getItem("score"));
    if (!isNaN(savedLevel)) setLevel(savedLevel);
    if (savedTheme) setTheme(savedTheme);
    if (!isNaN(savedScore)) setTotalScore(savedScore);
    startGame();
  };

  return (
    <div className="screen-container">
      <h1>Memory Grid Game</h1>

      <div style={{ margin: "10px 0" }}>
        <label>Choose Level:</label>
        <select onChange={(e) => setLevel(Number(e.target.value))} style={{ marginLeft: "10px" }}>
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              Level {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Choose Category:</label>
        <select onChange={(e) => setCategory(e.target.value)} style={{ marginLeft: "10px" }}>
          <option value="animals">Animals</option>
          <option value="flowers">Flowers</option>
          <option value="objects">Objects</option>
          <option value="random">Random</option>
        </select>
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Choose Theme:</label>
        <select onChange={(e) => setTheme(e.target.value)} style={{ marginLeft: "10px" }}>
          <option value="kid">Kid Mode</option>
          <option value="senior">Senior Mode</option>
        </select>
      </div>

      <div style={{ margin: "10px 0" }}>
        <label>Dark Mode:</label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setIsDark(!isDark)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      <button onClick={startGame}>Start Game</button>

      {hasSaved && (
        <>
          <button onClick={handleResume} style={{ marginTop: "10px" }}>
            Resume Game
          </button>
          <p style={{ fontSize: "14px", color: "#555" }}>
            Resume at Level {localStorage.getItem("level")}, Theme: {localStorage.getItem("theme")}, Score: {localStorage.getItem("score")}
          </p>
        </>
      )}
    </div>
  );
}

export default StartScreen;
