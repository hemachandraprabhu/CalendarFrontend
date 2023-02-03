import React, { useContext } from "react";
import moment from "moment";
import { WidgetContext } from "../Widget";

/**
 * @param  {} props
 * props contains the event details for the choosen date
 */

function Content(props) {
  const widgetContext = useContext(WidgetContext);
  return (
    <div
      onClick={() => {
        widgetContext.setEventDetails(props.item);
        widgetContext.setIsDetailsModalOpen(true);
      }}
      className="content"
      style={{
        height:
        //1hr = 3.6ms/59e3 = 61.01..
          Math.floor(
            moment(props.item.endDate) - moment(props.item.startDate)
          ) / 59e3,
        marginTop: Math.floor(props.item.startDate.split(":")[1]),
        minHeight: "10px",
      }}
    >
      <span
        style={{
          fontSize:
            Math.floor(
              moment(props.item.endDate) - moment(props.item.startDate)
            ) /
              59e3 <=
            11
              ? "8px"
              : "small",
          width: "100%",
          display: "flex",
        }}
      >
        <span className="content-name">{props.item.appointment} </span>
        <span className="content-time">
          ({moment(props.item.startDate).format("h:mma ")}-
          {moment(props.item.endDate).format(" h:mma")})
        </span>
      </span>
    </div>
  );
}

export default Content;
