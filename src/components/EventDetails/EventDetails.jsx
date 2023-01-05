import React, { useContext } from "react";
import { createPortal } from "react-dom";
import "./EventDetails.scss";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { month, weekday } from "../../Data";
import { WidgetContext } from "../Widget/Widget";

function EventDetails() {
  const widgetContext = useContext(WidgetContext);
  var date = new Date(widgetContext.eventDetails.startDate);

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  };
  return createPortal(
    <>
      <div
        style={OVERLAY_STYLES}
        onClick={() => widgetContext.setDetailsPortal(false)}
      />
      <div className="event-details-styles">
        <div className="event-details-header">
          <div className="edit">
            <MdOutlineEdit
              className="icon-edit"
              onClick={() => {
                widgetContext.setIsModalOpen(true);
                widgetContext.setDetailsPortal(false);
              }}
            />
            <span className="span-edit">Edit event</span>
          </div>

          <div className="delete">
            <RiDeleteBin6Line
              onClick={() => {
                widgetContext.handleDelete(widgetContext.eventDetails.id);
                widgetContext.setEventDetails(null);
                widgetContext.setDetailsPortal(false);
              }}
              className="icon-delete"
            />
            <span className="span-delete">Delete event</span>
          </div>

          <div className="close">
            <GrFormClose
              onClick={() => widgetContext.setDetailsPortal(false)}
              className="icon-close"
            />
            <span className="span-close">close</span>
          </div>
        </div>

        <div className="event-details-body">
          <div className="event-color"></div>
          <div className="event-info">
            <div className="event-title">
              {widgetContext.eventDetails.appointment}
            </div>
            <div className="event-date-time">
              {weekday[date.getDay()] +
                "," +
                date.getDate() +
                " " +
                month[date.getMonth()]}
              (
              {moment
                .utc(widgetContext.eventDetails.startDate)
                .format("h:mm a")}
              -{moment.utc(widgetContext.eventDetails.endDate).format("h:mm a")}
              )
            </div>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("details")
  );
}

export default EventDetails;
