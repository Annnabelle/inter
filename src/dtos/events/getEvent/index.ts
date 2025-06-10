import { EventType } from "../../../types/events";
import { ErrorDto, HexString } from "../../main.dto";
import { PopulatedEventResponseDto } from "../getEvents";

export type EventResponseDto = {
  id: HexString,
  name: string;
  comment?: string,
  eventType: EventType,
  startDate: Date,
  endDate: Date,
};

export type GetEventResponseDto = {
  success: boolean,
  event: PopulatedEventResponseDto,
} | ErrorDto;