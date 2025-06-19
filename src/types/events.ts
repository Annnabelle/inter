import dayjs from "dayjs";
import { HexString } from "../dtos/main.dto";
import { EventFormat, EventLevel } from "../dtos/events/addEvent";
import { EventTypeCounters } from "../dtos/events/getEventsCalendar";

export type Event = {
  id?: HexString,
  name: string;
  comment?: string,
  eventType: EventType,
  startDate: Date ,
  endDate: Date ,
};

export type EventTableRow = {
  eventType: string;
  name: string;
  startDate: string;
  endDate: string;
  comment?: string;
}

export type EventWithId = {
  id: HexString,
  name: string;
  comment?: string,
  eventType: EventType,
  startDate: Date,
  endDate: Date,
}

export type GetEventsCalendar = {
  success: boolean,
  events: EventWithId[],
  total: number,
  counters: EventTypeCounters,
};


export type EventById = {
  success: boolean,
  event?: {
    id?: HexString,
    name: string;
    comment?: string,
    eventType: EventType,
    startDate: Date,
    endDate: Date,
  }
}

export type EventApprovalStatus = {
  Approved: "approved",
  Rejected: "rejected",
  Pending: "pending",
  None: "none",
}

export type ApprovalsDto = {
  mia: ApprovalMia,
  sss: ApprovalSSS,
  administration: ApprovalAdministration,
};

type ApprovalMia = {
  status: EventApprovalStatus,
  request?: {
    document: string,
    date: Date,
  },
  response?: {
    document: string,
    date: Date,
  },
}

type ApprovalSSS = {
  status: EventApprovalStatus,
  request?: {
    document: string,
    date: Date,
  },
  response?: {
    document: string,
    date: Date,
  },
}

type ApprovalAdministration = {
  status: EventApprovalStatus,
  request?: {
    document: string,
    date: Date,
  },
  response?: {
    document: string,
    date: Date,
  },
}

type CountryOrganizationDto = {
  entity: 'country' | 'organization',
  value: HexString,
};

type ForeignDonorDto = {
  entity: 'agency' | 'organization',
  value: HexString,
} | {
  entity: 'other',
  value: string,
}


type PartnerDto = CountryOrganizationDto;
type DiplomaticOrganizer = CountryOrganizationDto;
type Delegation = CountryOrganizationDto;
type DonorDto = CountryOrganizationDto;

export type UpdateBirthday = Event & {
  place?: string,
  format?: EventFormat,
  level?: EventLevel,
  partners?: PartnerDto[],
}

export type UpdatePersonal = Event & {}
export type UpdateSignificant = Event & {}
export type UpdateDiplomatic = Event & {
  place?: string,
  mainGuest?: string,
  organizer?: DiplomaticOrganizer,
}
export type UpdateDelegations = Event & {
  delegation?: Delegation,
  level?: EventLevel,
  membersQuantity?: number,
  approvals: ApprovalsDto,
}
export type UpdateMeeting = Event & {
  place?: string,
  format?: EventFormat,
  level?: EventLevel,
  partners?: PartnerDto[],
}
export type UpdateConference = Event & {
  organizer?: HexString | string,
  format?: EventFormat, 
  partners?: PartnerDto,
  donor?: DonorDto,
  membersQuantity?: number,
  approvals?: ApprovalsDto,
}
export type UpdateSeminar = UpdateConference

export type UpdateForeign = Event & {
  organizer?: HexString | string,
  level?: EventLevel,
  donors?: ForeignDonorDto[],
  approvals?: ApprovalsDto,
  additionalMembers?: string,
}
export type UpdateEvent = UpdateBirthday | UpdatePersonal | UpdateSignificant | UpdateDiplomatic | UpdateDelegations | UpdateMeeting | UpdateConference | UpdateSeminar | UpdateForeign;



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
    end: Date | string;
    start: Date | string;
}