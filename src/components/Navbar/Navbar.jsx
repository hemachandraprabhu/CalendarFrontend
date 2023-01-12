import React, { useContext } from "react";
import "./Navbar.scss";
import { AppContext } from "../../App";
import { NavBarLeft } from "./components/NavBarLeft";
import { NavBarCentre } from "./components/NavBarCentre";
import { NavBarRight } from "./components/NavBarRight";

function Navbar({ userPicked }) {
  const appContext = useContext(AppContext);

  if (userPicked === "Day") {
    appContext.setGet(true);
  } else {
    appContext.setGet(false);
  }

  return (
    <div className="nav-bar">
      <NavBarLeft />
      <NavBarCentre userPicked={userPicked} />
      <NavBarRight userPicked={userPicked} />
    </div>
  );
}

export default Navbar;
