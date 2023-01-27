import React from "react";

export function DayName(props) {
  return (
    <div className="day-cell">
      <div
        className="day-cell__inner-wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            fontSize: "16px",
          }}
        >
          {props.dayName}
        </div>
      </div>
    </div>
  );
}
