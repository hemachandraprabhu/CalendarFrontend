import React from "react";
import moment from "moment";

export function UpComingEvent(props) {
  return (
    <div className="event">
      <div className="name">
        <div className="event-color" />
        <div className="event-detail">{props.item.appointment}</div>
      </div>

      <div className="time">
        {props.userPicked === "Day"
          ? moment(props.item.startDate).format("h:mma")
          : moment(props.item.startDate).format("Do ddd, h:mma")}
      </div>
    </div>
  );
}
