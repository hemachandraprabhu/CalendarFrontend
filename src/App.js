/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, createContext } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import TimeFrame from "./components/TimeFrame/TimeFrame";
import Month from "./components/Month/Month";
import Modal from "./components/Modal/Modal";
import EventDetails from "./components/EventDetails/EventDetails";
import Notify from "./components/Notify/Notify";
import DiscardModal from "./components/DiscardModal/DiscardModal";
import { BiPlusMedical } from "react-icons/bi";
import { Service } from "./Service";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/*to pass the states globally as props*/
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

  /* to toggle the notification and its message */
  const [notify, setNotify] = useState({
    toggle: false,
    message: "",
  });

  /* to toggle discard modal which is used for indicating that the changes was made by user */
  const [isDiscardOpen, setIsDiscardOpen] = useState(false);

  /* Service function performs all http requests */
  const {
    handlePost,
    handlePut,
    handleDelete,
    handleGet,
    getByDate,
    getByMonth,
  } = Service(date, setEvents, setNotify, events);

  /* condition to get datas for month */
  const [getByMonthCondition, setByGetMonthCondition] = useState(true);

  const [miniCalDateCondition, setMiniCalDateCondition] = useState(false);

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
          eventDetails,
          setEventDetails,
          setIsDetailsModalOpen,
          getByMonthCondition,
          setByGetMonthCondition,
          miniCalDateCondition,
          setMiniCalDateCondition,
          isDiscardOpen,
          setIsDiscardOpen,
          isDetailsModalOpen,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar
                  userPicked="Day"
                  handleGet={handleGet}
                  getByDate={getByDate}
                />
                <Sidebar userPicked="Day" />
                <TimeFrame />
                {isModalOpen && (
                  <Modal
                    userPicked="Day"
                    handlePost={handlePost}
                    handlePut={handlePut}
                    isDiscardOpen={isDiscardOpen}
                    setIsDiscardOpen={setIsDiscardOpen}
                    setNotify={setNotify}
                  />
                )}
              </>
            }
          />
          <Route
            path="/month"
            element={
              <>
                <Navbar
                  userPicked="Month"
                  handleGet={handleGet}
                  getByMonth={getByMonth}
                />
                <Sidebar userPicked="Month" />
                <Month />
                {isModalOpen && (
                  <Modal
                    userPicked="Month"
                    handlePost={handlePost}
                    handlePut={handlePut}
                    isDiscardOpen={isDiscardOpen}
                    setIsDiscardOpen={setIsDiscardOpen}
                    setNotify={setNotify}
                  />
                )}
              </>
            }
          />
        </Routes>
        {isMenuClicked && (
          <BiPlusMedical
            className="create-icon"
            onClick={() => setIsModalOpen(true)}
          />
        )}

        {isDiscardOpen && (
          <DiscardModal
            setIsDiscardOpen={setIsDiscardOpen}
            setIsModalOpen={setIsModalOpen}
            setEventDetails={setEventDetails}
            handleDelete={handleDelete}
          />
        )}
        {isDetailsModalOpen && <EventDetails />}
        {notify.toggle && (
          <Notify
            message={notify.message}
            toggle={notify.toggle}
            setNotify={setNotify}
          />
        )}
      </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
