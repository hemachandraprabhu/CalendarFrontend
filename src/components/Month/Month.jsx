import React, { useContext } from "react";
import "./Month.scss";
import { WidgetContext } from "../Widget";
import { weekday } from "../../Data";
import { WeekRow } from "./components/WeekRow";
import { addDays } from "./components/addDays";
import { DayName } from "./components/DayName";

export default function Month() {
  const widgetContext = useContext(WidgetContext);
  var events = widgetContext.events;

  const firstDayOfMonth = new Date(
    widgetContext.date.getFullYear(),
    widgetContext.date.getMonth(),
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
        widgetContext.isMenuClicked && "extend-month-grid"
      }`}
    >
      <div className="month-body">
        <div className="week-row">
          {weekday.map((dayName, index) => (
            <DayName key={index} dayName={dayName} />
          ))}
        </div>

        {weeks.map((startDate, index) => (
          <WeekRow startDate={startDate} events={events} key={index} />
        ))}
      </div>
    </div>
  );
}
