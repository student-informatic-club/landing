import React from "react";

const Rectangle = ({ h = 5, fill = "none", top, right, left }) => {
  return (
    <svg
      width={h * 3}
      height={h}
      className="texture"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        right: `${right}%`,
        transform: "rotate(-10deg)",
      }}
    >
      <rect
        width={h * 3}
        height={h}
        stroke={fill === "none" ? "#fff" : ""}
        strokeWidth="1"
        fill={fill}
      />
    </svg>
  );
};

export default Rectangle;
