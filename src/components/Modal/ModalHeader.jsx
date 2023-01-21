import React, { useContext } from "react";
import create from "../../assets/create.png";
import { GrUpdate } from "react-icons/gr";
import { GrFormClose } from "react-icons/gr";
import { AppContext } from "../../App";

function ModalHeader(props) {
  const appContext = useContext(AppContext);

  return (
    <div className="modal-header">
      <div className="left">
        <b>
          {appContext.eventDetails === null
            ? "Create an event"
            : "Update an event"}
        </b>
      </div>
      {appContext.eventDetails != null ? (
        <GrUpdate />
      ) : (
        <img src={create} alt="create.png" />
      )}
      <GrFormClose
        className="modal-close"
        onClick={() => {
          props.event.title.replace(/\s/g, "").length && props.cancelClick()
            ? props.setIsDiscardOpen(true)
            : appContext.setIsModalOpen(false) &&
              appContext.setEventDetails(null);
        }}
      />
    </div>
  );
}

export default ModalHeader;
