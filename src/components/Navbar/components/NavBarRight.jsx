import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import profile from "../../../assets/profile.jpg";
import { DropDowns } from "./DropDowns";

export function NavBarRight(props) {
  /* to toggle the dropdown on clicking the button */
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  return (
    <div className="right">
      <button
        onClick={() => {
          !isDropDownOpen ? setIsDropDownOpen(true) : setIsDropDownOpen(false);
        }}
      >
        {props.userPicked}
        <IoMdArrowDropdown className="down-icon" />
      </button>

      {isDropDownOpen && (
        <DropDowns setIsDropDownOpen={setIsDropDownOpen}></DropDowns>
      )}

      <div className="profile">
        <img src={profile} alt="avatar.jpg" className="profile-image" />
        <span className="profile-hide">Hemachandra Prabhu</span>
      </div>
    </div>
  );
}
