import React, { useState, useContext, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import "./Modal.scss";
import { IoCalendarClearOutline } from "react-icons/io5";
import { Calendar } from "react-date-range";
import { AppContext } from "../../App";
import TimePicker from "react-time-picker";
import moment from "moment";
import create from "../../assets/create.png";
import { GrUpdate } from "react-icons/gr";

function Modal() {
  const appContext = useContext(AppContext);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [title, setTitle] = useState(
    appContext.eventDetails !== null ? appContext.eventDetails.appointment : ""
  );

  const [startTime, setStartTime] = useState(
    appContext.eventDetails !== null
      ? moment(appContext.eventDetails.startDate).format("HH:mm")
      : moment().format("HH:mm")
  );

  var c = moment().add(1, "hours");
  const [endTime, setEndTime] = useState(
    appContext.eventDetails !== null
      ? moment(appContext.eventDetails.endDate).format("HH:mm")
      : moment(c).format("HH:mm")
  );

  let modalRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        appContext.setEventDetails(null);
        appContext.setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  return createPortal(
    <>
      <div className="overlay-styles" />
      <div className="modal-styles" ref={menuRef}>
        <div className="modal-header">
          <div className="left">
            <b>
              {appContext.eventDetails === null
                ? "Create an event"
                : "Update an event"}
            </b>
          </div>
          {appContext.eventDetails != null ? (
            <GrUpdate />
          ) : (
            <img src={create} alt="create.png" />
          )}
        </div>

        <div className="modal-body">
          <div className="title" tabIndex={0}>
            <input
              type="text"
              placeholder="Title"
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="date-time">
            <div className="text-date">Date</div>
            <div className="choose-date" tabIndex={0}>
              <div className="selected-date">
                {moment(appContext.date).format("dddd, D MMM YYYY")}
              </div>
              <IoCalendarClearOutline
                className="io-cal"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              />
              {isCalendarOpen === true && (
                <div ref={modalRef} className="date-cal">
                  <Calendar
                    date={appContext.date}
                    onChange={(userSelectedDate) => {
                      appContext.setDate(userSelectedDate);
                      setIsCalendarOpen(false);
                    }}
                    className="cal"
                    color="#AA336A"
                    fixedHeight={true}
                  />
                </div>
              )}
            </div>

            <div className="choose-time">
              <div className="start-time" tabIndex={0}>
                <TimePicker
                  className="time-picker"
                  onChange={setStartTime}
                  value={startTime}
                  disableClock
                  dropdown
                />
              </div>
              <div className="end-time" tabIndex={0}>
                <TimePicker
                  className="time-picker"
                  onChange={setEndTime}
                  value={endTime}
                  disableClock
                  dropdown
                />
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="footer-btns">
            <button
              type="submit"
              className="cancel"
              onClick={() => {
                appContext.setIsModalOpen(false);
                appContext.setEventDetails(null);
              }}
            >
              Cancel
            </button>
            <button
              className="create"
              onClick={() => {
                appContext.eventDetails == null
                  ? appContext.handlePost(title, startTime, endTime)
                  : appContext.handlePut(title, startTime, endTime);
                appContext.setIsModalOpen(false);
                appContext.setEventDetails(null);
              }}
            >
              {appContext.eventDetails === null ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}

export default Modal;
