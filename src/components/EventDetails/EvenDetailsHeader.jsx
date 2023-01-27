import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineEdit } from "react-icons/md";
import { GrFormClose } from "react-icons/gr";

export function EvenDetailsHeader(props) {
  return (
    <div className="event-details-header">
      <div className="header-title">
        <b>Event Details</b>
      </div>

      <div className="header-icons">
        <div className="edit">
          <MdOutlineEdit
            className="icon-edit"
            onClick={() => {
              props.widgetContext.setIsModalOpen(true);
              props.widgetContext.setIsDetailsModalOpen(false);
            }}
          />
          <span className="span-edit">Edit event</span>
        </div>

        <div className="delete">
          <RiDeleteBin6Line
            onClick={() => {
              props.setIsDiscardOpen(true);
            }}
            className="icon-delete"
          />
          <span className="span-delete">Delete event</span>
        </div>

        <div className="close">
          <GrFormClose
            onClick={() => {
              props.widgetContext.setEventDetails(null);
              props.widgetContext.setIsDetailsModalOpen(false);
            }}
            className="icon-close"
          />
        </div>
      </div>
    </div>
  );
}
