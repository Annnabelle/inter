import { EventType } from "../../../types/events";
import { ErrorDto, HexString } from "../../main.dto";
import { EventResponseDto } from "../getEvent";

export type UpdateBaseEventDto = {
  name: string,
  comment?: string,
  eventType: EventType,
  startDate: Date,
  endDate: Date,
}

export type UpdateEventResponseDto = {
  success: boolean,
  event: EventResponseDto,
} | ErrorDto;

export type UpdatePersonalDto = UpdateBaseEventDto & {};

export type UpdateSignificantDto = UpdateBaseEventDto & {};

export type UpdateBirthdayDto = UpdateBaseEventDto & {
  userId?: HexString,
  source?: BirthdaySourceDto,
};


export type UpdateMeetingDto = UpdateBaseEventDto & {
  place?: string,
  format?: EventFormat,
  level?: EventLevel,
  partners?: PartnerDto[],
};

export type UpdateDiplomaticDto = UpdateBaseEventDto & {
  place?: string,
  mainGuest?: string,
  organizer?: DiplomaticOrganizer,
};

export type UpdateDelegationsDto = UpdateBaseEventDto & {
  delegation?: DelegationDto,
  level?: EventLevel,
  membersQuantity?: number,
  approvals: ApprovalsDto,
};

export type UpdateConferenceDto = UpdateBaseEventDto & {
  organizer?: HexString | string,
  format?: EventFormat, 
  partners?: PartnerDto,
  donor?: DonorDto,
  membersQuantity?: number,
  approvals?: ApprovalsDto,
};

export type UpdateSeminarDto = UpdateConferenceDto;

export type UpdateForeignDto = UpdateBaseEventDto & {
  organizer?: HexString | string,
  level?: EventLevel,
  donors?: ForeignDonorDto[],
  approvals?: ApprovalsDto,
  additionalMembers?: string,
  agencyEmployees: HexString[];
};








type CountryOrganizationDto = {
  entity: 'country' | 'organization',
  value: HexString,
};

export const EventFormat = {
  Personal: "personal",
  Online: "online",
  Hybrid: "hybrid",
}

export const EventFormats = Object.values(EventFormat);

export type EventFormat = typeof EventFormat[keyof typeof EventFormat];

export const EventLevel = {
  Director: "director",
  Deputy: "deputy",
  Expert: "expert",
}

export const EventLevels = Object.values(EventLevel);

export type EventLevel = typeof EventLevel[keyof typeof EventLevel];


type BirthdaySourceDto = CountryOrganizationDto;
type PartnerDto = CountryOrganizationDto;
type DiplomaticOrganizer = CountryOrganizationDto;
type DelegationDto = CountryOrganizationDto;
type DonorDto = CountryOrganizationDto;
type ForeignDonorDto = {
  entity: 'agency' | 'organization',
  value: HexString,
} | {
  entity: 'other',
  value: string,
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

export const EventApprovalStatus = {
  Approved: "approved",
  Rejected: "rejected",
  Pending: "pending",
  None: "none",
}

export const EventApprovalStatuses = Object.values(EventApprovalStatus);

export type EventApprovalStatus = typeof EventApprovalStatus[keyof typeof EventApprovalStatus];

export type UpdateEventDto = UpdateBirthdayDto | UpdatePersonalDto | UpdateSignificantDto | UpdateDiplomaticDto | UpdateDelegationsDto | UpdateMeetingDto | UpdateConferenceDto | UpdateSeminarDto | UpdateForeignDto;
