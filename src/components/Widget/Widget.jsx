/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  createContext,
} from "react";
import Sidebar from "../Sidebar/Sidebar";
import TimeFrame from "../TimeFrame/TimeFrame";
import Modal from "../Modal/Modal";
import { month } from "../../Data";
import axios from "axios";
import { DateContext } from "../../App";
import EventDetails from "../EventDetails/EventDetails";
import moment from "moment";

export const WidgetContext = createContext();

function Widget() {
  const dateContext = useContext(DateContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [event, setEvent] = useState([]);

  const [detailsPortal, setDetailsPortal] = useState(false);
  const [eventDetails, setEventDetails] = useState(null);

  const getByDateUrl = `http://localhost:5169/api/appointments/date?date=${dateContext.date.getFullYear()}-${
    dateContext.date.getMonth() + 1
  }-${dateContext.date.getDate()}`;

  const getByIdUrl = `http://localhost:5169/api/appointments/`;

  const handleGet = () => {
    axios
      .get(getByDateUrl)
      .then((res) => {
        setEvent(res.data);
      })
      .catch(function (error) {
        console.log(error.toJSON());
        setEvent([]);
      });
  };

  useEffect(() => {
    handleGet();
  }, [getByDateUrl]);

  const handleDelete = (id) => {
    axios.delete(getByIdUrl + id).then(() => {
      handleGet();
      console.log("deleted");
    });
  };

  const postUrl = `http://localhost:5169/api/appointments`;

  const handlePost = (title, startTime, endTime) => {
    if (title === "") {
      title = "(No Title)";
    }
    const add = {
      startDate: moment(
        `${dateContext.date.getDate()} ${
          month[dateContext.date.getMonth()]
        } ${dateContext.date.getFullYear()} ${startTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      endDate: moment(
        `${dateContext.date.getDate()} ${
          month[dateContext.date.getMonth()]
        } ${dateContext.date.getFullYear()} ${endTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      appointment: title,
    };
    console.log(add);
    axios
      .post(postUrl, add)
      .then((res) => {
        console.log(res.data);
        handleGet();
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  const handlePut = (newTitle, newStartTime, newEndTime) => {
    if (newTitle === "") {
      newTitle = "(No Title)";
    }
    const add = {
      id: eventDetails.id,
      startDate: moment(
        `${dateContext.date.getDate()} ${
          month[dateContext.date.getMonth()]
        } ${dateContext.date.getFullYear()} ${newStartTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      endDate: moment(
        `${dateContext.date.getDate()} ${
          month[dateContext.date.getMonth()]
        } ${dateContext.date.getFullYear()} ${newEndTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      appointment: newTitle,
    };
    console.log(add);
    axios
      .put(postUrl, add)
      .then((res) => {
        console.log(res);
        handleGet();
      })
      .catch(function (error) {
        alert(error.message);
      });
  };

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  return (
    <div className="widget">
      <WidgetContext.Provider
        value={{
          setIsModalOpen,
          event,
          setEventDetails,
          setDetailsPortal,
          handlePost,
          eventDetails,
          handlePut,
          menuRef,
          handleDelete,
        }}
      >
        <Sidebar />
        <TimeFrame />
        {isModalOpen && <Modal />}
        {detailsPortal && <EventDetails />}
      </WidgetContext.Provider>
    </div>
  );
}

export default Widget;

// {
//   startDate: new Date(
//     `${dateContext.date.getDate()} ${
//       month[dateContext.date.getMonth()]
//     } ${dateContext.date.getFullYear()} ${startTime} UTC`
//   ).toISOString(),
//   endDate: new Date(
//     `${dateContext.date.getDate()} ${
//       month[dateContext.date.getMonth()]
//     } ${dateContext.date.getFullYear()} ${endTime} UTC`
//   ).toISOString(),
//   appointment: title,
// };

// startDate: new Date(
//   `${dateContext.date.getDate()} ${
//     month[dateContext.date.getMonth()]
//   } ${dateContext.date.getFullYear()} ${newStartTime} UTC`
// ).toISOString(),
// endDate: new Date(
//   `${dateContext.date.getDate()} ${
//     month[dateContext.date.getMonth()]
//   } ${dateContext.date.getFullYear()} ${newEndTime} UTC`
// ).toISOString(),

/* <Sidebar setIsModalOpen={setIsModalOpen} />

      <TimeFrame
        event={event}
        setEventDetails={setEventDetails}
        setDetailsPortal={setDetailsPortal}
        setIsModalOpen={setIsModalOpen}
      />

      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          handlePost={handlePost}
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          handlePut={handlePut}
          menuRef={menuRef}
        />
      )}

      {detailsPortal && (
        <EventDetails
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          setIsModalOpen={setIsModalOpen}
          handleDelete={handleDelete}
          setDetailsPortal={setDetailsPortal}
        />
      )} */
