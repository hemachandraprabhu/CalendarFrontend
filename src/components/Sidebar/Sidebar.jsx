import React, { useContext } from "react";
import "./Sidebar.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { WidgetContext } from "../Widget";
import { BiPlusMedical } from "react-icons/bi";
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import { SideBarFooter } from "./SideBarFooter";

/**
 * @param  {} {userPicked}
 * userpicker prop for updating mini calendar
 */
function Sidebar({ userPicked }) {
  const widgetContext = useContext(WidgetContext);

  return (
    <div
      className={`side-bar ${widgetContext.isMenuClicked && "hide-side-bar"}`}
    >
      <div className="side-bar-top">
        <button
          className="side-bar-create-button"
          onClick={() => {
            widgetContext.setIsModalOpen(true);
          }}
        >
          <BiPlusMedical className="sidebar-create-icon" />
          <span>Create</span>
        </button>
      </div>

      <div className="side-bar-bottom">
        <MiniCalendar userPicked={userPicked} />
        <SideBarFooter
          userPicked={userPicked}
        />
      </div>
    </div>
  );
}

export default Sidebar;
