import React, { useContext } from "react";
import { AppContext } from "../../../App";
import moment from "moment";

export function DayCell({ date, setIsCalendarOpen, firstDayOfMonth }) {
  const appContext = useContext(AppContext);

  return (
    <div className="mini-cal-day-cell">
      <div className="mini-cal-day-cell__inner-wrap">
        <div className="mini-cal-day-cell-date">
          <span
            onClick={() => {
              appContext.setDate(date);
              appContext.isModalOpen && setIsCalendarOpen(false);
            }}
            className={`mini-cal-normal-date ${
              moment(date).format("YYYY MMMM D") ===
                moment().format("YYYY MMMM D") && "mini-cal-add-color"
            } ${
              moment(date).format("YYYY MMMM") !==
                moment(firstDayOfMonth).format("YYYY MMMM") &&
              "mini-cal-grey-color"
            } `}
            style={{
              backgroundColor:
                moment(date).format("D MMM YYYY") ===
                moment(appContext.date).format("D MMM YYYY")
                  ? "pink"
                  : "",
              color:
                moment(date).format("D MMM YYYY") ===
                moment(appContext.date).format("D MMM YYYY")
                  ? "#aa336a"
                  : "black",
            }}
          >
            {date.getDate()}
          </span>
        </div>
      </div>
    </div>
  );
}

// ${
//   moment(date).format("YYYY MMMM") !==
//     moment(appContext.date).format("YYYY MMMM") &&
//   "mini-cal-grey-color"
// }
