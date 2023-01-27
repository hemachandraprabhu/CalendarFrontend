import React, {createContext} from "react";
import moment from "moment";
import { IoCalendarClearOutline } from "react-icons/io5";
import MiniCalendar from "../MiniCalendar/MiniCalendar";
import Time from "./Time";

export const TimeSelectorContext = createContext()

export function ModalBody(props) {
  return (
    <div className="modal-body">
      <div className="title" tabIndex={0}>
        <input
          type="text"
          placeholder="Title"
          className="title-input"
          value={props.event.title}
          onChange={(e) =>
            props.setEvent((prev) => {
              return { ...prev, title: e.target.value };
            })
          }
        />
      </div>

      <div className="date-time">
        <div className="date">
          <div className="text-date">Date</div>
          <div className="choose-date" tabIndex={0}>
            <div className="selected-date">
              {moment(props.event.eventDate).format("dddd, D MMM YYYY")}
            </div>
            <IoCalendarClearOutline
              className="io-cal"
              onClick={() => props.setIsCalendarOpen(!props.isCalendarOpen)}
            />
            {props.isCalendarOpen && (
              <div ref={props.modalRef} className="date-cal">
                <MiniCalendar
                  setIsCalendarOpen={props.setIsCalendarOpen}
                  userPicked={props.userPicked}
                  setEvent={props.setEvent}
                  width="300px"
                  dateWidth="40px"
                />
              </div>
            )}
          </div>
        </div>

        <div className="time">
          <Time
            time="Start time"//diff
            eventTime={props.event.startTime}//diff
            setEvent={props.setEvent}
            setIsTimeSelectorOpen={props.setIsTimeSelectorOpen}
            timeSelector={props.isTimeSelectorOpen.startTimeSelector}//diff
            modalRef={props.modalRef}
            event={props.event}
            setIsTimeValid={props.setIsTimeValid}
          />
          <Time
            time="End time"
            eventTime={props.event.endTime}
            setEvent={props.setEvent}
            setIsTimeSelectorOpen={props.setIsTimeSelectorOpen}
            timeSelector={props.isTimeSelectorOpen.endTimeSelector}
            modalRef={props.modalRef}
            event={props.event}
            setIsTimeValid={props.setIsTimeValid}
          />
        </div>
      </div>
    </div>
  );
}
