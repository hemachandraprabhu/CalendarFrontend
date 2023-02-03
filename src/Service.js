import axios from "axios";
import moment from "moment";
import { month } from "./Data";

export function Service(date, setEvents, setNotify, events) {
  /* get by  date url */
  const getByDate = `http://localhost:5169/api/appointments/date?date=${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  /* get by month url */
  const getByMonth = `http://localhost:5169/api/appointments/month?month=${date.getFullYear()}-${
    date.getMonth() + 1
  }`;

  /* perform http get request */
  const handleGet = (getByUrl) => {
    console.log(getByUrl);
    axios
      .get(getByUrl)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((error) => {
        setEvents([]);
      });
  };

  /* appointment url for post, put, delete */
  const appointmentUrl = `http://localhost:5169/api/appointments/`;

  /*perfrom http delete operation  */
  const handleDelete = (id) => {
    axios.delete(appointmentUrl + id).then((res) => {
      res.status === 204 &&
        setNotify({ toggle: true, message: "Event was successfully deleted" });
      setEvents(events.filter((a) => a.id !== id));
    });
  };

  /* perform http post operation */
  const handlePost = (eventDate, title, startTime, endTime) => {
    const add = {
      startDate: moment(
        `${eventDate.getDate()} ${
          month[eventDate.getMonth()]
        } ${eventDate.getFullYear()} ${startTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      endDate: moment(
        `${eventDate.getDate()} ${
          month[eventDate.getMonth()]
        } ${eventDate.getFullYear()} ${endTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      appointment: title,
    };
    axios
      .post(appointmentUrl, add)
      .then((res) => {
        if (res.status === 201) {
          setNotify({
            toggle: true,
            message: "Event was successfully created",
          });
          setEvents((prev) => [...prev, res.data]);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response.status === 409) {
          setNotify({
            toggle: true,
            message: "Already an event exist in the choosen time",
          });
        }
        if (error.response.data === "400_1") {
          setNotify({
            toggle: true,
            message: "Invalid Time",
          });
        }
        if (error.response.data === "400_2") {
          setNotify({
            toggle: true,
            message: "Cannot create event for past",
          });
        }
      });
  };

  /* perform http put request */
  const handlePut = (
    eventId,
    newEventDate,
    newTitle,
    newStartTime,
    newEndTime
  ) => {
    const add = {
      id: eventId,
      startDate: moment(
        `${newEventDate.getDate()} ${
          month[newEventDate.getMonth()]
        } ${newEventDate.getFullYear()} ${newStartTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      endDate: moment(
        `${newEventDate.getDate()} ${
          month[newEventDate.getMonth()]
        } ${newEventDate.getFullYear()} ${newEndTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      appointment: newTitle,
    };
    axios
      .put(appointmentUrl, add)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          /* if the choosen day is different day and that day event is 0 */
          if (events.length === 0) {
            setEvents([add]);
          } else {
            /*else,  if the choosen day is same day then map the events in that day and find the eventId & update the event , 
            else if choosen day is different day and that day contains some events, add the updated event to that events array*/
            var check = false;
            const updatedEvent = events.map((obj) => {
              if (obj.id === eventId) {
                check = true;
                return {
                  ...obj,
                  startDate: add.startDate,
                  endDate: add.endDate,
                  appointment: add.appointment,
                };
              }
              return obj;
            });
            check
              ? setEvents(updatedEvent)
              : setEvents((prev) => [...prev, add]);
          }
          setNotify({
            toggle: true,
            message: "Event was successfully updated",
          });
        }
      })
      .catch((error) => {
        console.log(error.response.status);
        error.response.status === 409 &&
          setNotify({
            toggle: true,
            message: "Already an event exist in the choosen time",
          });
        if (error.response.data === "400_1") {
          setNotify({
            toggle: true,
            message: "Invalid Time",
          });
        }
        if (error.response.data === "400_2") {
          setNotify({
            toggle: true,
            message: "Cannot update event for past",
          });
        }
      });
  };

  return {
    handlePost,
    handlePut,
    handleDelete,
    handleGet,
    getByDate,
    getByMonth,
  };
}
