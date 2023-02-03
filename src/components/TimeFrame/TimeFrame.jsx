import React, { useContext } from "react";
import "./TimeFrame.scss";
import { time } from "../../Data";
import { WidgetContext } from "../Widget";
import TimeFrameTop from "./TimeFrameTop";
import TimeFrameBottom from "./TimeFrameBottom";

function TimeFrame() {
  const widgetContext = useContext(WidgetContext);

  return (
    <div
      className={`time-frame ${
        widgetContext.isMenuClicked && "expand-time-frame"
      }`}
    >
      <TimeFrameTop />
      <div className="bottom">
        {time.map((obj) => (
          <TimeFrameBottom key={obj.id} obj={obj} />
        ))}
      </div>
    </div>
  );
}

export default TimeFrame;
