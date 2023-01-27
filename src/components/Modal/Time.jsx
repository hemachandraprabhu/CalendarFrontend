import React, { useState } from "react";
import { timeSelector } from "../../Data";
import { IoChevronDownSharp } from "react-icons/io5";
import moment from "moment";
import { TimeSelector } from "./TimeSelector";

function Time(props) {
  const [checkTime, setCheckTime] = useState(true);

  const validateHourMinute = (inputField) => {
    var isValid = moment(inputField, "h:mm a", true).isValid();
    setCheckTime(isValid);
    props.setIsTimeValid(isValid);
  };

  return (
    <div className="start-time">
      <div className="text-time">{props.time}</div>

      <div
        className="time-input"
        tabIndex={0}
        style={{ background: checkTime ? "" : "#fba" }}
      >
        <input
          type="text"
          value={props.eventTime}
          onChange={(e) => {
            validateHourMinute(e.target.value);
            props.setEvent((prev) => {
              return props.time === "Start time"
                ? { ...prev, startTime: e.target.value }
                : { ...prev, endTime: e.target.value };
            });
          }}
          placeholder="hh:mm a/am"
          style={{ background: checkTime ? "" : "#fba" }}
        />
        
        <IoChevronDownSharp
          className="down-icon"
          onClick={() => {
            console.log(props.time);
            props.setIsTimeSelectorOpen((prev) => {
              return props.time === "Start time"
                ? { ...prev, startTimeSelector: true }
                : { ...prev, endTimeSelector: true };
            });
          }}
        />
      </div>

      {props.timeSelector && (
        <div className="time-selector-dropdown" ref={props.modalRef}>
          {timeSelector.map((item, index) => (
            <TimeSelector
              key={index}
              setEvent={props.setEvent}
              time={props.time}
              setIsTimeSelectorOpen={props.setIsTimeSelectorOpen}
              validateHourMinute={validateHourMinute}
              item={item}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Time;
