import React, { useContext } from "react";
import "./EventDetails.scss";
import moment from "moment";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";
import { AppContext } from "../../App";

function EventDetails(props) {
  const appContext = useContext(AppContext);

  return (
    <>
      <div
        className="event-details-overlay-styles"
        onClick={() => {
          appContext.setIsDetailsModalOpen(false);
          appContext.setEventDetails(null);
        }}
      />
      <div className="event-details-styles">
        <div className="event-details-header">
          <div className="header-title">
            <b>Event Details</b>
          </div>
          <div className="header-icons">
            <div className="edit">
              <MdOutlineEdit
                className="icon-edit"
                onClick={() => {
                  appContext.setIsModalOpen(true);
                  appContext.setIsDetailsModalOpen(false);
                }}
              />
              <span className="span-edit">Edit event</span>
            </div>

            <div className="delete">
              <RiDeleteBin6Line
                onClick={() => {
                  props.userPicked === "Day"
                    ? props.handleDelete(
                        appContext.eventDetails.id,
                        props.getByDate
                      )
                    : props.handleDelete(
                        appContext.eventDetails.id,
                        props.getByMonth
                      );
                  appContext.setEventDetails(null);
                  appContext.setIsDetailsModalOpen(false);
                }}
                className="icon-delete"
              />
              <span className="span-delete">Delete event</span>
            </div>

            <div className="close">
              <GrFormClose
                onClick={() => {
                  appContext.setEventDetails(null);
                  appContext.setIsDetailsModalOpen(false);
                }}
                className="icon-close"
              />
            </div>
          </div>
        </div>

        <div className="event-details-body">
          <div className="event-color"></div>
          <div className="event-info">
            <div className="event-title">
              {appContext.eventDetails.appointment}
            </div>
            <div className="event-date-time">
              {moment(appContext.eventDetails.startDate).format(
                "Do MMMM YYYY,"
              )}
              ({moment(appContext.eventDetails.startDate).format("h:mm a ")}-
              {moment(appContext.eventDetails.endDate).format(" h:mm a")})
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
