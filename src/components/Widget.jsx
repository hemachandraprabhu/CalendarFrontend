import React, { useState, createContext } from "react";
import "./Widget.scss";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";
import TimeFrame from "./TimeFrame/TimeFrame";
import Month from "./Month/Month";
import Modal from "./Modal/Modal";
import { BiPlusMedical } from "react-icons/bi";
import DiscardModal from "./DiscardModal/DiscardModal";
import EventDetails from "./EventDetails/EventDetails";
import Notify from "./Notify/Notify";
import { Service } from "../Service";

/*to pass the states globally as props*/
export const WidgetContext = createContext();

function Widget({ userPicked }) {
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

  /* condition to get datas for month */
  const [getByMonthCondition, setGetByMonthCondition] = useState(true);

  /* to update the date in minicalendar */
  const [miniCalDateCondition, setMiniCalDateCondition] = useState(false);

  /* Service function performs all http requests */
  const {
    handlePost,
    handlePut,
    handleDelete,
    handleGet,
    getByDate,
    getByMonth,
  } = Service(date, setEvents, setNotify, events);

  return (
    <WidgetContext.Provider
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
        setGetByMonthCondition,
        miniCalDateCondition,
        setMiniCalDateCondition,
        isDetailsModalOpen,
      }}
    >
      <Navbar
        userPicked={userPicked}
        handleGet={handleGet}
        getByUrl={userPicked === "Day" ? getByDate : getByMonth}
      />
      <Sidebar userPicked={userPicked} />
      {userPicked === "Day" ? <TimeFrame /> : <Month />}
      
      {isModalOpen && (
        <Modal
          userPicked={userPicked}
          handlePost={handlePost}
          handlePut={handlePut}
          isDiscardOpen={isDiscardOpen}
          setIsDiscardOpen={setIsDiscardOpen}
          setNotify={setNotify}
        />
      )}

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
      {isDetailsModalOpen && (
        <EventDetails setIsDiscardOpen={setIsDiscardOpen} />
      )}
      {notify.toggle && (
        <Notify
          message={notify.message}
          toggle={notify.toggle}
          setNotify={setNotify}
        />
      )}
    </WidgetContext.Provider>
  );
}

export default Widget;