import axios from "axios";
import moment from "moment";
import { month } from "./Data";

export function Service(date, setEvents, setNotify) {
  /* get by single date url */
  const getByDate = `http://localhost:5169/api/appointments/date?date=${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  /* get by month url */
  const getByMonth = `http://localhost:5169/api/appointments/month?month=${date.getFullYear()}-${
    date.getMonth() + 1
  }`;

  /* perform http get request */
  const handleGet = (getByUrl) => {
    axios
      .get(getByUrl)
      .then((res) => {
        setEvents(res.data);
      })
      .catch(function (error) {
        console.log(error.toJSON());
        setEvents([]);
      });
  };

  /* appointment url for post, put, delete */
  const appointmentUrl = `http://localhost:5169/api/appointments/`;

  /*perfrom http delete operation  */
  const handleDelete = (id, url) => {
    axios.delete(appointmentUrl + id).then(() => {
      setNotify({ toggle: true, message: "Event was successfully deleted" });
      handleGet(url);
    });
  };

  /* perform http post operation */
  const handlePost = (eventDate, title, startTime, endTime, url) => {
    console.log(!title.replace(/\s/g, "").length);
    startTime = moment(startTime, ["hh:mma"]).format("HH:mm");
    endTime = moment(endTime, ["hh:mma"]).format("HH:mm");
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
        setNotify({ toggle: true, message: "event was successfully created" });
        handleGet(url);
      })
      .catch((error) => {
        setNotify({ toggle: true, message: error.response.data });
      });
  };

  /* perform http put request */
  const handlePut = (
    eventId,
    newEventDate,
    newTitle,
    newStartTime,
    newEndTime,
    url
  ) => {
    newStartTime = moment(newStartTime, ["hh:mma"]).format("HH:mm");
    newEndTime = moment(newEndTime, ["hh:mma"]).format("HH:mm");
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
        setNotify({ toggle: true, message: res.data });
        handleGet(url);
      })
      .catch((error) => {
        setNotify({ toggle: true, message: error.response.data });
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
