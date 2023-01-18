import React from "react";
import { useNavigate } from "react-router-dom";

function DropDowns(props) {
  /* to navigate to the path clicked by user */
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        props.setIsDropDownOpen(false);
        navigate(props.item.path);
      }}
    >
      <div>{props.item.name}</div>
      <div style={{ color: "grey" }}>{props.item.keyword}</div>
    </div>
  );
}

export default DropDowns;
