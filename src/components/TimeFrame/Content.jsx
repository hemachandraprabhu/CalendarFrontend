import React, { useContext } from "react";
import moment from "moment";
import { AppContext } from "../../App";

/**
 * @param  {} props
 * props contains the event details for the choosen date
 */

function Content(props) {
  const appContext = useContext(AppContext);
  return (
    <div
      onClick={() => {
        appContext.setEventDetails(props.item);
        appContext.setIsDetailsModalOpen(true);
      }}
      className="content"
      style={{
        height:
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
              ? "10px"
              : "small",
          width: "100%",
          display: "flex"
        }}
      >
        <span style={{width: "87%", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden"}}>{props.item.appointment} </span>
        <span style={{width: "13%", textAlign: "right"}}>
          ({moment(props.item.startDate).format("h:mma ")}-
          {moment(props.item.endDate).format(" h:mma")})
        </span>
      </span>
    </div>
  );
}

export default Content;
