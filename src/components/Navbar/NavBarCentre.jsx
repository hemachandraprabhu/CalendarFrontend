import React, { useEffect, useRef, useState, useContext } from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoMdArrowDropdown,
} from "react-icons/io";
import moment from "moment";
import { WidgetContext } from "../Widget";
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import { HandleDate } from "./HandleDate";

function NavBarCentre(props) {
  const widgetContext = useContext(WidgetContext);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  /* to close the calendar when clicking on outside the calendar */
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, []);

  const { handleToday, handleDay, handleMonth } = HandleDate(
    widgetContext,
    props
  );

  return (
    <div className="centre">
      <div className="today">
        <button onClick={handleToday} className="today-button">
          Today
        </button>
        <span className="today-hide">
          {moment().format("dddd, Do MMMM YYYY")}
        </span>
      </div>

      <div className="prev-day">
        <IoIosArrowBack
          className="day-icon"
          onClick={() => {
            props.userPicked === "Day" ? handleDay(-1) : handleMonth(-1);
          }}
        />
        <span className="day-hide">
          {props.userPicked === "Day" ? "Previous Day" : "Previous Month"}
        </span>
      </div>

      <div className="next-day">
        <IoIosArrowForward
          className="day-icon"
          onClick={() => {
            props.userPicked === "Day" ? handleDay(1) : handleMonth(1);
          }}
        />
        <span className="day-hide">
          {props.userPicked === "Day" ? "Next Day" : "Next Month"}
        </span>
      </div>

      <div
        className={`date ${widgetContext.isMenuClicked && "new-date"}`}
        onClick={() => widgetContext.isMenuClicked && setIsCalendarOpen(true)}
      >
        <span>
          {props.userPicked === "Day" &&
            moment(widgetContext.date).format("D ")}
          {moment(widgetContext.date).format("MMMM YYYY")}
        </span>
        <span
          className={`${
            widgetContext.isMenuClicked ? "show-down-icon" : "hide-down-icon"
          }`}
        >
          <IoMdArrowDropdown size={16} />
        </span>
        {widgetContext.isMenuClicked && isCalendarOpen && (
          <div className="date-cal" ref={menuRef}>
            <MiniCalendar userPicked={props.userPicked} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBarCentre;
