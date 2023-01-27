import React, { useContext } from "react";
import moment from "moment";
import CurrentTime from "./CurrentTime";
import Content from "./Content";
import { WidgetContext } from "../Widget";

function TimeFrameBottom(props) {
  const widgetContext = useContext(WidgetContext);

  /* sorting the events based on time*/
  var results = widgetContext.events.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );

  return (
    <div className="outer">
      <div className="time-frame-left">
        <span>{props.obj.hour}</span>
      </div>

      <div className="time-frame-right">
        <CurrentTime hour={props.obj.key} date={widgetContext.date} />

        {results.map(
          (item) =>
            moment(item.startDate).format("HH") === props.obj.key && (
              <Content key={item.id} item={item} />
            )
        )}
      </div>
    </div>
  );
}

export default TimeFrameBottom;
