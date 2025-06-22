import React from "react";

function EmojiPicker({ options, onSelect }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        background: "#fff",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        justifyContent: "center",
        flexWrap: "wrap",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        marginBottom: "12px"
      }}
    >
      {options.map((emoji, index) => (
        <span
          key={index}
          style={{
            fontSize: "28px",
            cursor: "pointer"
          }}
          onClick={() => onSelect(emoji)}
        >
          {emoji}
        </span>
      ))}
    </div>
  );
}

export default EmojiPicker;
