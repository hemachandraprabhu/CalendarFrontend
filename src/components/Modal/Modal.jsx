/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useRef, useEffect } from "react";
import "./Modal.scss";
import { WidgetContext } from "../Widget";
import moment from "moment";
import ModalHeader from "./ModalHeader";
import { ModalBody } from "./ModalBody";
import { ModalFooter } from "./ModalFooter";
import { HandleModal } from "./HandleModal";

function Modal(props) {
  const widgetContext = useContext(WidgetContext);

  /* for displaying the title, date, time */
  const [event, setEvent] = useState({
    title:
      widgetContext.eventDetails !== null
        ? widgetContext.eventDetails.appointment
        : "",

    eventDate:
      widgetContext.eventDetails !== null
        ? new Date(widgetContext.eventDetails.startDate)
        : widgetContext.date,

    startTime:
      widgetContext.eventDetails !== null
        ? moment(widgetContext.eventDetails.startDate).format("h:mm a")
        : moment().add(1, "hours").format("h:00 a"),

    endTime:
      widgetContext.eventDetails !== null
        ? moment(widgetContext.eventDetails.endDate).format("h:mm a")
        : moment().add(2, "hours").format("h:00 a"),
  });

  /* to toggle the mini-calendar used for date picking */
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  /* to toggle the time-selector drop-down */
  const [isTimeSelectorOpen, setIsTimeSelectorOpen] = useState({
    startTimeSelector: false,
    endTimeSelector: false,
  });

  /* to check the is the time entered is correct or not */
  const [isTimeValid, setIsTimeValid] = useState(true);

  const validate = () => {
    /* when all have value returns true */
    return (
      event.title.replace(/\s/g, "").length &&
      event.startTime.length &&
      event.endTime.length &&
      isTimeValid
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

  /* to call post or put method */
  const { handleClick, cancelClick, handleSubmit } = HandleModal(
    widgetContext,
    props,
    event,
    isCalendarOpen
  );

  return (
    <>
      <div className="modal-overlay-styles" onClick={handleClick} />
      <div className="modal-styles">
        <ModalHeader
          event={event}
          setIsDiscardOpen={props.setIsDiscardOpen}
          cancelClick={cancelClick}
        />

        <ModalBody
          userPicked={props.userPicked}
          event={event}
          setEvent={setEvent}
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          isTimeSelectorOpen={isTimeSelectorOpen}
          setIsTimeSelectorOpen={setIsTimeSelectorOpen}
          setIsTimeValid={setIsTimeValid}
          modalRef={modalRef}
        />

        <ModalFooter
          setIsDiscardOpen={props.setIsDiscardOpen}
          widgetContext={widgetContext}
          event = {event}
          validate={validate}
          handleSubmit={handleSubmit}
          cancelClick={cancelClick}
        />
      </div>
    </>
  );
}

export default Modal;
