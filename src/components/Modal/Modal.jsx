/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useRef, useEffect } from "react";
import "./Modal.scss";
import { AppContext } from "../../App";
import moment from "moment";
import ModalHeader from "./ModalHeader";
import { IoCalendarClearOutline } from "react-icons/io5";
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import Time from "./Time";

function Modal(props) {
  const appContext = useContext(AppContext);

  /* for displaying the title, date, time */
  const [event, setEvent] = useState({
    title:
      appContext.eventDetails !== null
        ? appContext.eventDetails.appointment
        : "",

    startTime:
      appContext.eventDetails !== null
        ? moment(appContext.eventDetails.startDate).format("h:mm a")
        : moment().add(1, "hours").format("h:00 a"),

    endTime:
      appContext.eventDetails !== null
        ? moment(appContext.eventDetails.endDate).format("h:mm a")
        : moment().add(2, "hours").format("h:00 a"),
  });

  /* to toggle the mini-calendar used for date picking */
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  /* to toggle the time-selector drop-down */
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState({
    startTimeSelector: false,
    endTimeSelector: false,
  });

  const validate = () => {
    /* when all have value returns true */
    return (
      event.title.replace(/\s/g, "").length &&
      event.startTime.length &&
      event.endTime.length
    );
  };

  /* to close the mini-calendar & time-selector-drop-down when clicked outside of it */
  let modalRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
        setIsTimeSelectorOpen({
          startTimeSelector: false,
          endTimeSelector: false,
        });
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  /* to close the modal when clicked outside of it */
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

  /* to call post or put method */
  const handleSubmit = () => {
    /* if evenDetails is empty call post method  */
    if (!appContext.eventDetails) {
      if (props.userPicked === "Day") {
        props.handlePost(
          appContext.date,
          event.title,
          event.startTime,
          event.endTime,
          props.getByDate
        );
      } else {
        props.handlePost(
          appContext.date,
          event.title,
          event.startTime,
          event.endTime,
          props.getByMonth
        );
      }
    }
    /* if evenDetails is not empty call put method  */
    if (appContext.eventDetails) {
      if (props.userPicked === "Day") {
        console.log(appContext.eventDetails.id);
        props.handlePut(
          appContext.eventDetails.id,
          appContext.date,
          event.title,
          event.startTime,
          event.endTime,
          props.getByDate
        );
      } else {
        props.handlePut(
          appContext.eventDetails.id,
          appContext.date,
          event.title,
          event.startTime,
          event.endTime,
          props.getByMonth
        );
      }
    }
    appContext.setEventDetails(null);
    appContext.setIsModalOpen(false);
  };

  return (
    <>
      <div className="modal-overlay-styles" />
      <div className="modal-styles" ref={menuRef}>
        <ModalHeader />

        <div className="modal-body">
          <div className="title" tabIndex={0}>
            <input
              type="text"
              placeholder="Title"
              className="title-input"
              value={event.title}
              onChange={(e) =>
                setEvent((prev) => {
                  return { ...prev, title: e.target.value };
                })
              }
            />
          </div>

          <div className="date-time">
            <div className="date">
              <div className="text-date">Date</div>
              <div className="choose-date" tabIndex={0}>
                <div className="selected-date">
                  {moment(appContext.date).format("dddd, D MMM YYYY")}
                </div>
                <IoCalendarClearOutline
                  className="io-cal"
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                />
                {isCalendarOpen && (
                  <div ref={modalRef} className="date-cal">
                    <MiniCalendar setIsCalendarOpen={setIsCalendarOpen} />
                  </div>
                )}
              </div>
            </div>

            <div className="time">
              <Time
                eventTime={event.startTime}
                setEvent={setEvent}
                setIsTimeSelectorOpen={setIsTimeSelectorOpen}
                timeSelector={isTimeSelectorOpen.startTimeSelector}
                modalRef={modalRef}
                time="Start-time"
              />
              <Time
                eventTime={event.endTime}
                setEvent={setEvent}
                setIsTimeSelectorOpen={setIsTimeSelectorOpen}
                timeSelector={isTimeSelectorOpen.endTimeSelector}
                modalRef={modalRef}
                time="End-time"
              />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <div className="footer-btns">
            <button
              className="cancel"
              onClick={() => {
                appContext.setIsModalOpen(false);
                appContext.setEventDetails(null);
              }}
            >
              Cancel
            </button>
            <button
              className={!validate() ? "" : "create"}
              onClick={handleSubmit}
              disabled={!validate()}
            >
              {appContext.eventDetails === null ? "Create" : "Update"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
