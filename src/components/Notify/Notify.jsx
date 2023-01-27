import React, { useEffect, useState } from "react";
import "./Notify.scss";
import { MdClose } from "react-icons/md";

function Notify(props) {
  const [check, setCheck] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCheck(true);
    }, 3500);
  }, []);

  if (check === true) {
    setTimeout(() => {
      props.setNotify({ toggle: false, message: "" });
      setCheck(false);
    }, 400);
  }

  return (
    <>
      <div className="notify-overlay-styles" onClick={() => setCheck(true)} />
      <div className={`notify-body ${check && "hide-notify-body"}`}>
        <div className="notify-message">
          {props.message}
          <MdClose
            className="notify-close"
            onClick={() => setCheck(true)}
            size={18}
          />
        </div>
      </div>
    </>
  );
}

export default Notify;