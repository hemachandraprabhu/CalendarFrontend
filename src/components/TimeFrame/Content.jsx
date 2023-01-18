import React, {useContext} from "react";
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
        }}
      >
        {props.item.appointment} (
        {moment(props.item.startDate).format("h:mm a ")}-
        {moment(props.item.endDate).format(" h:mm a")})
      </span>
    </div>
  );
}

export default Content;
