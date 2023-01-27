import React, { useEffect, useState } from "react";
import moment from "moment";

function CurrentTime(props) {
  /* state to indicate the current time */
  const [currTime, setCurrTime] = useState(moment().format());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(moment().format());
    }, 60000);
    /* This represents the unmount function, in which you need to clear your interval to prevent memory leaks. */
    return () => clearInterval(interval);
  }, []);

  return (
    moment(props.date).format("MMM Do YYYY") ===
      moment().format("MMM Do YYYY") &&
    moment(currTime).format("HH") === props.hour && (
      <div className="curr-time">
        <span
          className="curr-time-circle"
          style={{
            marginTop: Math.floor(moment(currTime).format().split(":")[1] - 5),
          }}
        ></span>
        <span
          className="curr-time-line"
          style={{
            marginTop: Math.floor(moment(currTime).format().split(":")[1]),
          }}
        ></span>
        <span className="display-time">
          Current Time is: ({moment(currTime).format("h:mm a")})
        </span>
      </div>
    )
  );
}

export default CurrentTime;
