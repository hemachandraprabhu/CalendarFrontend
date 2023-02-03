import React, { useContext } from "react";
import "./DiscardModal.scss";
import { GrFormClose } from "react-icons/gr";
import { WidgetContext } from "../Widget";

function DiscardModal({
  setIsDiscardOpen,
  setIsModalOpen,
  setEventDetails,
  handleDelete,
}) {
  const widgetContext = useContext(WidgetContext);

  return (
    <>
      <div
        className="discard-overlay-styles"
        onClick={() => setIsDiscardOpen(false)}
      />
      <div className="discard-modal">
        <div className="discard-header">
          <b>
            {widgetContext.isDetailsModalOpen
              ? "Sure want to delete the event?"
              : "Sure want to discard the changes?"}
          </b>
          <GrFormClose
            className="close-discard"
            onClick={() => {
              setIsDiscardOpen(false);
            }}
          />
        </div>

        <div className="discard-buttons">
          <button
            className="cancel"
            onClick={() => {
              setIsDiscardOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className="discard"
            onClick={() => {
              widgetContext.isDetailsModalOpen &&
                handleDelete(widgetContext.eventDetails.id);
              widgetContext.isDetailsModalOpen &&
                widgetContext.setIsDetailsModalOpen(false);
              setIsDiscardOpen(false);
              setIsModalOpen(false);
              setEventDetails(null);
            }}
          >
            {widgetContext.isDetailsModalOpen ? "Delete" : "Discard"}
          </button>
        </div>
      </div>
    </>
  );
}

export default DiscardModal;
