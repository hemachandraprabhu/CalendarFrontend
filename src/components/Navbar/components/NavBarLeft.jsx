import React, { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { AppContext } from "../../../App";

export function NavBarLeft() {
  const appContext = useContext(AppContext);

  return (
    <div className="left">
      <FiMenu
        className={`menu-icon ${
          appContext.isMenuClicked && "menu-icon-clicked"
        }`}
        onClick={() => {
          appContext.setIsMenuClicked(!appContext.isMenuClicked);
        }}
      />
      <span>Calendar</span>
    </div>
  );
}
