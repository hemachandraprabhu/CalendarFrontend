import React from "react";
import { DayCell } from "./DayCell";
import { addDays } from "./addDays";

export function WeekRow({ startDate, setIsCalendarOpen, firstDayOfMonth, userPicked, setEvent }) {
  const days = [];
  let date = new Date(Number(startDate));
  for (var i = 0; i < 7; i++) {
    days.push(date);
    date = addDays(date, 1);
  }

  return (
    <div className="mini-cal-week-row">
      {days.map((day, index) => {
        return (
          <DayCell
            date={day}
            setIsCalendarOpen={setIsCalendarOpen}
            firstDayOfMonth={firstDayOfMonth}
            userPicked={userPicked}
            setEvent={setEvent}
            key={index}
          />
        );
      })}
    </div>
  );
}
