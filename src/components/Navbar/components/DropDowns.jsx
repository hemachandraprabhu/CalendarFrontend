import React, { useContext, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../App";
import { dropDown } from "../../../Data";

export function DropDowns(props) {
  const appContext = useContext(AppContext);

  /* to navigate to the path clicked by user */
  const navigate = useNavigate();

  /* to close the dropdown on clicking outside */
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        props.setIsDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  return (
    <div onClick={() => {}} className="user-selected" ref={menuRef}>
      {dropDown.map((item) => (
        <div
          onClick={() => {
            props.setIsDropDownOpen(false);
            navigate(item.path);
            item.name === "Day"
              ? appContext.setGet(true)
              : appContext.setGet(false);
          }}
        >
          <div>{item.name}</div>
          <div style={{color: "grey"}}>{item.keyword}</div>
        </div>
      ))}
    </div>
  );
}
