import { HexString } from "../dtos/main.dto"
import { EventType } from "./events"

export type StatisticsByOrganizers = {
  type: EventType,
  total: number,
  partial: {
    agency: number,
    other: number,
  }
}

export type StatisticsByLevel = {
  type: EventType,
  total: number,
  partial: {
    director: number,
    deputy: number,
    expert: number,
  }
}

export type SuccessResponse<T> = {
    success: boolean,
    data: T[];
}

export type StatisticByPartners = {
  id?: HexString,
  name: string;
  comment?: string,
  eventType: EventType,
  startDate: Date | string,
  endDate: Date | string,
}