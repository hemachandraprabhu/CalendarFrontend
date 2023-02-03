import React, { useContext } from "react";
import moment from "moment";
import { WidgetContext } from "../Widget";

function TimeFrameTop() {
  const widgetContext = useContext(WidgetContext);

  return (
    <div
      className={`top ${
        moment(widgetContext.date).format("MMM Do YYYY") ===
          moment().format("MMM Do YYYY") && "add-color"
      }`}
    >
      <div className="day">
        {moment(widgetContext.date).format("ddd").toUpperCase()}
      </div>
      <div className="date">{widgetContext.date.getDate()}</div>
    </div>
  );
}
export default TimeFrameTop;
