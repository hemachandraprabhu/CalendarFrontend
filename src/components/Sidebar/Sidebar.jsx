import React, { useContext } from "react";
import "./Sidebar.scss";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateContext } from "../../App";
import { BiPlusMedical } from "react-icons/bi";
import { WidgetContext } from "../Widget/Widget";

function Sidebar() {
  const dateContext = useContext(DateContext);
  const widgetContext = useContext(WidgetContext);

  return (
    <div
      className={`${dateContext.isMenuClicked ? "hide-side-bar" : "side-bar"}`}
    >
      <div className="side-bar-top">
        <button
          className="side-bar-create-button"
          onClick={() => {
            widgetContext.setIsModalOpen(true);
          }}
        >
          <BiPlusMedical className="create-icon" />
          <span>Create</span>
        </button>
      </div>

      <div className="side-bar-bottom">
        <Calendar
          date={dateContext.date}
          onChange={(userSelectedDate) => dateContext.setDate(userSelectedDate)}
          className="cal"
          color="#AA336A"
          fixedHeight={true}
        />
      </div>
    </div>
  );
}

export default Sidebar;
