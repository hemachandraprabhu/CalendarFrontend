import React from "react";

export function DayName(props) {
  return (
    <div className="mini-cal-day-cell">
      <div
        className="mini-cal-day-cell__inner-wrap"
        style={{
          color: "#696969",
          width: props.dateWidth,
        }}
      >
        <div
          style={{
            fontSize: "10px",
          }}
        >
          {props.dayName.slice(0, 3)}
        </div>
      </div>
    </div>
  );
}
