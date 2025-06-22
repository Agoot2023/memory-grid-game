import "./styles/main.css";
import React, { useState, useEffect } from "react";
import StartScreen from "./components/StartScreen";
import PlayGrid from "./components/PlayGrid";
import PatternGrid from "./components/PatternGrid";
import ResultScreen from "./components/ResultScreen";

function App() {
  const [phase, setPhase] = useState("start");
  const [level, setLevel] = useState(1);
  const [category, setCategory] = useState("animals");
  const [theme, setTheme] = useState("kid");
  const [patternGrid, setPatternGrid] = useState([]);
  const [userGrid, setUserGrid] = useState([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isDark, setIsDark] = useState(false);
  const [emojiSet, setEmojiSet] = useState([]);
  const [totalScore, setTotalScore] = useState(() => {
    const saved = localStorage.getItem("score");
    return saved ? parseInt(saved) : 0;
  });
  const [patternKey, setPatternKey] = useState(0); // force refresh key

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLevel = parseInt(localStorage.getItem("level"));
    if (savedTheme) setTheme(savedTheme);
    if (!isNaN(savedLevel)) setLevel(savedLevel);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("level", level.toString());
  }, [theme, level]);

  useEffect(() => {
    localStorage.setItem("score", totalScore);
  }, [totalScore]);

  const startGame = () => {
    setPatternKey((prev) => prev + 1); // force pattern refresh
    setPhase("memorize");
  };

  const goBackToMenu = () => {
    setUserGrid([]);
    setPatternGrid([]);
    setScore(0);
    setLives(3);
    setPhase("start");
    localStorage.removeItem("level");
    localStorage.removeItem("theme");
    localStorage.removeItem("score");
  };

  const nextLevel = () => {
    if (level >= 10) {
      alert("You've completed all levels! Restarting at Level 1 🎉");
      setLevel(1);
    } else {
      setLevel((prev) => prev + 1);
    }
    setUserGrid([]);
    setPatternGrid([]);
    setScore(0);
    setPatternKey((prev) => prev + 1); // force refresh
    setPhase("memorize");
  };

  const triggerGameOver = () => {
    setPhase("gameover");
  };

  return (
    <div className={`App ${theme}-theme ${isDark ? "dark-theme" : ""}`}>
      {phase === "start" && (
        <StartScreen
          setLevel={setLevel}
          setCategory={setCategory}
          setTheme={setTheme}
          startGame={startGame}
          isDark={isDark}
          setIsDark={setIsDark}
          setTotalScore={setTotalScore} // ✅ enable resume score
        />
      )}

      {phase === "memorize" && (
        <PatternGrid
          key={patternKey}
          level={level}
          category={category}
          setPatternGrid={setPatternGrid}
          setEmojiSet={setEmojiSet}
          next={() => setPhase("play")}
          theme={theme}
          goBack={goBackToMenu}
        />
      )}

      {phase === "play" && (
        <PlayGrid
          level={level}
          category={category}
          patternGrid={patternGrid}
          userGrid={userGrid}
          setUserGrid={setUserGrid}
          setScore={setScore}
          goToResult={() => setPhase("result")}
          lives={lives}
          setLives={setLives}
          theme={theme}
          goBack={goBackToMenu}
          nextLevel={nextLevel}
          triggerGameOver={triggerGameOver}
          emojiSet={emojiSet}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
        />
      )}

      {phase === "result" && (
        <ResultScreen
          patternGrid={patternGrid}
          userGrid={userGrid}
          score={score}
          restart={goBackToMenu}
          theme={theme}
          nextLevel={nextLevel} // ✅ now included
        />
      )}

      {phase === "gameover" && (
        <div className="screen-container">
          <h2>Game Over</h2>
          <p>You've run out of lives.</p>
          <button onClick={goBackToMenu}>Restart Game</button>
        </div>
      )}
    </div>
  );
}

export default App;
