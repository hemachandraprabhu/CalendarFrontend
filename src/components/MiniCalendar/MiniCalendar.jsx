/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./MiniCalendar.scss";
import { AppContext } from "../../App";
import { weekday } from "../../Data";
import { WeekRow } from "./components/WeekRow";
import { addDays } from "./components/addDays";
import moment from "moment";
import { IoCaretForwardSharp, IoCaretBackSharp } from "react-icons/io5";
import { MdFastForward, MdFastRewind } from "react-icons/md";

function MiniCalendar({ setIsCalendarOpen, userPicked, setEvent }) {
  const appContext = useContext(AppContext);

  const [miniCalDate, setMiniCalDate] = useState(appContext.date);

  useEffect(() => {
    setMiniCalDate(appContext.date);
  }, [appContext.date, userPicked]);

  useEffect(() => {
    if (
      appContext.miniCalDateCondition &&
      moment(miniCalDate).format("YYYY MMMM D") !==
        moment(appContext.date).format("YYYY MMMM D")
    ) {
      setMiniCalDate(appContext.date);
      appContext.setMiniCalDateCondition(false);
    }
  }, [appContext.miniCalDateCondition]);

  const firstDayOfMonth = new Date(
    miniCalDate.getFullYear(),
    miniCalDate.getMonth(),
    1
  );

  const firstDayOnCalendar = addDays(
    firstDayOfMonth,
    firstDayOfMonth.getDay() * -1
  );

  const totalWeeks = 6;
  const weeks = [];

  let firstDayOfWeek = firstDayOnCalendar;
  for (var i = 0; i < totalWeeks; i++) {
    weeks.push(firstDayOfWeek);
    firstDayOfWeek = addDays(firstDayOfWeek, 7);
  }

  /* to update the year */
  const handleYear = (year) => {
    var y = miniCalDate.getFullYear();
    var month = miniCalDate.getMonth();
    var day = miniCalDate.getDate();
    var c = new Date(y + year, month, day);
    setMiniCalDate(c);
  };

  /* to update the month */
  const handleMonths = (month) => {
    let currDate = new Date(miniCalDate);
    currDate.setDate(1);
    currDate.setMonth(currDate.getMonth() + month);
    setMiniCalDate(currDate);
  };

  return (
    <>
      <div className="mini-cal-grid">
        <div className="mini-cal-header">
          <div className="mini-cal-header-back" style={{ marginRight: "18px" }}>
            <MdFastRewind onClick={() => handleYear(-1)} size={18} />
          </div>
          <div className="mini-cal-header-back">
            <IoCaretBackSharp onClick={() => handleMonths(-1)} />
          </div>
          <div className="mini-cal-header-date">
            {moment(miniCalDate).format("MMMM  YYYY")}
          </div>
          <div className="mini-cal-header-forward">
            <IoCaretForwardSharp onClick={() => handleMonths(1)} />
          </div>
          <div
            className="mini-cal-header-forward"
            style={{ marginLeft: "18px" }}
          >
            <MdFastForward onClick={() => handleYear(1)} size={18} />
          </div>
        </div>
        <div className="mini-cal-body">
          <div className="mini-cal-week-row">
            {weekday.map((dayName, index) => (
              <div className="mini-cal-day-cell" key={index}>
                <div
                  className="mini-cal-day-cell__inner-wrap"
                  style={{
                    color: "#696969",
                  }}
                >
                  <div style={{ fontSize: "10px" }}>{dayName.slice(0, 3)}</div>
                </div>
              </div>
            ))}
          </div>
          {weeks.map((startDate, index) => (
            <WeekRow
              startDate={startDate}
              setIsCalendarOpen={setIsCalendarOpen}
              key={index}
              firstDayOfMonth={firstDayOfMonth}
              userPicked={userPicked}
              setEvent={setEvent}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MiniCalendar;
