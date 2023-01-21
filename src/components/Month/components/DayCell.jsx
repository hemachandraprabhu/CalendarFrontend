import React, { useContext, useState, useRef, useEffect } from "react";
import { AppContext } from "../../../App";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { GrClose } from "react-icons/gr";

export function DayCell({ date, events }) {
  const appContext = useContext(AppContext);
  const navigate = useNavigate();

  const singleDayAppointment = (item) => {
    if (
      moment(item.startDate).format("YYYY MMMM D") ===
      moment(date).format("YYYY MMMM D")
    ) {
      return true;
    }
    return false;
  };
  let appointments = events.filter(singleDayAppointment);

  let sortedAppointments = appointments.sort(
    (a, b) => moment(a.startDate) - moment(b.startDate)
  );

  const [showAllEvents, setShowAllEvents] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowAllEvents(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  function myClickHandler(e) {
    if (!e) e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  }

  return (
    <div
      className="day-cell"
      onClick={() => {
        appContext.setIsModalOpen(true);
        appContext.setDate(date);
      }}
    >
      <div className="day-cell__inner-wrap">
        <div className="day-cell-date">
          <span
            onClick={(e) => {
              myClickHandler(e);
              appContext.setDate(date);
              navigate("/");
            }}
            className={`normal-date ${
              moment(date).format("YYYY MMMM D") ===
                moment().format("YYYY MMMM D") && "add-color"
            } ${
              moment(date).format("YYYY MMMM") !==
                moment(appContext.date).format("YYYY MMMM") && "grey-color"
            }`}
          >
            {date.getDate()}
          </span>
        </div>

        {appointments.map(
          (item, index) =>
            index < 2 && (
              <div
                className="day-cell__events"
                key={index}
                onClick={(e) => {
                  myClickHandler(e);
                  appContext.setEventDetails(item);
                  appContext.setIsDetailsModalOpen(true);
                }}
              >
                <div className="single-event">
                  <span className="event-time">
                    {moment(item.startDate).format("h:mma")}{" "}
                  </span>
                  <span className="event-name">{item.appointment}</span>
                </div>
              </div>
            )
        )}
        {sortedAppointments.length > 2 && (
          <div
            className="day-cell__events more"
            onClick={(e) => {
              myClickHandler(e);
              setShowAllEvents(true);
            }}
          >
            <div>{sortedAppointments.length - 2} more</div>
          </div>
        )}

        {showAllEvents && (
          <>
            <div className="full-events-overlay-styles" />
            <div
              className="full-events"
              ref={menuRef}
              onClick={(e) => myClickHandler(e)}
            >
              <div
                onClick={() => {
                  setShowAllEvents(false);
                }}
                className="close"
              >
                <GrClose className="close-icon" />
              </div>

              <div className="full-events-date">
                <div className="full-events-text-day">
                  {moment(date).format("ddd")}
                </div>
                <div
                  onClick={(e) => {
                    myClickHandler(e);
                    appContext.setDate(date);
                    navigate("/");
                  }}
                  className="full-events-text-date"
                >
                  {date.getDate()}
                </div>
              </div>

              <div className="full-events-scroll">
                {sortedAppointments.map((item, index) => (
                  <div
                    className="full-events-event"
                    onClick={(e) => {
                      myClickHandler(e);
                      appContext.setEventDetails(item);
                      appContext.setIsDetailsModalOpen(true);
                      setShowAllEvents(false);
                    }}
                    key={index}
                  >
                    <div className="single-event-color" />
                    <span className="single-event-time">
                      {moment(item.startDate).format("h:mma")}
                    </span>
                    <span className="single-event-appointment">
                      {item.appointment}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
