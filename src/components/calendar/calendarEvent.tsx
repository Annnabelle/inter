import React from "react";
import { EventProps } from "react-big-calendar";
import { IoMdTime } from "react-icons/io";
import moment from "moment";
import './styles.sass'

const CalendarEvent: React.FC<EventProps> = ({ event }) => {
    const hour = moment(event.start).hour();
      let iconColor;
      if (hour < 12) {
        iconColor = "rgba(146, 84, 222, 1)";
      } else if (hour < 16) {
        iconColor = "rgb(246, 198, 95)";
      } else {
        iconColor = "rgb(73, 133, 253)";
      }
      const startTime = event?.start?.toLocaleTimeString("ru-Ru", {
        hour: "2-digit",
        minute: "2-digit"
      })

      const endTime = event?.end?.toLocaleTimeString("ru-Ru", {
        hour: "2-digit",
        minute: "2-digit"
      })
      
  return (
    <div className="event-box">
        <div className="event-box-icon">
            <IoMdTime className="icon" style={{ color: iconColor }} /> 
        </div>
        <div className="event-box-content">
            <span className="title">{event.title}</span> 
            <p className="text">{startTime} - {endTime}</p>
        </div>
    </div>
  );
};

export default CalendarEvent;