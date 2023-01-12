/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import TimeFrame from "./components/TimeFrame/TimeFrame";
import Modal from "./components/Modal/Modal";
import EventDetails from "./components/EventDetails/EventDetails";
import Month from "./components/Month/Month";
import axios from "axios";
import moment from "moment";
import { month } from "./Data";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BiPlusMedical } from "react-icons/bi";

export const AppContext = createContext();

function App() {
  /* to maintain date across entire application */
  const [date, setDate] = useState(new Date());

  /* to toggle the sidebar */
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  /* to toggle the modal used for create and update the event*/
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* to store the events captured from backend*/
  const [events, setEvents] = useState([]);

  /* to toggle the modal used for displaying the event details */
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  /* to store the single event details */
  const [eventDetails, setEventDetails] = useState(null);

  /* to change the get method url*/
  const [get, setGet] = useState(true);

  const getByDate = `http://localhost:5169/api/appointments/date?date=${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;

  const getByMonth = `http://localhost:5169/api/appointments/month?month=${date.getFullYear()}-${
    date.getMonth() + 1
  }`;

  const getByUrl = get ? getByDate : getByMonth;

  const handleGet = () => {
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

  useEffect(() => {
    handleGet();
  }, [getByUrl]);


  const getByIdUrl = `http://localhost:5169/api/appointments/`;

  const handleDelete = (id) => {
    axios.delete(getByIdUrl + id).then(() => {
      handleGet();
    });
  };

  const postUrl = `http://localhost:5169/api/appointments`;

  const handlePost = (title, startTime, endTime) => {
    if (title === "") {
      title = "(No Title)";
    }
    const add = {
      startDate: moment(
        `${date.getDate()} ${
          month[date.getMonth()]
        } ${date.getFullYear()} ${startTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      endDate: moment(
        `${date.getDate()} ${
          month[date.getMonth()]
        } ${date.getFullYear()} ${endTime}`
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
      .catch((error) => {
        console.log(error);
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
        `${date.getDate()} ${
          month[date.getMonth()]
        } ${date.getFullYear()} ${newStartTime}`
      )
        .local()
        .format("YYYY-MM-DDTHH:mm:SS.sss"),
      endDate: moment(
        `${date.getDate()} ${
          month[date.getMonth()]
        } ${date.getFullYear()} ${newEndTime}`
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

  return (
    <BrowserRouter>
      <AppContext.Provider
        value={{
          date,
          setDate,
          isMenuClicked,
          setIsMenuClicked,
          isModalOpen,
          setIsModalOpen,
          events,
          setEventDetails,
          setIsDetailsModalOpen,
          handlePost,
          eventDetails,
          handlePut,
          handleDelete,
          setGet,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar userPicked="Day" />
                <TimeFrame />
              </>
            }
          />
          <Route
            path="/month"
            element={
              <>
                <Navbar userPicked="Month" />
                <Month />
              </>
            }
          />
        </Routes>
        <Sidebar />
        {isMenuClicked && (
          <BiPlusMedical
            className="create-icon"
            onClick={() => setIsModalOpen(true)}
          />
        )}
        {isModalOpen && <Modal />}
        {isDetailsModalOpen && <EventDetails />}
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
