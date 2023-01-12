import React, { useContext } from "react";
import "./Month.scss";
import { AppContext } from "../../App";
import { weekday } from "../../Data";
import { WeekRow } from "./components/WeekRow";
import { addDays } from "./components/addDays";

export default function Month() {
  const appContext = useContext(AppContext);
  var events = appContext.events;
  console.log(events);

  const firstDayOfMonth = new Date(
    appContext.date.getFullYear(),
    appContext.date.getMonth(),
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

  return (
    <div
      className={`month-grid ${
        appContext.isMenuClicked && "extend-month-grid"
      }`}
    >
      <div className="month-body">
        <div className="week-row">
          {weekday.map((dayName) => (
            <div className="day-cell">
              <div
                className="day-cell__inner-wrap"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "16px" }}>{dayName}</div>
              </div>
            </div>
          ))}
        </div>
        {weeks.map((startDate) => (
          <WeekRow startDate={startDate} events={events} />
        ))}
      </div>
    </div>
  );
}
