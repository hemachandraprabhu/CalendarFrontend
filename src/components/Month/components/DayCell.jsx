import React, { useContext, useState } from "react";
import { WidgetContext } from "../../Widget";
import moment from "moment";
import DayCellDate from "./DayCellDate";
import { AllEvents } from "./AllEvents";

export function DayCell({ date, events }) {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const widgetContext = useContext(WidgetContext);

  const singleDayAppointment = (item) => {
    return (
      moment(item.startDate).format("YYYY MMMM D") ===
      moment(date).format("YYYY MMMM D")
    );
  };
  let appointments = events.filter(singleDayAppointment);

  let sortedAppointments = appointments.sort(
    (a, b) => moment(a.startDate) - moment(b.startDate)
  );

  return (
    <div
      className="day-cell"
      onClick={() => {
        widgetContext.setIsModalOpen(true);
        widgetContext.setDate(date);
      }}
    >
      <div className="day-cell__inner-wrap">
        <DayCellDate date={date} />

        {appointments.map(
          (item, index) =>
            index < 2 && (
              <div
                className="day-cell__events"
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  widgetContext.setEventDetails(item);
                  widgetContext.setIsDetailsModalOpen(true);
                }}
              >
                <div className="single-event">
                  <span className="event-time">
                    {moment(item.startDate).format("h:mma ")}
                  </span>
                  <span className="event-name">{item.appointment}</span>
                </div>
              </div>
            )
        )}

        {sortedAppointments.length > 2 && (
          <div
            className="day-cell__events more"
            onClick={(e) => {
              e.stopPropagation();
              setShowAllEvents(true);
            }}
          >
            <div>{sortedAppointments.length - 2} more</div>
          </div>
        )}

        {showAllEvents && (
          <AllEvents
            date={date}
            setShowAllEvents={setShowAllEvents}
            sortedAppointments={sortedAppointments}
          />
        )}
      </div>
    </div>
  );
}
