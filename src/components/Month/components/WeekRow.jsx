import React from "react";
import { DayCell } from "./DayCell";
import { addDays } from "./addDays";


export function WeekRow({ startDate, events }) {
  const days = [];
  let date = new Date(Number(startDate));
  for (var i = 0; i < 7; i++) {
    days.push(date);
    date = addDays(date, 1);
  }

  return (
    <div className="week-row">
      {days.map((day) => {
        return <DayCell date={day} events={events} />;
      })}
    </div>
  );
}

// function eventsExistForDate(events, date) {
//   console.log(events);
//   var arr = [];
//   console.log(
//     events.(
//       (evt) =>
//         new Date(evt.startDate).getFullYear() === date.getFullYear() &&
//         new Date(evt.startDate).getMonth() === date.getMonth() &&
//         new Date(evt.startDate).getDate() === date.getDate()
//     )
//   );
//   console.log(arr);
// }