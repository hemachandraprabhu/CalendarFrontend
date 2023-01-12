import React, { useContext } from "react";
import "./Sidebar.scss";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AppContext } from "../../App";
import { BiPlusMedical } from "react-icons/bi";

function Sidebar() {
  const appContext = useContext(AppContext);

  return (
    <div className={`side-bar ${appContext.isMenuClicked && "hide-side-bar"}`}>
      <div className="side-bar-top">
        <button
          className="side-bar-create-button"
          onClick={() => {
            appContext.setIsModalOpen(true);
          }}
        >
          <BiPlusMedical className="sidebar-create-icon" />
          <span>Create</span>
        </button>
      </div>

      <div className="side-bar-bottom">
        <Calendar
          date={appContext.date}
          onChange={(userSelectedDate) => appContext.setDate(userSelectedDate)}
          className="cal"
          color="#AA336A"
          fixedHeight={true}
        />
      </div>
    </div>
  );
}

export default Sidebar;
