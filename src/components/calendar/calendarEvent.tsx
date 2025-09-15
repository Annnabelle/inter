import React from "react";
import { EventProps } from "react-big-calendar";
import { IoMdTime } from "react-icons/io";
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

// маппинг локализованных значений → ключей
const eventTypeMap: Record<string, string> = {
  // birthday
  "Дни рождения": "birthday",
  "Tug‘ilgan kunlar": "birthday",
  Birthday: "birthday",

  // foreign
  "Зарубежные": "foreign",
  Chet: "foreign",
  Foreign: "foreign",

  // delegations
  "Делегации": "delegations",
  Delegations: "delegations",

  // conference
  "Конференции": "conference",
  Konferensiyalar: "conference",
  Conference: "conference",

  // diplomatic
  "Дипломатические": "diplomatic",
  Diplomatik: "diplomatic",
  Diplomatic: "diplomatic",

  // meeting
  "Встречи": "meeting",
  Uchrashuvlar: "meeting",
  Meeting: "meeting",

  // personal
  "Личные": "personal",
  Shaxsiy: "personal",
  Personal: "personal",

  // seminar
  "Семинары": "seminar",
  Seminarlar: "seminar",
  Seminar: "seminar",

  // significant
  "Значимые": "significant",
  Muhim: "significant",
  Significant: "significant",
};

const CalendarEvent: React.FC<EventProps> = ({ event }) => {
  const { t } = useTranslation();
  const myEvent = event as Event;

  const startTime = moment(event.start).tz("Asia/Tashkent").format("HH:mm");
  const endTime = moment(event.end).tz("Asia/Tashkent").format("HH:mm");

  // приводим локализованный eventType к ключу
  const normalizedType = eventTypeMap[myEvent.eventType] ?? "default";

  // берём стили по ключу
  const style =
    eventStyles[normalizedType] || {
      iconColor: "#6C7B8A",
      backgroundColor: "#E5E5E5",
      borderColor: "#6C7B8A",
    };

  return (
    <div
      className="rbc-event-content event-box"
      style={{
        borderColor: style.borderColor,
        backgroundColor: style.backgroundColor,
        padding: "5px",
        borderRadius: "6px",
      }}
    >
      <div className="event-box-icon">
        <IoMdTime className="icon" style={{ color: style.iconColor }} />
      </div>
      <div className="event-box-content">
        <span className="title">{event.title}</span>
        {/* отображаем перевод через ключ */}
        <p className="event-type">{t(`eventTypes.${normalizedType}`)}</p>
        <p className="text">{myEvent.comment}</p>
        <p className="text">
          {startTime} - {endTime}
        </p>
      </div>
    </div>
  );
};

export default CalendarEvent;


