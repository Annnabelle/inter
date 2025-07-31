import React, { useState } from "react";
import { Form, Select, DatePicker, Input } from "antd";
import { EventType } from "../../../types/events";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "../../../store";
import { CreateEvent } from "../../../store/events";
import { toast } from "react-toastify";
import Button from "../../button";
import FormComponent from "../../form";
import ConferenceAdditionalFields from "./additionalField/ConferenceAdditionalFields";
import MeetingAdditionalFields from "./additionalField/MeetingAdditionalFields";
import BirthdayAdditionalFields from "./additionalField/BirthdayAdditionalFields";
import DelegationAdditionalFields from "./additionalField/DelegationAdditionalFields";
import DiplomaticAdditionalFields from "./additionalField/DiplomaticAdditionalFields";
import ForeignAdditionalFields from "./additionalField/ForeignAdditionalFields";
import SeminarAdditionalFields from "./additionalField/SeminarAdditionalFields";

const createEventFieldsStrategy: Partial<Record<EventType, React.FC>> = {
  [EventType.Birthday]: BirthdayAdditionalFields,
  [EventType.Conference]: ConferenceAdditionalFields,
  [EventType.Delegations]: DelegationAdditionalFields,
  [EventType.Diplomatic]: DiplomaticAdditionalFields,
  [EventType.Foreign]: ForeignAdditionalFields,
  [EventType.Meeting]: MeetingAdditionalFields,
  [EventType.Seminar]: SeminarAdditionalFields,
};

const AddEventForm = ({ onSuccess }: { onSuccess: () => void}) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch()
  const [selectedEventType, setSelectedEventType] = useState<EventType | null>(null);

  const onEventTypeChange = (value: EventType) => {
    setSelectedEventType(value);
  };

  const AdditionalFields = selectedEventType ? createEventFieldsStrategy[selectedEventType] : null;

  const eventOptions = [
    { value: EventType.Birthday, label: t('events.birthday') },
    { value: EventType.Conference, label: t('events.conference') },
    { value: EventType.Delegations, label: t('events.delegations') },
    { value: EventType.Diplomatic, label: t('events.diplomatic') },
    { value: EventType.Foreign, label: t('events.foreign') },
    { value: EventType.Meeting, label: t('events.meeting') },
    { value: EventType.Personal, label: t('events.personal') },
    { value: EventType.Seminar, label: t('events.seminar') },
    { value: EventType.Significant, label: t('events.significant') },
  ];

const handleCreateEvent = async (values: any) => {
  try {
    let formattedApprovals: Record<string, any> | null = null;

    if (values.approvals) {
      formattedApprovals = {};
      Object.entries(values.approvals).forEach(([key, approval]: [string, any]) => {
        const status = approval.status;

        if (status === 'none') {
          formattedApprovals![key] = { status: 'none' };
        } else if (status === 'pending') {
          formattedApprovals![key] = {
            status: 'pending',
            request: {
              date: approval.request?.date ? approval.request.date.toISOString() : null,
              document: approval.request?.document || '',
            }
          };
        } else if (status === 'approved') {
          formattedApprovals![key] = {
            status: 'approved',
            request: {
              date: approval.request?.date ? approval.request.date.toISOString() : null,
              document: approval.request?.document || '',
            },
            response: {
              date: approval.response?.date ? approval.response.date.toISOString() : null,
              document: approval.response?.document || '',
            }
          };
        }
      });
    }
    const formattedValues: any = {
      ...values,
      startDate: values.startDate ? values.startDate.toDate().toISOString() : null,
      endDate: values.endDate ? values.endDate.toDate().toISOString() : null,
    };

    if (formattedApprovals) {
      formattedValues.approvals = formattedApprovals;
    }

    console.log('====================================');
    console.log('value', values);
    console.log('====================================');
    console.log('formattedValues', formattedValues);

    const resultAction = await dispatch(CreateEvent(formattedValues));
    if (CreateEvent.fulfilled.match(resultAction)) {
      toast.success(t('messages.eventCreatedSuccess'));
      setTimeout(() => {
         onSuccess();
         window.location.reload()
      }, 1000)
    } else {
      toast.error(t('messages.eventCreatedError'));
    }
  } catch (err) {
    toast.error((err as string) || t('messages.serverError'));
  }
};

  return (
    <FormComponent onFinish={handleCreateEvent}>
      <div className="form-inputs">
        <Form.Item name="eventType" className="input" rules={[{ required: true, message: t('errors.required') }]}>
          <Select
            className="input"
            size="large"
            options={eventOptions}
            placeholder={t('inputs.selectEvent')}
            onChange={onEventTypeChange}
          />
        </Form.Item>
        <Form.Item name="name" className="input" rules={[{ required: true, message: t('errors.required') }]}>
          <Input
            className="input"
            size="large"
            placeholder={t('inputs.title')}
          />
        </Form.Item>
      </div>

      <div className="form-inputs">
        <Form.Item
          className="input"
          name="startDate"
          rules={[{ required: true, message: t('errors.required') }]}
        >
          <DatePicker
            showTime={{ format: 'HH:mm' }}
            format="YYYY-MM-DD HH:mm"
            size="large"
            className="input"
            placeholder={t('inputs.startDate')}
            onChange={(date) => console.log('selected startDate:', date?.format('YYYY-MM-DD HH:mm:ss'))}
          />
        </Form.Item>
        
        <Form.Item
          className="input"
          name="endDate"
          rules={[{ required: true, message: t('errors.required') }]}
        >
         <DatePicker
          showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD HH:mm"
          size="large"
          className="input"
          placeholder={t('inputs.endDate')}
          onChange={(date) => console.log('selected endDate:', date?.format('YYYY-MM-DD HH:mm:ss'))}
        />
        </Form.Item>
      </div>


      <div className="form-inputs">
        <Form.Item name="comment" className="input">
          <Input
            className="input"
            size="large"
            placeholder={t('tableTitles.comment')}
          />
        </Form.Item>
      </div>

      {typeof AdditionalFields === "function" && <AdditionalFields />}
       <Button type="submit">{t('buttons.create')}</Button>
    </FormComponent>
  );
};

export default AddEventForm;

