import React from "react";

export function TimeSelector(props) {
  return (
    <div
      className="dropdown-value"
      onClick={() => {
        props.validateHourMinute(props.item);
        props.setEvent((prev) => {
          return props.time === "Start time"
            ? { ...prev, startTime: props.item }
            : { ...prev, endTime: props.item };
        });
        props.setIsTimeSelectorOpen((prev) => {
          return props.time === "Start time"
            ? { ...prev, startTimeSelector: false }
            : { ...prev, endTimeSelector: false };
        });
      }}
    >
      {props.item}
    </div>
  );
}
