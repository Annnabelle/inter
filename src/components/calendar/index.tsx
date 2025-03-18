import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { Modal, Input, DatePicker, Form } from "antd";
import { format, parse, startOfWeek, getDay, addDays, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import Button from "../button";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.sass";

const locales = { ru };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type EventType = {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
};

type CalendarComponentProps = {
  addEventModalOpen: boolean;
  closeEventModal: () => void;
};

const initialEvents: EventType[] = [
  {
    title: "Совещание",
    start: new Date(2024, 2, 15, 10, 0),
    end: new Date(2024, 2, 15, 11, 0),
    allDay: false,
  },
];

const CalendarComponent: React.FC<CalendarComponentProps> = ({ addEventModalOpen, closeEventModal }) => {
  const [events, setEvents] = useState<EventType[]>(initialEvents);
  const [form] = Form.useForm();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [view, setView] = useState<View>("month");

  const handleAddEvent = () => {
    form
      .validateFields()
      .then((values) => {
        const newEvent: EventType = {
          title: values.title,
          start: values.date[0].toDate(),
          end: values.date[1].toDate(),
          allDay: false,
        };
        setEvents([...events, newEvent]);
        closeEventModal();
      })
      .catch((errorInfo) => console.log("Validation Failed:", errorInfo));
  };

  const goToToday = () => setCurrentDate(new Date());
  const goToNext = () => setCurrentDate(addDays(currentDate, view === "month" ? 30 : view === "week" ? 7 : 1));
  const goToPrev = () => setCurrentDate(subDays(currentDate, view === "month" ? 30 : view === "week" ? 7 : 1));

  return (
    <div className="events">
      <div className="events-heading">
        <div className="events-heading-goto">
          <div className="events-heading-goto-content">
            <h2 className="date">January 26 - February 01</h2>
          </div>
          <div className="events-heading-goto-content">
            <div className="events-heading-goto-content-btn" onClick={goToPrev}>
              <p className="text">Назад</p>
            </div>
            <div className="events-heading-goto-content-btn" onClick={goToToday}>
              <p className="text">Сегодня</p>
            </div>
            <div className="events-heading-goto-content-btn" onClick={goToNext}>
              <p className="text">Вперёд</p>
            </div>
          </div>
        </div>
        <div className="events-heading-btns">
          <div className="events-heading-btns-container">
            <Button className="outline" onClick={() => setView("month")}>Месяц</Button>
            <Button className="outline" onClick={() => setView("week")}>Неделя</Button>
            <Button className="outline" onClick={() => setView("day")}>День</Button>
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
        style={{ height: "100%", background: "white" }}
        toolbar={false}
      />

      <Modal
        title="Добавить событие"
        open={addEventModalOpen}
        onCancel={closeEventModal}
        onOk={handleAddEvent}
        okText="Добавить"
        cancelText="Отмена"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Создание мероприятия"
            rules={[{ required: true, message: "Введите название события" }]}
          >
            <Input placeholder="Введите название" />
          </Form.Item>

          <Form.Item
            name="date"
            label="Выберите дату и время"
            rules={[{ required: true, message: "Выберите дату и время" }]}
          >
            <DatePicker.RangePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              defaultValue={[dayjs(), dayjs().add(1, "hour")]}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CalendarComponent;


