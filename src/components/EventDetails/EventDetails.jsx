import React, { useContext } from "react";
import "./EventDetails.scss";
import { WidgetContext } from "../Widget";
import { EvenDetailsHeader } from "./EvenDetailsHeader";
import { EventDetailsBody } from "./EventDetailsBody";

function EventDetails(props) {
  const widgetContext = useContext(WidgetContext);

  return (
    <>
      <div
        className="event-details-overlay-styles"
        onClick={() => {
          widgetContext.setIsDetailsModalOpen(false);
          widgetContext.setEventDetails(null);
        }}
      />

      <div className="event-details-styles">
        <EvenDetailsHeader
          setIsDiscardOpen={props.setIsDiscardOpen}
          widgetContext={widgetContext}
        />

        <EventDetailsBody eventDetails={widgetContext.eventDetails} />
      </div>
    </>
  );
}

export default EventDetails;
