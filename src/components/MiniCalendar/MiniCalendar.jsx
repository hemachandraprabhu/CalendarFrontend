/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./MiniCalendar.scss";
import { WidgetContext } from "../Widget";
import { weekday } from "../../Data";
import { WeekRow } from "./components/WeekRow";
import { addDays } from "./components/addDays";
import moment from "moment";
import { IoCaretForwardSharp, IoCaretBackSharp } from "react-icons/io5";
import { MdFastForward, MdFastRewind } from "react-icons/md";
import { DayName } from "./components/DayName";

function MiniCalendar({
  setIsCalendarOpen,
  userPicked,
  setEvent,
  width,
  dateWidth,
}) {
  const widgetContext = useContext(WidgetContext);

  const [miniCalDate, setMiniCalDate] = useState(widgetContext.date);

  useEffect(() => {
    setMiniCalDate(widgetContext.date);
  }, [widgetContext.date, userPicked]);

  useEffect(() => {
    if (
      widgetContext.miniCalDateCondition &&
      moment(miniCalDate).format("YYYY MMMM D") !==
        moment(widgetContext.date).format("YYYY MMMM D")
    ) {
      setMiniCalDate(widgetContext.date);
      widgetContext.setMiniCalDateCondition(false);
    }
  }, [widgetContext.miniCalDateCondition]);

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

  /* to update the year */ /* MOMENT */
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
      <div className="mini-cal-grid" style={{ width: width }}>
        <div className="mini-cal-header">
          <div
            className="mini-cal-header-back"
            style={{ marginRight: "14px" }}
            onClick={() => handleYear(-1)}
          >
            <MdFastRewind size={16} />
          </div>
          <div
            className="mini-cal-header-back"
            onClick={() => handleMonths(-1)}
          >
            <IoCaretBackSharp />
          </div>
          <div className="mini-cal-header-date">
            {moment(miniCalDate).format("MMMM  YYYY")}
          </div>
          <div
            className="mini-cal-header-forward"
            onClick={() => handleMonths(1)}
          >
            <IoCaretForwardSharp />
          </div>
          <div
            className="mini-cal-header-forward"
            style={{ marginLeft: "14px" }}
            onClick={() => handleYear(1)}
          >
            <MdFastForward size={16} />
          </div>
        </div>

        <div className="mini-cal-body">
          <div className="mini-cal-week-row">
            {weekday.map((dayName, index) => (
              <DayName key={index} dayName={dayName} dateWidth={dateWidth} />
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
              dateWidth={dateWidth}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default MiniCalendar;
