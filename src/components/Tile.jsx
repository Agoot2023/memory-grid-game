import React from "react";

function Tile({ value, onClick, disabled, theme }) {
  const isSenior = theme === "senior";

  const styles = {
    width: "60px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: isSenior ? "36px" : "28px",
    border: isSenior ? "2px solid #000" : "1px solid #ccc",
    borderRadius: "8px",
    backgroundColor: disabled
      ? isSenior ? "#e0e0e0" : "#f4f4f4"
      : "#ffffff",
    cursor: disabled ? "default" : "pointer",
    boxShadow: isSenior ? "none" : "0 2px 4px rgba(0,0,0,0.1)",
    userSelect: "none"
  };

  return (
    <div onClick={!disabled ? onClick : null} style={styles}>
      {value}
    </div>
  );
}

export default Tile;
