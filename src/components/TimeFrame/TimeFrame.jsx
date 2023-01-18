import React, { useContext } from "react";
import "./TimeFrame.scss";
import { time } from "../../Data";
import { AppContext } from "../../App";
import TimeFrameTop from "./TimeFrameTop";
import TimeFrameBottom from "./TimeFrameBottom";

function TimeFrame() {
  const appContext = useContext(AppContext);

  return (
    <div
      className={`time-frame ${
        appContext.isMenuClicked && "expand-time-frame"
      }`}
    >
      <TimeFrameTop />
      <div className="bottom">
        {time.map((t) => (
          <TimeFrameBottom key={t.id} t={t} />
        ))}
      </div>
    </div>
  );
}

export default TimeFrame;
