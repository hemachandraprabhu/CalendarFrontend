import React, { useContext } from "react";
import moment from "moment";
import { AppContext } from "../../App";
import { UpComingEvent } from "./UpComingEvent";

export function SideBarFooter(props) {
  const appContext = useContext(AppContext);

  return (
    <div className="side-bar-footer">
      <div className="agenda">
        <div className="text-agenda">Agenda</div>
        <div className="date">
          <>
            {props.userPicked === "Day"
              ? moment(appContext.date).format("Do MMM YY")
              : moment(appContext.date).format("MMM YYYY")}
          </>
        </div>
      </div>

      <div className="total-event">Total Events: {props.results.length}</div>

      {props.results.length > 0 && (
        <div className="upcoming-event">
          Upcoming Events: {props.upComingEvent.length}
        </div>
      )}

      <div className="full-events">
        {props.upComingEvent.map((item, index) => (
          <UpComingEvent
            key={index}
            userPicked={props.userPicked}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
