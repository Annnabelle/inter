import React from "react";
import { EventProps } from "react-big-calendar";
import { IoMdTime } from "react-icons/io";
import { Event } from "../../types/events";
import moment from "moment-timezone";
import './styles.sass'

const CalendarEvent: React.FC<EventProps> = ({ event }) => {
  const myEvent = event as Event;

  const startTime = moment(event.start).tz("Asia/Tashkent").format("HH:mm");
  const endTime = moment(event.end).tz("Asia/Tashkent").format("HH:mm");

  let iconColor = '#F8E71C';
  let borderColor = '#F8E71C';
  let backgroundColor = '#FCF7E8'

    if (myEvent.eventType === 'birthday') {
      iconColor = '#F8E71C',
      backgroundColor = '#FCF7E8',
      borderColor= '#F8E71C'
    } else if (myEvent.eventType === 'foreign') {
      iconColor = '#035703',
      backgroundColor = '#CDFFCD',
      borderColor = '#035703'
    }  else if (myEvent.eventType === 'delegations'){
      iconColor = '#035703',
      backgroundColor = '#CDFFCD',
      borderColor = '#035703'
    } else if (myEvent.eventType === 'conference'){
      iconColor = '#046BD1',
      backgroundColor = '#ADE0FF',
      borderColor = '#046BD1'
    } else if (myEvent.eventType === 'diplomatic'){
      iconColor = '#046BD1',
      backgroundColor = '#ADE0FF',
      borderColor = '#046BD1'
    } else if (myEvent.eventType === 'meeting'){
      iconColor = '#8A59D6',
      backgroundColor = '#EBDCFC',
      borderColor = '#8A59D6'
    } else if (myEvent.eventType === 'personal'){
      iconColor = '#8A59D6',
      backgroundColor = '#EBDCFC',
      borderColor = '#8A59D6'
    } else if (myEvent.eventType === 'seminar'){
      iconColor = '#6C7B8A',
      backgroundColor = '#E5E5E5',
      borderColor = '#6C7B8A'
    } else if (myEvent.eventType === 'significant'){
      iconColor = '#6C7B8A',
      backgroundColor = '#E5E5E5',
      borderColor = '#6C7B8A'
    }
  

  return (
    <div className="rbc-event-content event-box" style={{
             borderColor: borderColor,
             backgroundColor: backgroundColor,
             padding: '5px',
             borderRadius: '6px',
           }}>
      <div className="event-box-icon">
        <IoMdTime className="icon" style={{ color: iconColor }} />
      </div>
      <div className="event-box-content">
        <span className="title">{event.title}</span>
        <p className="event-type">{myEvent.eventType}</p>
        <p className="text">{myEvent.comment}</p>
        <p className="text">{startTime} - {endTime}</p>
      </div>
    </div>
  );
};

export default CalendarEvent
