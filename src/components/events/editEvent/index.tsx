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
import { UserRole } from "../../../utils/roles";
import { getUserRole } from "../../../utils/getUserRole";

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
      approvals: formattedApprovals,
    };

    const resultAction = await dispatch(UpdateEventCalendar(updatedData));

    if (UpdateEventCalendar.fulfilled.match(resultAction)) {
      toast.success(t('messages.eventUpdatedSuccess'));
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1000);
    } else {
      toast.error(t('messages.eventUpdateError'));
    }
  } catch (err) {
    toast.error((err as string) || t('messages.serverError'));
  }
};
  if (!selectedEvent) return null;
  const role = getUserRole();
  return (
    <ModalWindow
      openModal={isOpen}
      closeModal={onClose}
      title="Информация о событии"
      {...(role !== UserRole.JUNIOR_INTL_OFFICER ? { handleDelete: onDelete } : {})}
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
              placeholder={t('inputs.startDate')}
            />
          </Form.Item>

          <Form.Item name="endDate" className="input">
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
              size="large"
              className="input"
              placeholder={t('inputs.endDate')}
            />
          </Form.Item>
        </div>

        <div className="form-inputs">
          <Form.Item name="comment" className="input">
            <Input className="input" size="large" placeholder={t('tableTitles.comment')} />
          </Form.Item>
        </div>

        <EventTypeFields event={selectedEvent} form={form} />

        <Button type="submit">{t("buttons.edit")}</Button>
      </FormComponent>
    </ModalWindow>
  );
};

export default EditEventModal;




