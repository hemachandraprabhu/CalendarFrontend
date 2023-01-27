import React, { useContext } from "react";
import moment from "moment";
import { WidgetContext } from "../Widget";
import { UpComingEvent } from "./UpComingEvent";

export function SideBarFooter(props) {
  const widgetContext = useContext(WidgetContext);

  var results = widgetContext.events.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  const futureEvents = (item) => {
    return moment(item.startDate).format() > moment().format();
  };
  var upComingEvent = results.filter(futureEvents);

  return (
    <div className="side-bar-footer">
      <div className="agenda">
        <div className="text-agenda">Agenda</div>
        <div className="date">
          {props.userPicked === "Day"
            ? moment(widgetContext.date).format("Do MMM YY")
            : moment(widgetContext.date).format("MMM YYYY")}
        </div>
      </div>

      <div className="total-event">Total Events: {results.length}</div>

      {results.length > 0 && (
        <div className="upcoming-event">
          Upcoming Events: {upComingEvent.length}
        </div>
      )}

      <div className="full-events">
        {upComingEvent.map((item, index) => (
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
