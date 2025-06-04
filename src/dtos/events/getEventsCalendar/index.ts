import { EventType } from "../../../types/events";
import { ErrorDto, HexString } from "../../main.dto";
import { EventResponseDto } from "../getEvent";

export type GetEventsCalendarDto = {
    startDate: Date;
    endDate: Date;
    type?: EventType[];
    organizationId?: HexString;
    countryId?: HexString;
}

export type EventTypeCounters = {
  [key in EventType]: number
};


export type GetEventsCalendarResponseDto = {
  success: boolean,
  events: EventResponseDto[],
  total: number,
  counters: EventTypeCounters,
} | ErrorDto;

