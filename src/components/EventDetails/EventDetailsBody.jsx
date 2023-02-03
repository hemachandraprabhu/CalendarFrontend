import React from "react";
import moment from "moment";

export function EventDetailsBody(props) {
  return (
    <div className="event-details-body">
      <div className="event-color" />
      <div className="event-info">
        <div className="event-title">{props.eventDetails.appointment}</div>
        <div className="event-date-time">
          {moment(props.eventDetails.startDate).format("Do MMMM YYYY,")}(
          {moment(props.eventDetails.startDate).format("h:mm a ")}-
          {moment(props.eventDetails.endDate).format(" h:mm a")})
        </div>
      </div>
    </div>
  );
}
