import React, { useState, useContext } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
// import { GrFormClose } from "react-icons/gr";
import { Calendar } from "react-date-range";
import { weekday, month } from "../../Data";
import { DateContext } from "../../App";
import TimePicker from "react-time-picker";
import moment from "moment";
import { WidgetContext } from "../Widget/Widget";

function Modal() {
  const dateContext = useContext(DateContext);
  const widgetContext = useContext(WidgetContext);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [title, setTitle] = useState(
    widgetContext.eventDetails !== null
      ? widgetContext.eventDetails.appointment
      : ""
  );
  const [startTime, setStartTime] = useState(
    widgetContext.eventDetails !== null
      ? moment.utc(widgetContext.eventDetails.startDate).format("HH:mm")
      : "00:00"
  );
  const [endTime, setEndTime] = useState(
    widgetContext.eventDetails !== null
      ? moment.utc(widgetContext.eventDetails.endDate).format("HH:mm")
      : "1:00"
  );

  return createPortal(
    <>
      <div className="modal-styles" ref={widgetContext.menuRef}>
        {/* <div className="modal-header">
          <GrFormClose
            className="gr-close-icon"
            onClick={() => {
              setIsModalOpen(false);
            }}
          />
        </div> */}
        <div className="title">
          <input
            type="text"
            placeholder="Add title"
            className="title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="dt">
          <div className="date">
            <div className="set-date" onClick={() => setIsCalendarOpen(true)}>
              {weekday[dateContext.date.getDay()]}, {dateContext.date.getDate()}{" "}
              {month[dateContext.date.getMonth()]}{" "}
              {dateContext.date.getFullYear()}
            </div>
          </div>

          {isCalendarOpen && (
            <Calendar
              date={dateContext.date}
              onChange={(userSelectedDate) => {
                dateContext.setDate(userSelectedDate);
                setIsCalendarOpen(false);
              }}
              className="select-date"
              color="#AA336A"
              fixedHeight={true}
            />
          )}

          <div className="time">
            <div className="choose-time">
              Start-time:
              <TimePicker
                className="time-picker"
                onChange={setStartTime}
                value={startTime}
                disableClock
              />
            </div>
            <div className="choose-time">
              End-time:
              <TimePicker
                className="time-picker"
                onChange={setEndTime}
                value={endTime}
                disableClock
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="modal-footer-close"
            onClick={() => {
              widgetContext.setIsModalOpen(false);
              widgetContext.setEventDetails(null);
            }}
          >
            Close
          </button>
          <button
            className="modal-footer-save"
            onClick={() => {
              widgetContext.eventDetails == null
                ? widgetContext.handlePost(title, startTime, endTime)
                : widgetContext.handlePut(title, startTime, endTime);
              widgetContext.setIsModalOpen(false);
              widgetContext.setEventDetails(null);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
