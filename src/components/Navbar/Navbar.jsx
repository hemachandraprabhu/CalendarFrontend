/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import "./Navbar.scss";
import { AppContext } from "../../App";
import NavBarLeft from "./NavBarLeft";
import NavBarCentre from "./NavBarCentre";
import NavBarRight from "./NavBarRight";

function Navbar(props) {
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (props.userPicked === "Day") {
      props.handleGet(props.getByDate);
      appContext.setByGetMonthCondition(true);
    } else if (props.userPicked === "Month" && appContext.getByMonthCondition) {
      props.handleGet(props.getByMonth);
    }
  }, [appContext.date, props.userPicked]);

  return (
    <div className="nav-bar">
      <NavBarLeft />
      <NavBarCentre userPicked={props.userPicked} />
      <NavBarRight userPicked={props.userPicked} />
    </div>
  );
}

export default Navbar;
