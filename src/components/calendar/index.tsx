import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, addDays, subDays } from "date-fns";
import { CalendarComponentProps, EventType } from "../../types/events";
import { ru } from "date-fns/locale";
import ModalWindow from "../modalWindow";
import AddEventForm from "../events/addEvent";
import Button from "../button";
import RetrieveEvent from "../events/retrieveEvent";
import EditEvent from "../events/editEvent";
import CalendarEventStyle from "./calendarEventStyle";
import CalendarEvent from "./calendarEvent";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.sass";
import { useTranslation } from "react-i18next";

const locales = { ru };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const initialEvents: EventType[] = [
  {
    title: "Совещание",
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 11, 0),
    allDay: false,
    organizer: "Иван Иванов",
    eventType: "Совещание",
    countOfMembers: "5",
    partnersOptions: "Партнеры X",
    donorFormat: "Формат A",
  },
];

const CalendarComponent: React.FC<CalendarComponentProps> = (props) => {
    const { t } = useTranslation();
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  // const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("month");
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [eventModalOpen, setEventModalOpen] = useState<boolean>(false);
  const [editEventModalOpen, setEditEventModalOpen] = useState<boolean>(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
  const handleSelectEvent = (event: EventType) => {
    setSelectedEvent(event);
    setEventModalOpen(true);
  };

  // const handleAddEvent = () => {
  //   form
  //     .validateFields()
  //     .then((values) => {
  //       const newEvent: EventType = {
  //         title: values.eventName,
  //         start: values.date[0].toDate(),
  //         end: values.date[1].toDate(),
  //         allDay: false,
  //         organizer: values.organizer,
  //         eventType: values.eventType,
  //         countOfMembers: values.countOfMembers,
  //         partnersOptions: values.partnersOptions,
  //         donorFormat: values.donorFormat,
  //       };
  //       setEvents([...events, newEvent]);
  //       props?.closeEventModal();
  //     })
  //     .catch((errorInfo) => console.log("Validation Failed:", errorInfo));
  // };
  

  const goToToday = () => setCurrentDate(new Date());
  const goToNext = () =>
    setCurrentDate(addDays(currentDate, view === "month" ? 30 : view === "week" ? 7 : 1));
  const goToPrev = () =>
    setCurrentDate(subDays(currentDate, view === "month" ? 30 : view === "week" ? 7 : 1));

  const eventDetails = selectedEvent
  ? {
      title: selectedEvent.title,
      start: selectedEvent.start ? format(selectedEvent.start, "dd.MM.yyyy HH:mm") : "Не указано",
      end: selectedEvent.end ? format(selectedEvent.end, "dd.MM.yyyy HH:mm") : "Не указано",
      organizer: selectedEvent.organizer || "Не указан",
      eventType: selectedEvent.eventType || "Не указан",
      countOfMembers: selectedEvent.countOfMembers ?? 0,
      partnersOptions: selectedEvent.partnersOptions || "Не указано",
      donorFormat: selectedEvent.donorFormat || "Не указано",
    }
  : null;
  
  return (
    <div className="events">
      <div className="events-heading">
        <div className="events-heading-goto">
          <div className="events-heading-goto-content">
            <h2 className="date">January 26 - February 01</h2>
          </div>
          <div className="events-heading-goto-content">
            <div className="events-heading-goto-content-btn" onClick={goToPrev}>
              <p className="text">{t('buttons.back')}</p>
            </div>
            <div className="events-heading-goto-content-btn" onClick={goToToday}>
              <p className="text">{t('buttons.today')}</p>
            </div>
            <div className="events-heading-goto-content-btn" onClick={goToNext}>
              <p className="text">{t('buttons.forward')}</p>
            </div>
          </div>
        </div>
        <div className="events-heading-btns">
          <div className="events-heading-btns-container">
            <Button className="outline" onClick={() => setView("month")}>{t('buttons.month')}</Button>
            <Button className="outline" onClick={() => setView("week")}>{t('buttons.week')}</Button>
            <Button className="outline" onClick={() => setView("day")}>{t('buttons.day')}</Button>
          </div>
        </div>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        view={view}
        onView={(newView) => setView(newView)}
        style={{ height: "100vh", background: "white" }}
        toolbar={false}
        eventPropGetter={CalendarEventStyle}
        onSelectEvent={handleSelectEvent}
        components={{
          event: CalendarEvent,
        }}
      />

      <ModalWindow
        title={`${t('buttons.create')}` + " " 
        +  `${t("crudNames.event")}`}
        openModal={props?.openEventModal}
        closeModal={props?.closeEventModal}
      >
        <AddEventForm handleAddEvent={(values) => {
          const newEvent: EventType = {
            title: values.eventName,
            start: values.date[0].toDate(),
            end: values.date[1].toDate(),
            allDay: false,
            organizer: values.organizer,
            eventType: values.eventType,
            countOfMembers: String(values.countOfMembers),
            partnersOptions: values.partnersOptions,
            donorFormat: values.donorFormat,
          };          
          setEvents([...events, newEvent]);
          props?.closeEventModal();
        }} />
      </ModalWindow>
      <ModalWindow
        title={`${t('buttons.retrieve')}` + " " 
        +  `${t("crudNames.event")}`}
        openModal={eventModalOpen}
        closeModal={() => setEventModalOpen(false)}
        handleEdit={() => {
          setEventModalOpen(false);
          setTimeout(() => setEditEventModalOpen(true), 100);
        }}
      >
        {selectedEvent && (
          eventDetails && (
            <RetrieveEvent event={eventDetails} />
          )
        )}
      </ModalWindow>
      <ModalWindow
          title={`${t('buttons.edit')}` + " " 
          +  `${t("crudNames.event")}`}
          openModal={editEventModalOpen}
          closeModal={() => setEditEventModalOpen(false)}
          handleDelete={() => {  setTimeout(() => setDeleteModalOpen(true), 0);
            setDeleteModalOpen(true)}}
        >
          {selectedEvent && (
            <EditEvent
              initialValues={selectedEvent}
              handleAddEvent={(values) => {
                const updatedEvent: EventType = {
                  ...selectedEvent,
                  title: values.eventName,
                  start: values.date[0].toDate(),
                  end: values.date[1].toDate(),
                  organizer: values.organizer,
                  eventType: values.eventType,
                  countOfMembers: String(values.countOfMembers),
                  partnersOptions: values.partnersOptions,
                  donorFormat: values.donorFormat,
                };
                setEvents(events.map((ev) => (ev === selectedEvent ? updatedEvent : ev)));
                setEditEventModalOpen(false);
              }}
            />
          )}
        </ModalWindow>
          <ModalWindow openModal={isDeleteModalOpen} title={`${t('titles.areYouSure')} ${t('crudNames.event')} ?`}  className="modal-tight"
            closeModal={() => setDeleteModalOpen(false)}>
              <div className="modal-tight-container">
                <Button onClick={() => setDeleteModalOpen(false)} className="outline">{t('buttons.cancel')}</Button>
                <Button className="danger">{t('buttons.delete')}</Button>
              </div>
          </ModalWindow>
    </div>
  );
};

export default CalendarComponent;




