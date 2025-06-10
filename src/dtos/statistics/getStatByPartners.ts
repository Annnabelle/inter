import { EventSortField, EventType } from "../../types/events";
import { HexString, PaginatedDto } from "../main.dto";

export type GetEventsByPartnerDto = PaginatedDto & {
    type?: EventType[];
    partnerId: HexString;
    sortBy?: EventSortField;
}

export interface Identifier {
  type: 'Identifier';
}

export type EventByPartnerFilterQuery = {
  startDate?: Date,
  endDate?: Date,
  types?: EventType[],
  partnerId: Identifier,
};


export type GetEventsByPartnerParams = {
  page: number,
  limit: number,
  sortBy?: EventSortField,
  sortOrder: 'asc' | 'desc',
  types?: EventType[],
  partnerId: Identifier,
}