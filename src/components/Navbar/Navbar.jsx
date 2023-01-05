import React, { useState, useContext, useEffect, useRef } from "react";
import "./Navbar.scss";
import { FiMenu } from "react-icons/fi";
import { FcCalendar } from "react-icons/fc";
import {
  IoIosArrowForward,
  IoIosArrowBack,
  IoMdArrowDropdown,
} from "react-icons/io";
import { weekday, month } from "../../Data";
import profile from "../../assets/profile.jpg";
import { Calendar } from "react-date-range";

import { DateContext } from "../../App";

function Navbar({ setIsMenuClicked }) {
  const dateContext = useContext(DateContext);

  const [userSelected, setUserSelected] = useState("Day");

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const [clicked, setClicked] = useState(false);
  const handleClick = (condition) => {
    setClicked(condition);
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsCalendarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  let currDate = new Date(dateContext.date.getTime());

  return (
    <div className="nav-bar">
      <div className="left">
        <FiMenu
          className={`${
            dateContext.isMenuClicked ? "menu-icon-clicked" : "menu-icon"
          }`}
          onClick={() => {
            setIsMenuClicked(!dateContext.isMenuClicked);
          }}
        />
        <FcCalendar className="calendar-icon" />
        <span>Calendar</span>
      </div>

      <div className="centre">
        <div className="today">
          <button
            onClick={() => dateContext.setDate(new Date())}
            className="today-button"
          >
            Today
          </button>
          <span className="today-hide">
            {weekday[new Date().getDay()]}, {new Date().getDate()}{" "}
            {month[new Date().getMonth()]} {new Date().getFullYear()}
          </span>
        </div>

        <div className="prev-day">
          <IoIosArrowBack
            className="prev-day-icon"
            onClick={() => {
              currDate.setDate(currDate.getDate() - 1);
              dateContext.setDate(currDate);
            }}
          />
          <span className="prev-day-hide">Previous Day</span>
        </div>

        <div className="next-day">
          <IoIosArrowForward
            className="next-day-icon"
            onClick={() => {
              currDate.setDate(currDate.getDate() + 1);
              dateContext.setDate(currDate);
            }}
          />
          <span className="next-day-hide">Next Day</span>
        </div>

        <div
          className={`${dateContext.isMenuClicked ? "new-date" : "date"}`}
          onClick={() =>
            dateContext.isMenuClicked
              ? setIsCalendarOpen(true)
              : setIsCalendarOpen(false)
          }
        >
          {dateContext.date.getDate()} {month[dateContext.date.getMonth()]}{" "}
          {dateContext.date.getFullYear()}
          {dateContext.isMenuClicked && <IoMdArrowDropdown size={15} />}
          {isCalendarOpen && (
            <div className="date-cal" ref={menuRef}>
              <Calendar
                date={dateContext.date}
                onChange={(userSelectedDate) => {
                  dateContext.setDate(userSelectedDate);
                }}
                color="#AA336A"
                fixedHeight={true}
                className="cal"
              />
            </div>
          )}
        </div>
      </div>

      <div className="right">
        <button
          onClick={() => {
            !clicked ? handleClick(true) : handleClick(false);
          }}
        >
          {userSelected}
          <IoMdArrowDropdown className="down-icon" />
        </button>
        {clicked && (
          <div
            onClick={() => {
              handleClick(false);
            }}
            className="user-selected"
          >
            <div onClick={() => setUserSelected("Day")}>Day</div>
            <div onClick={() => setUserSelected("Month")}>Month</div>
            <div onClick={() => setUserSelected("Schedule")}>Schedule</div>
          </div>
        )}
        <div className="profile">
          <img src={profile} alt="avatar.jpg" className="profile-image" />
          <span className="profile-hide">Hemachandra Prabhu</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
