import React, { useContext } from "react";
import { WidgetContext } from "../../Widget";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function DayCellDate({ date }) {
  const widgetContext = useContext(WidgetContext);
  const navigate = useNavigate();

  return (
    <div className="day-cell-date">
      <span
        onClick={(e) => {
          e.stopPropagation();
          widgetContext.setDate(date);
          navigate("/");
        }}
        className={`normal-date ${
          moment(date).format("YYYY MMMM D") ===
            moment().format("YYYY MMMM D") && "add-color"
        } ${
          moment(date).format("YYYY MMMM") !==
            moment(widgetContext.date).format("YYYY MMMM") && "grey-color"
        }`}
      >
        {date.getDate()}
      </span>
    </div>
  );
}

export default DayCellDate;
