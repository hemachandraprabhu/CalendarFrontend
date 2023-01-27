import moment from "moment";

export function HandleModal(widgetContext, props, event, isCalendarOpen) {
  const handleSubmit = () => {
    /* if evenDetails is empty call post method  */
    if (!widgetContext.eventDetails) {
      props.handlePost(
        event.eventDate,
        event.title,
        event.startTime,
        event.endTime
      );
    }
    /* if evenDetails is not empty call put method  */
    if (widgetContext.eventDetails) {
      console.log(
        moment(event.eventDate).format("YYYY MMMM D"),
        moment(widgetContext.eventDetails.startDate).format("YYYY MMMM D")
      );
      if (
        event.title !== widgetContext.eventDetails.appointment ||
        moment(event.eventDate).format("YYYY MMMM D") !==
          moment(widgetContext.eventDetails.startDate).format("YYYY MMMM D") ||
        event.startTime !==
          moment(widgetContext.eventDetails.startDate).format("h:mm a") ||
        event.endTime !==
          moment(widgetContext.eventDetails.endDate).format("h:mm a")
      ) {
        props.handlePut(
          widgetContext.eventDetails.id,
          event.eventDate,
          event.title,
          event.startTime,
          event.endTime
        );
      } else {
        props.setNotify({
          toggle: true,
          message: "Update failed since no changes were done",
        });
      }
    }
    widgetContext.setEventDetails(null);
    widgetContext.setIsModalOpen(false);
  };

  const handleClick = () => {
    if (
      !isCalendarOpen &&
      (!event.title ||
        (widgetContext.eventDetails !== null &&
          event.title === widgetContext.eventDetails.appointment &&
          moment(event.eventDate).format("YYYY MMMM D") ===
            moment(widgetContext.eventDetails.startDate).format("YYYY MMMM D") &&
          event.startTime ===
            moment(widgetContext.eventDetails.startDate).format("h:mm a") &&
          event.endTime ===
            moment(widgetContext.eventDetails.endDate).format("h:mm a")))
    ) {
      widgetContext.setEventDetails(null);
      widgetContext.setIsModalOpen(false);
    }
  };

  const cancelClick = () => {
    if (
      widgetContext.eventDetails !== null &&
      event.title === widgetContext.eventDetails.appointment &&
      moment(event.eventDate).format("YYYY MMMM D") ===
        moment(widgetContext.eventDetails.startDate).format("YYYY MMMM D") &&
      event.startTime ===
        moment(widgetContext.eventDetails.startDate).format("h:mm a") &&
      event.endTime === moment(widgetContext.eventDetails.endDate).format("h:mm a")
    ) {
      widgetContext.setEventDetails(null);
      return false;
    }
    return true;
  };
  return { handleClick, cancelClick, handleSubmit };
}
