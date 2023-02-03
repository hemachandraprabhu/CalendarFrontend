import React from "react";
import { DayCell } from "./DayCell";
import { addDays } from "./addDays";

export function WeekRow({ startDate, events }) {
  const days = [];

  let date = startDate;
  for (var i = 0; i < 7; i++) {
    days.push(date);
    date = addDays(date, 1);
  }

  return (
    <div className="week-row">
      {days.map((day, index) => {
        return <DayCell date={day} events={events} key={index} />;
      })}
    </div>
  );
}
