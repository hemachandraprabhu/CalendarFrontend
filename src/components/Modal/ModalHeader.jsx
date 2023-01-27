import React, { useContext } from "react";
import create from "../../assets/create.png";
import { GrUpdate } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";
import { WidgetContext } from "../Widget";

function ModalHeader(props) {
  const widgetContext = useContext(WidgetContext);

  return (
    <div className="modal-header">
      <div className="left">
        <b>
          {widgetContext.eventDetails === null
            ? "Create an event"
            : "Update an event"}
        </b>
      </div>
      {widgetContext.eventDetails != null ? (
        <GrUpdate />
      ) : (
        <img src={create} alt="create.png" />
      )}
      <GrFormClose
        className="modal-close"
        onClick={() => {
          props.event.title.replace(/\s/g, "").length && props.cancelClick()
            ? props.setIsDiscardOpen(true)
            : widgetContext.setIsModalOpen(false) &&
              widgetContext.setEventDetails(null);
        }}
      />
    </div>
  );
}

export default ModalHeader;
