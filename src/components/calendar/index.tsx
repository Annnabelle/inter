import {
  Calendar as BigCalendar,
  momentLocalizer,
  View,
  Formats,
} from "react-big-calendar";
import moment from "moment-timezone";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { RetrieveEventsCalendar, RetrieveEventById, DeleteEvent } from "../../store/eventsCalendar";
import { getDateRange } from "./getRange";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import CalendarEvent from "./calendarEvent";
import RetrieveEventModal from "../events/retrieveEvent";
import EditEventModal from "../events/editEvent";
import ModalWindow from "../modalWindow";
import Button from "../button";
import 'moment/locale/ru';
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("ru");

const localizer = momentLocalizer(moment);

// const customFormats: Partial<Formats> = {
//   timeGutterFormat: "HH:mm",
//   eventTimeRangeFormat: (range, culture, localizer) => {
//     if (!localizer) return "";
//     return `${localizer.format(range.start, "HH:mm", culture)} — ${localizer.format(range.end, "HH:mm", culture)}`;
//   },
// };

const CalendarComponent = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const eventsCalendar = useAppSelector((state) => state.eventsCalendar.eventsCalendar);
  const selectedEventData = useAppSelector((state) => state.eventsCalendar.selectedEvent);


  useEffect(() => {
    const lang = i18n.language;
    moment.locale(lang === 'uz' ? 'uz-latn' : lang === 'en' ? 'en-gb' : 'ru');
  }, [i18n.language]);


  const [date, setDate] = useState(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(
    moment.tz("Asia/Tashkent").toDate()
  );
  const [currentView, setCurrentView] = useState<View>("month");
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [modalState, setModalState] = useState({
    retrieveEvents: false,
    editEvent: false,
    deleteEvent: false,
  });

  const handleModal = (modalName: string, value: boolean) => {
    setModalState((prev) => ({ ...prev, [modalName]: value }));
  };

  const handleEditOpen = () => {
    setModalState((prev) => ({
      ...prev,
      retrieveEvents: false,
    }));
    setTimeout(() => {
      setModalState((prev) => ({ ...prev, editEvent: true }));
    }, 10);
  };

  const handleDeleteOpen = () => {
    setModalState((prev) => ({
      ...prev,
      editEvent: false,
    }));
    setTimeout(() => {
      setModalState((prev) => ({ ...prev, deleteEvent: true }));
    }, 10);
  };

  const dateRange = useMemo(
    () => getDateRange(currentDate, currentView),
    [currentDate, currentView]
  );

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      dispatch(
        RetrieveEventsCalendar({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        })
      );
    }
  }, [dispatch, dateRange.startDate, dateRange.endDate]);

  useEffect(() => {
    if (eventsCalendar.length > 0) {
      const updatedEvents = eventsCalendar.flatMap((ev) => {
        const originalStart = moment.utc(ev.startDate);
        const originalEnd = moment.utc(ev.endDate);
        const start = originalStart.clone().tz("Asia/Tashkent").startOf("day");
        const end = originalEnd.clone().tz("Asia/Tashkent").endOf("day");
        const daysCount = end.diff(start, "days") + 1;

        if (daysCount === 1) {
          return [{
            id: `${ev.id}`,
            originalId: ev.id,
            title: ev.name,
            start: originalStart.clone().tz("Asia/Tashkent").toDate(),
            end: originalEnd.clone().tz("Asia/Tashkent").toDate(),
            comment: ev.comment ?? "",
            eventType: ev.eventType,
          }];
        }

        const eventsByDay = [];
        for (let i = 0; i < daysCount; i++) {
          const currentDay = start.clone().add(i, "days");
          const isFirstDay = i === 0;
          const isLastDay = i === daysCount - 1;

          const eventStart = isFirstDay
            ? originalStart.clone().tz("Asia/Tashkent")
            : currentDay.clone().startOf("day");

          const eventEnd = isLastDay
            ? originalEnd.clone().tz("Asia/Tashkent")
            : currentDay.clone().endOf("day");

          eventsByDay.push({
            id: `${ev.id}-day-${i + 1}`,
            originalId: ev.id,
            title: `${ev.name} • День ${i + 1}`,
            start: eventStart.toDate(),
            end: eventEnd.toDate(),
            comment: ev.comment ?? "",
            eventType: ev.eventType,
          });
        }

        return eventsByDay;
      });

      setEvents(updatedEvents);
    }
  }, [eventsCalendar]);

  const handleSelectEvent = (event: any) => {
    const eventId = event.originalId || event.id;
    setSelectedEventId(eventId);
    dispatch(RetrieveEventById(eventId)).then(() => {
      handleModal("retrieveEvents", true);
    });
  };

const getDateRangeLabel = () => {
  const start = moment.tz(dateRange.startDate, "Asia/Tashkent").format("DD.MM.YYYY");
  const end = moment.tz(dateRange.endDate, "Asia/Tashkent").format("DD.MM.YYYY");

  return t("calendar.dateRangeLabel", { start, end });
};




  const eventById = selectedEventData?.event

  const handleDeleteEvent = async () => {
    if (!selectedEventId) return;

    try {
      const resultAction = await dispatch(DeleteEvent(selectedEventId));

      if (DeleteEvent.fulfilled.match(resultAction)) {
        toast.success(t('messages.eventDeleted'));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error(t('messages.eventDeleteError'));
      }
    } catch (error) {
      toast.error(t('messages.eventDeleteError'));
    }
  };


  const customMessages = {
    today: t("calendar.today"),
    previous: t("calendar.previous"),
    next: t("calendar.next"),
    month: t("calendar.month"),
    week: t("calendar.week"),
    day: t("calendar.day"),
    date: t("calendar.date"),
    time: t("calendar.time"),
    event: t("calendar.event"),
    noEventsInRange: t("calendar.noEventsInRange"),
    showMore: (total: number) => `+ еще ${total}`,
    weekdays: [
      t("calendar.sunday"),
      t("calendar.monday"),
      t("calendar.tuesday"),
      t("calendar.wednesday"),
      t("calendar.thursday"),
      t("calendar.friday"),
      t("calendar.saturday"),
    ],
  };

  const customFormats: Partial<Formats> = {
  timeGutterFormat: "HH:mm",
  weekdayFormat: (date, culture, localizer) => {
    const dayIndex = moment(date).day(); 
    return customMessages.weekdays?.[dayIndex] ?? localizer?.format(date, "ddd", culture);
  },
  eventTimeRangeFormat: (range, culture, localizer) => {
    if (!localizer) return "";
    return `${localizer.format(range.start, "HH:mm", culture)} — ${localizer.format(range.end, "HH:mm", culture)}`;
  },
};


  return (
    <div className="events">
      <div className="events-heading">
        <div className="events-heading-goto-content">
          <h2 className="date">{getDateRangeLabel()}</h2>
        </div>
      </div>

      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        messages={customMessages}
        style={{ height: "100vh", background: "white", marginTop: "100px" }}
        views={["month", "week", "day"]}
        onNavigate={(date) => {
          const tzDate = moment.tz(date, "Asia/Tashkent").toDate();
          setCurrentDate(tzDate);
          setDate(tzDate);
        }}
        defaultView="week"
        onView={(view) => setCurrentView(view)}
        view={currentView}
        date={date}
        components={{ event: CalendarEvent }}
        formats={customFormats}
        min={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 7, 0)}
        max={new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 0)}
        step={30}
        timeslots={1}
        onSelectEvent={handleSelectEvent}
      />

      <RetrieveEventModal
        selectedEvent={eventById ? eventById : null}
        isOpen={modalState.retrieveEvents}
        onClose={() => handleModal("retrieveEvents", false)}
        onEdit={handleEditOpen}
      />
      <EditEventModal
        selectedEvent={eventById ? eventById : null}
        isOpen={modalState.editEvent}
        onClose={() => handleModal("editEvent", false)}
        onDelete={handleDeleteOpen}
      />
      <ModalWindow openModal={modalState.deleteEvent} title={`${t('titles.areYouSure')} ${t('crudNames.event')} ?`} className="modal-tight" closeModal={() => handleModal('deleteExpert', false)}>
        <div className="modal-tight-container">
            <Button onClick={() => handleModal('deleteEvent', false)} className="outline">{t('buttons.cancel')}</Button>
            <Button onClick={() => handleDeleteEvent()} className="danger">{t('buttons.delete')}</Button>
        </div>
      </ModalWindow>
    </div>
  );
};

export default CalendarComponent;



