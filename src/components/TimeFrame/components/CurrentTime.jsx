import React from "react";
import moment from "moment";
/**
 * @param  {} props
 * props contains the current time information 
 */
function CurrentTime(props) {
  if (
    moment(props.date).format("MMM Do YYYY") ===
      moment().format("MMM Do YYYY") &&
    moment(props.currTime).format("HH") === props.hour
  ) {
    return (
      <div className="curr-time">
        <span
          className="curr-time-circle"
          style={{
            marginTop: Math.floor(
              moment(props.currTime).format().split(":")[1] - 5
            ),
          }}
        ></span>
        <span
          className="curr-time-line"
          style={{
            marginTop: Math.floor(
              moment(props.currTime).format().split(":")[1]
            ),
          }}
        ></span>
        <span className="display-time">
          Current Time is: ({moment(props.currTime).format("h:mm a")})
        </span>
      </div>
    );
  }
}

export default CurrentTime;
