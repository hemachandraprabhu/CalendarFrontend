import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import CurrentTime from "./CurrentTime";
import Content from "./Content";
import { AppContext } from "../../App";

function TimeFrameBottom(props) {
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
    }, 60000);
    /* This represents the unmount function, in which you need to clear your interval to prevent memory leaks. */
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="outer">
      <div className="time-frame-left">
        <span>{props.t.time}</span>
      </div>

      <div className="time-frame-right">
        <CurrentTime
          hour={props.t.key}
          date={appContext.date}
          currTime={currTime}
        />
        {results.map(
          (item) =>
            moment(item.startDate).format("HH") === props.t.key && (
              <Content key={item.id} item={item}></Content>
            )
        )}
      </div>
    </div>
  );
}

export default TimeFrameBottom;
