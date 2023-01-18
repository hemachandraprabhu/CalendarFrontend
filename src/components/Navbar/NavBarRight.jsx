import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import profile from "../../assets/profile.jpg";
import { dropDown } from "../../Data";
import DropDowns from "./DropDowns";

function NavBarRight(props) {
  /* to toggle the dropdown on clicking the button */
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  /* to close the dropdown on clicking outside */
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsDropDownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  });

  return (
    <div className="right">
      <button
        onClick={() => {
          !isDropDownOpen ? setIsDropDownOpen(true) : setIsDropDownOpen(false);
        }}
      >
        {props.userPicked === "Day" ? "Day" : "Month"}
        <IoMdArrowDropdown className="down-icon" />
      </button>

      {isDropDownOpen && (
        <div onClick={() => {}} className="user-selected" ref={menuRef}>
          {dropDown.map((item, index) => (
            <DropDowns
              item={item}
              key={index}
              setIsDropDownOpen={setIsDropDownOpen}
            />
          ))}
        </div>
      )}

      <div className="profile">
        <img src={profile} alt="avatar.jpg" className="profile-image" />
        <span className="profile-hide">Hemachandra Prabhu</span>
      </div>
    </div>
  );
}

export default NavBarRight;
