/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useContext } from "react";
import { WidgetContext } from "../../Widget";
import moment from "moment";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";

export function AllEvents({ date, setShowAllEvents, sortedAppointments }) {
  const widgetContext = useContext(WidgetContext);
  const navigate = useNavigate();

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowAllEvents(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <div className="full-events-overlay-styles" />
      <div
        className="full-events"
        ref={menuRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="close">
          <GrClose
            className="close-icon"
            onClick={() => {
              setShowAllEvents(false);
            }}
          />
        </div>

        <div className="full-events-date">
          <div className="full-events-text-day">
            {moment(date).format("ddd")}
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()
              widgetContext.setDate(date);
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
                e.stopPropagation()
                widgetContext.setEventDetails(item);
                widgetContext.setIsDetailsModalOpen(true);
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
  );
}
