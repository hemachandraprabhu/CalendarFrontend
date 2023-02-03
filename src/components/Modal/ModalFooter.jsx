import React from "react";

export function ModalFooter(props) {
  return (
    <div className="modal-footer">
      <div className="footer-btns">
        <button
          className="cancel"
          onClick={() =>
            props.event.title.replace(/\s/g, "").length && props.cancelClick()
              ? props.setIsDiscardOpen(true)
              : (props.widgetContext.setIsModalOpen(false),
                props.widgetContext.setEventDetails(null))
          }
        >
          Cancel
        </button>
        <button
          className={!props.validate() ? "" : "create-update"}
          onClick={props.handleSubmit}
          disabled={!props.validate()}
        >
          {props.widgetContext.eventDetails === null ? "Create" : "Update"}
        </button>
      </div>
    </div>
  );
}
