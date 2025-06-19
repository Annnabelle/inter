import { CreateBaseEventDto, CreateBirthdayEventDto, CreateConferenceEventDto, CreateDelegationsEventDto, CreateDiplomaticEventDto, CreateEventDto, CreateForeignEventDto, CreateMeetingEventDto, CreateSeminarEventDto } from "../dtos/events/addEvent";
import { EventResponseDto } from "../dtos/events/getEvent";
import { GetEventsCalendarResponseDto } from "../dtos/events/getEventsCalendar";
import { ErrorDto } from "../dtos/main.dto";
import { Event, EventType, GetEventsCalendar } from "../types/events";

export function EventsCalendarResponseDtoToEventsCalendar(eventCalendar: EventResponseDto): Event {
  return {
    id: eventCalendar?.id,
    name: eventCalendar?.name,
    comment: eventCalendar?.comment,
    eventType: eventCalendar?.eventType,
    startDate: eventCalendar?.startDate,
    endDate: eventCalendar?.endDate
  };
}

export function mapEventToCreateEventDto(params: Event){
  return mapEventSpecificsToDto[params.eventType as EventType](params);
}

export function UpdateEventCalendarToUpdateEventCalendarDTO(params: Event){
  return mapEventSpecificsToDto[params.eventType as EventType](params)
}

function mapEventBaseToDto(params: Event): CreateBaseEventDto{
  return {
    name: params.name,
    comment: params.comment,
    startDate: params.startDate,
    endDate: params.endDate,
    eventType: params.eventType,
  }
}

function mapEmptySpecifics(params: CreateEventDto){
  return {
    ...mapEventBaseToDto(params),
  };
}

function mapBirthdaySpecifics(params: CreateBirthdayEventDto): CreateBirthdayEventDto {
  return {
    ...mapEventBaseToDto(params),
    userId: params.userId,
    source: params.source,
  }
}

function mapMeetingSpecifics(params: CreateMeetingEventDto): CreateMeetingEventDto{
  return {
    ...mapEventBaseToDto(params),
    place: params.place,
    format: params.format,
    level: params.level,
    partners: params.partners,
  }
}

function mapConferenceSpecifics(params: CreateConferenceEventDto) :CreateConferenceEventDto{
  return {
    ...mapEventBaseToDto(params),
    organizer: params.organizer,
    format: params.format,
    partners: params.partners,
    donor: params.donor,
    membersQuantity: params.membersQuantity,
    approvals: params.approvals
  }
}

function mapDelegationsSpecifics(params: CreateDelegationsEventDto) : CreateDelegationsEventDto{
  return {
    ...mapEventBaseToDto(params),
    delegation: params.delegation,
    level: params.level,
    membersQuantity: params.membersQuantity,
    approvals: params.approvals
  }
}

function mapDiplomaticSpecifics(params: CreateDiplomaticEventDto) : CreateDiplomaticEventDto {
  return {
    ...mapEventBaseToDto(params),
    place: params.place,
    mainGuest: params.mainGuest,
    organizer: params.organizer
  }
}

function mapForeignSpecifics(params: CreateForeignEventDto) : CreateForeignEventDto {
  return {
    ...mapEventBaseToDto(params),
    organizer: params.organizer,
    level: params.level,
    donors: params.donors,
    approvals: params.approvals,
    additionalMembers: params.additionalMembers
  }
}

function mapSeminarSpecifics(params: CreateSeminarEventDto) : CreateSeminarEventDto {
  return {
    ...mapEventBaseToDto(params),
    organizer: params.organizer,
    format: params.format,
    partners: params.partners,
    donor: params.donor,
    membersQuantity: params.membersQuantity,
    approvals: params.approvals
  }
}

const mapEventSpecificsToDto: Record<EventType, Function> = {
  [EventType.Personal]: mapEmptySpecifics,
  [EventType.Significant]: mapEmptySpecifics,
  [EventType.Birthday]: mapBirthdaySpecifics,
  [EventType.Meeting]: mapMeetingSpecifics,
  [EventType.Conference] : mapConferenceSpecifics,
  [EventType.Delegations] : mapDelegationsSpecifics,
  [EventType.Diplomatic] : mapDiplomaticSpecifics,
  [EventType.Foreign] : mapForeignSpecifics,
  [EventType.Seminar] : mapSeminarSpecifics,
}

export function isErrorDto(obj: any): obj is ErrorDto {
  return obj && typeof obj.errorMessage === 'object' && obj.errorMessage !== null;
}

export function RetrieveEventsCalendarDtoToRetrieveEventsCalendar(
  paginatedEvents: GetEventsCalendarResponseDto
): GetEventsCalendar | null {
  if (isErrorDto(paginatedEvents)) {
    return null;
  }
  return {
    success: paginatedEvents.success,
    events: paginatedEvents.events,
    total: paginatedEvents.total,
    counters: paginatedEvents.counters,
  };
}


