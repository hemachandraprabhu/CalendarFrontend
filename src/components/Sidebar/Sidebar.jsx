import React, { useContext, useState } from "react";
import "./Sidebar.scss";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { AppContext } from "../../App";
import { BiPlusMedical } from "react-icons/bi";
import moment from "moment";
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import { SideBarFooter } from "./SideBarFooter";

/**
 * @param  {} {userPicked}
 * userpicker prop for updating mini calendar
 */
function Sidebar({ userPicked }) {
  const appContext = useContext(AppContext);

  const [scrollTop, scrollProps] = useScrollTop();
  function useScrollTop() {
    const [scrollTop, setScrollTop] = useState(0);
    const onScroll = (event) => setScrollTop(event.target.scrollTop);
    return [scrollTop, { onScroll }];
  }

  var results = appContext.events.sort(
    (a, b) => new Date(a.startDate) - new Date(b.startDate)
  );
  const futureEvents = (item) => {
    if (moment(item.startDate).format() > moment().format()) {
      return true;
    }
    return false;
  };
  var upComingEvent = results.filter(futureEvents);

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

      <div
        className="side-bar-bottom"
        {...scrollProps}
        style={{
          boxShadow:
            scrollTop > 0 ? "inset 0 2px 1px -1px rgb(0 0 0 / 18%)" : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <MiniCalendar userPicked={userPicked} />
        <SideBarFooter
          results={results}
          upComingEvent={upComingEvent}
          userPicked={userPicked}
        />
      </div>
    </div>
  );
}

export default Sidebar;
