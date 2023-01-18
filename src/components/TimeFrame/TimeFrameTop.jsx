import React, {useContext} from "react";
import moment from "moment";
import { AppContext } from "../../App";

function TimeFrameTop() {
  const appContext = useContext(AppContext);

  return (
    <div
      className={`top ${
        moment(appContext.date).format("MMM Do YYYY") ===
          moment().format("MMM Do YYYY") && "add-color"
      }`}
    >
      <div className="day">
        {moment(appContext.date).format("ddd").toUpperCase()}
      </div>
      <div className="date">{appContext.date.getDate()}</div>
    </div>
  );
}
export default TimeFrameTop;