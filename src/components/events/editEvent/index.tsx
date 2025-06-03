import React, { useEffect } from "react";
import ModalWindow from "../../modalWindow";
import { ApprovalsDto, Event, EventType, UpdateEvent } from "../../../types/events";
import { DatePicker, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import FormComponent from "../../form";
import BirthdayAdditionalFieldsEdit from "./birthdayAdditionalFieldsEdit";
import ConferenceAdditionalFieldsEdit from "./conferenceAdditionalFieldsEdit";
import DelegationAdditionalFieldsEdit from "./delegationAdditionalFieldsEdit";
import DiplomaticAdditionalFieldsEdit from "./diplomaticAdditionalFieldsEdit";
import ForeignAdditionalFieldsEdit from "./foreignAdditionalFieldsEdit";
import MeetingAdditionalFieldsEdit from "./meetingAdditionalFieldsEdit";
import SeminarAdditionalFieldsEdit from "./seminarAdditionalFieldsEdit";
import Button from "../../button";
import dayjs from "dayjs";
import { useAppDispatch } from "../../../store";
import { UpdateEventCalendar } from "../../../store/eventsCalendar";

interface RetrieveEventModalProps {
  selectedEvent: UpdateEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}


const EditEventFieldsStrategyModal: Partial<
  Record<EventType, React.FC<{ event: Event; form: any }>>
> = {
  [EventType.Birthday]: BirthdayAdditionalFieldsEdit,
  [EventType.Conference]: ConferenceAdditionalFieldsEdit,
  [EventType.Delegations]: DelegationAdditionalFieldsEdit,
  [EventType.Diplomatic]: DiplomaticAdditionalFieldsEdit,
  [EventType.Foreign]: ForeignAdditionalFieldsEdit,
  [EventType.Meeting]: MeetingAdditionalFieldsEdit,
  [EventType.Seminar]: SeminarAdditionalFieldsEdit,
};

const EventTypeFields: React.FC<{ event: Event; form: any }> = ({ event, form }) => {
  const Component = EditEventFieldsStrategyModal[event.eventType];
  return Component ? <Component event={event} form={form} /> : null;
};

const EditEventModal: React.FC<RetrieveEventModalProps> = ({
  selectedEvent,
  isOpen,
  onClose,
  onDelete,
}) => {
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedEvent) {
      form.setFieldsValue({
        eventType: selectedEvent.eventType,
        name: selectedEvent.name || "",
        comment: selectedEvent.comment || "",
        startDate: dayjs(selectedEvent.startDate),
        endDate: dayjs(selectedEvent.endDate),
      });
    }
  }, [selectedEvent, form]);

const handleUpdateEvent = async (values: any) => {
  try {
    let formattedApprovals: Record<string, any> = {}; // Initialize as an empty object

    if (values.approvals) {
      Object.entries(values.approvals).forEach(([key, approval]: [string, any]) => {
        const status = approval.status;

        if (status === "none") {
          formattedApprovals[key] = { status: "none" };
        } else {
          formattedApprovals[key] = {
            status,
            ...(status !== "none" && approval.request ? { request: approval.request } : {}),
            ...(status === "approved" && approval.response ? { response: approval.response } : {}),
          };
        }
      });
    }

    const updatedData = {
      ...values,
      id: selectedEvent?.id,
      startDate: values.startDate?.toISOString(),
      endDate: values.endDate?.toISOString(),
      approvals: formattedApprovals, // No longer checking if it's null
    };

    const resultAction = await dispatch(UpdateEventCalendar(updatedData));

    if (UpdateEventCalendar.fulfilled.match(resultAction)) {
      toast.success("Мероприятие успешно обновлено");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } else {
      toast.error("Ошибка при обновлении мероприятия");
    }
  } catch (err) {
    console.error("Ошибка в handleUpdateEvent:", err);
    toast.error((err as string) || "Ошибка сервера");
  }
};
  if (!selectedEvent) return null;

  return (
    <ModalWindow
      openModal={isOpen}
      closeModal={onClose}
      title="Информация о событии"
      handleDelete={onDelete}
    >
      <FormComponent formProps={form} onFinish={handleUpdateEvent}>
        <div className="form-inputs">
          <Form.Item name="eventType" className="input">
            <Select className="input" size="large" disabled>
              <Select.Option value={selectedEvent.eventType}>
                {selectedEvent.eventType}
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="name" className="input">
            <Input className="input" size="large" placeholder="Название события" />
          </Form.Item>
        </div>

        <div className="form-inputs">
          <Form.Item name="startDate" className="input">
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              size="large"
              className="input"
              placeholder="Дата начала"
            />
          </Form.Item>

          <Form.Item name="endDate" className="input">
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              size="large"
              className="input"
              placeholder="Дата окончания"
            />
          </Form.Item>
        </div>

        <div className="form-inputs">
          <Form.Item name="comment" className="input">
            <Input className="input" size="large" placeholder="Комментарий" />
          </Form.Item>
        </div>

        <EventTypeFields event={selectedEvent} form={form} />

        <Button type="submit">{t("buttons.edit")}</Button>
      </FormComponent>
    </ModalWindow>
  );
};

export default EditEventModal;




