import React, { useEffect, useRef, useState, useContext } from "react";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoMdArrowDropdown,
} from "react-icons/io";
import moment from "moment";
import { AppContext } from "../../App";
import MiniCalendar from "../MiniCalendar/MiniCalendar";

function NavBarCentre(props) {
  const appContext = useContext(AppContext);
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
  });

  /* to update the date */
  const handleDays = (day) => {
    let currDate = new Date(appContext.date);
    currDate.setDate(currDate.getDate() + day);
    appContext.setDate(currDate);
  };

  /* to update the month */
  const handleMonths = (month) => {
    let currDate = new Date(appContext.date);
    currDate.setDate(1);
    currDate.setMonth(currDate.getMonth() + month);
    appContext.setDate(currDate);
  };

  return (
    <div className="centre">
      <div className="today">
        <button
          onClick={() => appContext.setDate(new Date())}
          className="today-button"
        >
          Today
        </button>
        <span className="today-hide">
          {moment().format("dddd, Do MMMM YYYY")}
        </span>
      </div>

      <div className="prev-day">
        <IoIosArrowBack
          className="prev-day-icon"
          onClick={() => {
            props.userPicked === "Day" ? handleDays(-1) : handleMonths(-1);
          }}
        />
        <span className="prev-day-hide">
          {props.userPicked === "Day" ? "Previous Day" : "Previous Month"}
        </span>
      </div>

      <div className="next-day">
        <IoIosArrowForward
          className="next-day-icon"
          onClick={() => {
            props.userPicked === "Day" ? handleDays(1) : handleMonths(1);
          }}
        />
        <span className="next-day-hide">
          {props.userPicked === "Day" ? "Next Day" : "Next Month"}
        </span>
      </div>

      <div
        className={`date ${appContext.isMenuClicked && "new-date"}`}
        onClick={() => appContext.isMenuClicked && setIsCalendarOpen(true)}
      >
        {props.userPicked === "Day" && moment(appContext.date).format("D ")}
        {moment(appContext.date).format("MMMM YYYY")}
        {appContext.isMenuClicked && <IoMdArrowDropdown size={15} />}
        {isCalendarOpen && (
          <div className="date-cal" ref={menuRef}>
            <MiniCalendar />
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBarCentre;
