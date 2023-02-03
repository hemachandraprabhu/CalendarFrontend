import React, { useContext } from "react";
import { FiMenu } from "react-icons/fi";
import { WidgetContext } from "../Widget";

function NavBarLeft() {
  const widgetContext = useContext(WidgetContext);

  return (
    <div className="left">
      <FiMenu
        className={`menu-icon ${
          widgetContext.isMenuClicked && "menu-icon-clicked"
        }`}
        onClick={() => {
          widgetContext.setIsMenuClicked(!widgetContext.isMenuClicked);
        }}
      />
      <span>Calendar</span>
    </div>
  );
}

export default NavBarLeft;
