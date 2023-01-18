import React from "react";
import { timeSelector } from "../../Data";
import { IoChevronDownSharp } from "react-icons/io5";

function Time(props) {
  return (
      <div className="start-time">
        <div className="text-time">{props.time}</div>
        <div className="time-input" tabIndex={0}>
          <input
            type="text"
            value={props.eventTime}
            onChange={(e) =>
              props.setEvent((prev) => {
                return props.time === "Start-time"
                  ? { ...prev, startTime: e.target.value }
                  : { ...prev, endTime: e.target.value };
              })
            }
          />
          <IoChevronDownSharp
            className="down-icon"
            onClick={() => {
              console.log(props.time);
              props.setIsTimeSelectorOpen((prev) => {
                return props.time === "Start-time"
                  ? { ...prev, startTimeSelector: true }
                  : { ...prev, endTimeSelector: true };
              });
            }}
          />
        </div>
        {props.timeSelector && (
          <div className="time-selector-dropdown" ref={props.modalRef}>
            {timeSelector.map((item, index) => (
              <div
                className="dropdown-value"
                onClick={() => {
                  props.setEvent((prev) => {
                    return props.time === "Start-time"
                      ? { ...prev, startTime: item }
                      : { ...prev, endTime: item };
                  });
                  props.setIsTimeSelectorOpen((prev) => {
                    return props.time === "Start-time"
                      ? { ...prev, startTimeSelector: false }
                      : { ...prev, endTimeSelector: false };
                  });
                }}
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
  );
}

export default Time;
