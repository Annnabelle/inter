import { EventSortField, EventType } from "../../../types/events";
import { CountryResponseDto } from "../../countries";
import { ErrorDto, HexString, PaginatedDto, PaginatedResponseDto } from "../../main.dto";
import { OrganizationResponseDto } from "../../organizations";
import { UserResponseDto } from "../../users";
import { EventFormat, EventLevel } from "../addEvent";
import { EventResponseDto } from "../getEvent";


export type GetEventsDto  = PaginatedDto & {
    type?: EventType[];
    organizationId?: HexString;
    countryId?: HexString;
    sortBy?: EventSortField;
}

export type SearchEventsDto = PaginatedDto & {
    type?: EventType[];
    query: string
}

type AgencyResponseDto = {
  entity: 'agency',
  value: any,
};

export type PopulatedCountryOrganizationObjectResponseDto = {
  entity: 'organization',
  value: OrganizationResponseDto
} | {
  entity: 'country';
  value: CountryResponseDto;
};


export type Approvals = {
  mia: Approval,
  sss: Approval,
  administration: Approval,
};

type Approval = {
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

export type EventApprovalStatus = {
  Approved: "approved",
  Rejected: "rejected",
  Pending: "pending",
  None: "none",
}

export type PopulatedEventResponseDto =
  PopulatedBirthdayResponseDto |
  PopulatedDelegationsResponseDto |
  PopulatedDiplomaticResponseDto |
  PopulatedMeetingResponseDto |
  PopulatedConferenceResponseDto |
  PopulatedForeignResponseDto |
  EventResponseDto;

type PopulatedBirthdayResponseDto = EventResponseDto & {
  user: UserResponseDto | null,
  source: PopulatedCountryOrganizationObjectResponseDto | null,
};

type PopulatedDelegationsResponseDto = EventResponseDto & {
  delegation: PopulatedCountryOrganizationObjectResponseDto | null,
  level?: EventLevel,
  membersQuantity?: number,
  approvals?: Approvals,
};

type PopulatedDiplomaticResponseDto = EventResponseDto & {
  organizer: PopulatedCountryOrganizationObjectResponseDto | null,
  place?: string,
  mainGuest?: string,
};

type PopulatedMeetingResponseDto = EventResponseDto & {
  partners: PopulatedCountryOrganizationObjectResponseDto[],
  level?: EventLevel,
  format?: EventFormat,
  place?: string,
};

type PopulatedConferenceResponseDto = EventResponseDto & {
  partners: PopulatedCountryOrganizationObjectResponseDto[],
  donor: PopulatedCountryOrganizationObjectResponseDto | null,
  organizer: PopulatedCountryOrganizationObjectResponseDto | null,
  format: EventFormat,
  membersQuantity?: number,
  approvals: Approvals,
};

type PopulatedForeignResponseDto = EventResponseDto & {
  donors: ({
    entity: 'organization',
    value: OrganizationResponseDto
  } | AgencyResponseDto | {
    entity: 'other',
    value: string,
  })[],
  organizer: PopulatedCountryOrganizationObjectResponseDto | null,
  level?: EventLevel,
  approvals?: Approvals,
  additionalMembers?: string,
};



export type GetEventsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<EventResponseDto>)| ErrorDto;
