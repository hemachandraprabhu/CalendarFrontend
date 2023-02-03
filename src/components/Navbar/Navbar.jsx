/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import "./Navbar.scss";
import { WidgetContext } from "../Widget";
import NavBarLeft from "./NavBarLeft";
import NavBarCentre from "./NavBarCentre";
import NavBarRight from "./NavBarRight";

function Navbar(props) {
  const widgetContext = useContext(WidgetContext);

  useEffect(() => {
    if (props.userPicked === "Day") {
      props.handleGet(props.getByUrl);
      !widgetContext.getByMonthCondition &&
        widgetContext.setGetByMonthCondition(true);
    }
    if (props.userPicked === "Month" && widgetContext.getByMonthCondition) {
      props.handleGet(props.getByUrl);
    }
  }, [widgetContext.date, props.userPicked]);

  return (
    <div className="nav-bar">
      <NavBarLeft />
      <NavBarCentre userPicked={props.userPicked} />
      <NavBarRight userPicked={props.userPicked} />
    </div>
  );
}

export default Navbar;