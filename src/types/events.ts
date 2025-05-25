import dayjs from "dayjs";
import { HexString } from "../dtos/main.dto";

export type Event = {
  id: HexString,
  name: string;
  comment?: string,
  eventType: EventType,
  startDate: Date,
  endDate: Date,
};

// export type EventTypes = {
//     title: string;
//     start: Date;
//     end: Date;
//     allDay?: boolean;
//     organizer: string;
//     eventType: string;
//     countOfMembers: string;
//     partnersOptions: string,
//     donorFormat: string
// };

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


export const EventType = {
  Conference: "conference",
  Seminar: "seminar",
  Meeting: "meeting",
  Foreign: "foreign",
  Diplomatic: "diplomatic",
  Delegations: "delegations",
  Birthday: "birthday",
  Significant: "significant",
  Personal: "personal",
} as const;

export const EventTypes = Object.values(EventType);

export type EventType = typeof EventType[keyof typeof EventType];


export const EventSortField = {
  Id: '_id',
  StartDate: "startDate",
  EndDate: "endDate",
} as const;

export const EventSortFields = Object.values(EventSortField);

export type EventSortField = typeof EventSortField[keyof typeof EventSortField];

export interface CountriesInnerEventDataType {
    key: string | number;
    name: string;
    eventType: string
    comment?: string | undefined;
    end: Date;
    start: Date;
}