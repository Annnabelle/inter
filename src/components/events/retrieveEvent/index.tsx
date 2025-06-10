import React from "react";
import ModalWindow from "../../modalWindow";
import { Event, EventType } from "../../../types/events";
import { DatePicker, Form, Input, Select } from "antd";
import BirthdayRetrieveAdditionalFields from "./birthdayAdditionalFields";
import moment from "moment";
import FormComponent from "../../form";
import ConferenceAdditionalFieldsRetrieve from "./conferenceAdditionalFieldsRetrieve";
import DelegationAdditionalFieldsRetrieve from "./delegationAdditionalFieldsRetrieve";
import DiplomaticAdditionalFieldsRetrieve from "./diplomaticAdditionalFieldsRetrieve";
import ForeignAdditionalFieldsRetrieve from "./foreignAdditionalFieldsRetrieve";
import MeetingAdditionalFieldsRetrieve from "./meetingAdditionalFieldsRetrieve";
import SeminarAdditionalFieldsRetrieve from "./seminarAdditionalFieldsRetrieve";
import { getUserRole } from "../../../utils/getUserRole";
import { UserRole } from "../../../utils/roles";
import { useTranslation } from "react-i18next";

interface RetrieveEventModalProps {
  selectedEvent: Event | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}

const retrieveEventFieldsStrategy: Partial<
  Record<EventType, React.FC<{ event: Event; form: any }>>
> = {
  [EventType.Birthday]: BirthdayRetrieveAdditionalFields,
  [EventType.Conference] : ConferenceAdditionalFieldsRetrieve,
  [EventType.Delegations] : DelegationAdditionalFieldsRetrieve,
  [EventType.Diplomatic] : DiplomaticAdditionalFieldsRetrieve,
  [EventType.Foreign] : ForeignAdditionalFieldsRetrieve,
  [EventType.Meeting] : MeetingAdditionalFieldsRetrieve,
  [EventType.Seminar] : SeminarAdditionalFieldsRetrieve
};

const RetrieveEventModal: React.FC<RetrieveEventModalProps> = ({
  selectedEvent,
  isOpen,
  onClose,
  onEdit,
}) => {
  const [form] = Form.useForm();
  const {t} = useTranslation()

  if (!selectedEvent) return null;

  const EventAdditionalFieldsComponent =
    retrieveEventFieldsStrategy[selectedEvent.eventType];
  const role = getUserRole();
  return (
    <ModalWindow openModal={isOpen} closeModal={onClose} title="Информация о событии" 
    {...(role !== UserRole.EMPLOYEE ? { handleEdit: onEdit } : {})}
    >
      <FormComponent formProps={form}>
        <div className="form-inputs">
          <Form.Item name="eventType" className="input">
            <Select className="input" size="large" disabled placeholder={t(`eventTypes.${selectedEvent.eventType}`)} />
          </Form.Item>
          {selectedEvent.name && (
            <Form.Item name="name" className="input">
              <Input className="input" size="large" disabled placeholder={selectedEvent.name} />
            </Form.Item>
          )}
        </div>

        <div className="form-inputs">
          {selectedEvent.startDate && (
            <Form.Item className="input" name="startDate">
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                size="large"
                className="input"
                placeholder={moment(selectedEvent.startDate).format("DD-MM-YYYY HH:mm")}
                disabled
              />
            </Form.Item>
          )}
          {selectedEvent.endDate && (
            <Form.Item className="input" name="endDate">
              <DatePicker
                showTime={{ format: "HH:mm" }}
                format="YYYY-MM-DD HH:mm"
                size="large"
                className="input"
                placeholder={moment(selectedEvent.endDate).format("DD-MM-YYYY HH:mm")}
                disabled
              />
            </Form.Item>
          )}
        </div>
          {selectedEvent.comment && (
            <div className="form-inputs">
              <Form.Item name="comment" className="input">
                <Input className="input" size="large" disabled placeholder={selectedEvent.comment} />
              </Form.Item>
            </div>
          )}

        {EventAdditionalFieldsComponent && (
          <EventAdditionalFieldsComponent event={selectedEvent} form={form} />
        )}
      </FormComponent>
    </ModalWindow>
  );
};

export default RetrieveEventModal;



