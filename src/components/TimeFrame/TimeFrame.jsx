import React, { useContext, useEffect, useState } from "react";
import "./TimeFrame.scss";
import { time } from "../../Data";
import moment from "moment";
import { AppContext } from "../../App";
import CurrentTime from "./components/CurrentTime";
import { Content } from "./components/Content";

function TimeFrame() {
  const appContext = useContext(AppContext);

  /* state to indicate the current time */
  const [currTime, setCurrTime] = useState(moment().format());

  /* sorting the events based on time*/
  var results = appContext.events.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(moment().format());
      console.log("came");
    }, 60000);
    /* This represents the unmount function, in which you need to clear your interval to prevent memory leaks. */
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`time-frame ${
        appContext.isMenuClicked && "expand-time-frame"
      }`}
    >
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

      <div className="bottom">
        {time.map((t) => (
          <div className="outer" key={t.id}>
            <div className="time-frame-left">
              <span>{t.time}</span>
            </div>

            <div className="time-frame-right">
              {results.map(
                (item) =>
                  moment(item.startDate).format("HH") === t.key && (
                    <Content
                      key={item.id}
                      appContext={appContext}
                      item={item}
                    ></Content>
                  )
              )}

              <CurrentTime
                hour={t.key}
                date={appContext.date}
                currTime={currTime}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeFrame;
