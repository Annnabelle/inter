import { EventSortField, EventType } from "../../../types/events";
import { CountryResponseDto } from "../../countries";
import { ErrorDto, HexString, PaginatedDto, PaginatedResponseDto } from "../../main.dto";
import { OrganizationResponseDto } from "../../organizations";
import { UserResponseDto } from "../../users";
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

type PopulatedForeignResponseDto = EventResponseDto & {
  donors: ({
    entity: 'organization',
    value: OrganizationResponseDto
  } | AgencyResponseDto | {
    entity: 'other',
    value: string,
  })[],
  organizer: PopulatedCountryOrganizationObjectResponseDto | null,
};

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
};

type PopulatedDiplomaticResponseDto = EventResponseDto & {
  organizer: PopulatedCountryOrganizationObjectResponseDto | null,
};

type PopulatedMeetingResponseDto = EventResponseDto & {
  partners: PopulatedCountryOrganizationObjectResponseDto[],
};

type PopulatedConferenceResponseDto = EventResponseDto & {
  partners: PopulatedCountryOrganizationObjectResponseDto[],
  donor: PopulatedCountryOrganizationObjectResponseDto | null,
  organizer: PopulatedCountryOrganizationObjectResponseDto | null,
};



export type GetEventsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<EventResponseDto>)| ErrorDto;
