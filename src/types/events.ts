import {ReactNode} from 'react'
import dayjs from "dayjs";

export type EventType = {
    title: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    organizer: string;
    eventType: string;
    countOfMembers: string;
    partnersOptions: string,
    donorFormat: string
};

export type CalendarComponentProps = {
    openEventModal: boolean;
    closeEventModal: () => void;
};

export type EventFormValues = {
  eventName: string;
  date: [dayjs.Dayjs, dayjs.Dayjs];
  organizer: string,
  eventType: string,
  countOfMembers: number,
  partnersOptions: string,
  donorFormat: string
};

export type AddEventFormProps =  {
  // handleAddEvent: (values: EventFormValues) => void;
  handleAddEvent: (values: EventFormValues) => void;
  initialValues?: EventType;
};

export interface EventDetailsProps {
  event: {
    title?: string;
    start?: string;
    end?: string;
    organizer?: string;
    eventType?: string;
    countOfMembers?: string;
    partnersOptions?: string;
    donorFormat?: string;
  };
}

export interface EditEventProps {
  initialValues: EventType;
  handleAddEvent: (values: any) => void
}