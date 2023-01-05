import React, { useContext, useEffect, useState } from "react";
import "./TimeFrame.scss";
import { time, weekday } from "../../Data";
import moment from "moment";
import { DateContext } from "../../App";
import { BiPlusMedical } from "react-icons/bi";
import { WidgetContext } from "../Widget/Widget";

function TimeFrame() {
  const dateContext = useContext(DateContext);
  const widgetContext = useContext(WidgetContext);

  var results = widgetContext.event.reduce(function (r, a) {
    var key = moment.utc(a.startDate).format("HH");
    r[key] = r[key] || [];
    r[key].push(a);
    return r;
  }, Object.create(null));
  console.log(results);

  const [currTime, setCurrTime] = useState(moment().format());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime(moment().format());
      console.log("came");
    }, 60000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);

  return (
    <div
      className={`${
        dateContext.isMenuClicked ? "expand-time-frame" : "time-frame"
      }`}
    >
      <div className="top">
        <div className="top-day">
          {weekday[dateContext.date.getDay()].slice(0, 3).toLocaleUpperCase()}
        </div>
        <div className="top-date">{dateContext.date.getDate()}</div>
      </div>

      <div className="bottom">
        {time.map((t) => (
          <div className="outer" key={t.id}>
            <div className="time-frame-left">
              <span>{t.time}</span>
            </div>

            <div className="time-frame-right">
              {results[t.key] &&
                results[t.key].map((item) => (
                  <div
                    onClick={() => {
                      widgetContext.setEventDetails(item);
                      widgetContext.setDetailsPortal(true);
                    }}
                    className="content"
                    key={item.id}
                    style={{
                      height:
                        Math.floor(
                          new Date(item.endDate) - new Date(item.startDate)
                        ) / 59e3,
                      marginTop: Math.floor(item.startDate.split(":")[1]),
                      minHeight: "10px",
                    }}
                  >
                    <span
                      style={{
                        fontSize:
                          Math.floor(
                            new Date(item.endDate) - new Date(item.startDate)
                          ) /
                            59e3 <=
                          11
                            ? "10px"
                            : "medium",
                      }}
                    >
                      {item.appointment} (
                      {moment.utc(item.startDate).format("h:mm a")}-
                      {moment.utc(item.endDate).format("h:mm a")})
                    </span>
                  </div>
                ))}

              {moment(currTime).format("HH") === t.key && (
                <div className="curr-time">
                  <span
                    className="curr-time-circle"
                    style={{
                      marginTop: Math.floor(
                        moment(currTime).format().split(":")[1] - 5
                      ),
                    }}
                  ></span>
                  <span
                    className="curr-time-line"
                    style={{
                      marginTop: Math.floor(
                        moment(currTime).format().split(":")[1]
                      ),
                    }}
                  ></span>
                  <span className="display-time">
                    Current Time is: ({moment(currTime).format("h:mm a")})
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {dateContext.isMenuClicked && (
        <BiPlusMedical
          className="create-icon"
          onClick={() => widgetContext.setIsModalOpen(true)}
        />
      )}
    </div>
  );
}

export default TimeFrame;

// {console.log(
//   Math.floor(
//     new Date(item.endDate) - new Date(item.startDate)
//   ) / 60e3,
//   item.startDate.split(":")[1]
// )}

// {console.log(
//   parseInt(moment.utc(item.startDate).format("HH"))
// )}
/* {parseInt(moment.utc(item.startDate).format("HH")) < 12
                        ? (parseInt(moment.utc(item.startDate).format("HH")) ===
                          0
                            ? 12
                            : parseInt(
                                moment.utc(item.startDate).format("HH")
                              )) +
                          ":" +
                          moment.utc(item.startDate).format("mm") +
                          "am"
                        : (parseInt(moment.utc(item.startDate).format("HH")) ===
                          12
                            ? parseInt(moment.utc(item.startDate).format("HH"))
                            : parseInt(
                                moment.utc(item.startDate).format("HH")
                              ) - 12) +
                          ":" +
                          moment.utc(item.startDate).format("mm") +
                          "pm"}
                      -
                      {parseInt(moment.utc(item.endDate).format("HH")) < 12
                        ? (parseInt(moment.utc(item.endDate).format("HH")) === 0
                            ? 12
                            : parseInt(moment.utc(item.endDate).format("HH"))) +
                          ":" +
                          moment.utc(item.endDate).format("mm") +
                          "am"
                        : (parseInt(moment.utc(item.endDate).format("HH")) ===
                          12
                            ? parseInt(moment.utc(item.endDate).format("HH"))
                            : parseInt(moment.utc(item.endDate).format("HH")) -
                              12) +
                          ":" +
                          moment.utc(item.endDate).format("mm") +
                          "pm"} */
