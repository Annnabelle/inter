import { EventType } from "../../types/events";
import { ErrorDto } from "../main.dto";

export type GetStatsByLevelDto = {
    startDate: Date;
    endDate: Date;
}


export type GetByLevelResult = StatsByLevel[];

export type StatsByLevel = {
  type: EventType,
  total: number,
  partial: {
    director: number,
    deputy: number,
    expert: number,
  }
}

export type GetStatsByLevelResponseDto = {
  success: boolean,
  stats: GetByLevelResult,
} | ErrorDto;