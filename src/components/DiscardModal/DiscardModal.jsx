import React, { useContext } from "react";
import "./DiscardModal.scss";
import { GrFormClose } from "react-icons/gr";
import { AppContext } from "../../App";

function DiscardModal({
  setIsDiscardOpen,
  setIsModalOpen,
  setEventDetails,
  handleDelete,
}) {
  const appContext = useContext(AppContext);

  return (
    <>
      <div
        className="discard-overlay-styles"
        onClick={() => setIsDiscardOpen(false)}
      />
      <div className="discard-modal">
        <div className="discard-header">
          <b>
            {appContext.isDetailsModalOpen
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
              appContext.isDetailsModalOpen &&
                handleDelete(appContext.eventDetails.id);
              appContext.isDetailsModalOpen &&
                appContext.setIsDetailsModalOpen(false);
              setIsDiscardOpen(false);
              setIsModalOpen(false);
              setEventDetails(null);
            }}
          >
            {appContext.isDetailsModalOpen ? "Delete" : "Discard"}
          </button>
        </div>
      </div>
    </>
  );
}

export default DiscardModal;
