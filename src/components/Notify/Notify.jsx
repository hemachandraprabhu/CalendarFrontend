import React, { useState } from "react";
import "./Notify.scss";
import { GrFormClose } from "react-icons/gr";
import {MdClose} from "react-icons/md"

function Notify(props) {
  const [name, setName] = useState("notify-body");
  function handleClick() {
    setName("hide-notify-body");
    props.setNotify({ toggle: false, message: "" });
  }
  return (
    <>
      <div className="notify-overlay-styles" onClick={handleClick} />
      <div className={name}>
        <div className="notify-message">
          {props.message}
          <MdClose
            className="notify-close"
            onClick={handleClick}
            size={18}
          />
        </div>
      </div>
    </>
  );
}

export default Notify;
