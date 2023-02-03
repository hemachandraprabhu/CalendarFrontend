import React, { useContext } from "react";
import { WidgetContext } from "../../Widget";
import moment from "moment";

export function DayCell({
  date,
  setIsCalendarOpen,
  firstDayOfMonth,
  userPicked,
  setEvent,
  dateWidth,
}) {
  const widgetContext = useContext(WidgetContext);

  const check = () => {
    moment(date).format("YYYY MMMM") !==
    moment(widgetContext.date).format("YYYY MMMM")
      ? widgetContext.setGetByMonthCondition(true)
      : widgetContext.setGetByMonthCondition(false);
  };
  return (
    <div className="mini-cal-day-cell">
      <div
        className="mini-cal-day-cell__inner-wrap"
        style={{ width: dateWidth }}
      >
        <div className="mini-cal-day-cell-date">
          <span
            onClick={() => {
              userPicked === "Month" && (check());

              moment(date).format("YYYY MMMM D") !==
                moment(widgetContext.date).format("YYYY MMMM D") &&
                widgetContext.setDate(date);

              widgetContext.isModalOpen &&
                setEvent((prev) => {
                  return { ...prev, eventDate: date };
                });
              widgetContext.isModalOpen && setIsCalendarOpen(false);
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
                moment(widgetContext.date).format("D MMM YYYY")
                  ? "pink"
                  : "",
              color:
                moment(date).format("D MMM YYYY") ===
                moment(widgetContext.date).format("D MMM YYYY")
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
