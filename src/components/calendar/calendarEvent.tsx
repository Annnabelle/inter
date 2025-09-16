import React from "react";
import { EventProps } from "react-big-calendar";
import { Event } from "../../types/events";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import "./styles.sass";

// стили для каждого eventType
const eventStyles: Record<
  string,
  { iconColor: string; backgroundColor: string; borderColor: string }
> = {
  birthday: {
    iconColor: "#F8E71C",
    backgroundColor: "#FCF7E8",
    borderColor: "#F8E71C",
  },
  foreign: {
    iconColor: "#035703",
    backgroundColor: "#CDFFCD",
    borderColor: "#035703",
  },
  delegations: {
    iconColor: "#035703",
    backgroundColor: "#CDFFCD",
    borderColor: "#035703",
  },
  conference: {
    iconColor: "#046BD1",
    backgroundColor: "#ADE0FF",
    borderColor: "#046BD1",
  },
  diplomatic: {
    iconColor: "#046BD1",
    backgroundColor: "#ADE0FF",
    borderColor: "#046BD1",
  },
  meeting: {
    iconColor: "#8A59D6",
    backgroundColor: "#EBDCFC",
    borderColor: "#8A59D6",
  },
  personal: {
    iconColor: "#8A59D6",
    backgroundColor: "#EBDCFC",
    borderColor: "#8A59D6",
  },
  seminar: {
    iconColor: "#6C7B8A",
    backgroundColor: "#E5E5E5",
    borderColor: "#6C7B8A",
  },
  significant: {
    iconColor: "#6C7B8A",
    backgroundColor: "#E5E5E5",
    borderColor: "#6C7B8A",
  },
};

const CalendarEvent: React.FC<EventProps> = ({ event }) => {
  const { t } = useTranslation();
  const myEvent = event as Event;

  const startTime = moment(event.start).tz("Asia/Tashkent").format("HH:mm");
  const endTime = moment(event.end).tz("Asia/Tashkent").format("HH:mm");

  // вытаскиваем стили для типа
  const style = eventStyles[myEvent.eventType] || {
    iconColor: "#000",
    backgroundColor: "#fff",
    borderColor: "#000",
  };

  return (
    <div
      className="rbc-event-content event-box"
      style={{
        border: `1px solid ${style.borderColor}`,
        backgroundColor: style.backgroundColor,
        padding: "5px",
        borderRadius: "6px",
      }}
    >
      <div className="event-box-content">
        <span className="title">{event.title}</span>
        {/* переводим технический тип */}
        <p className="event-type">{t(`eventTypes.${myEvent.eventType}`)}</p>
        <p className="text">{myEvent.comment}</p>
        <p className="text">
          {startTime} - {endTime}
        </p>
      </div>
    </div>
  );
};

export default CalendarEvent;



