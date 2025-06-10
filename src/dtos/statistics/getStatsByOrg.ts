import { EventType } from "../../types/events";
import { ErrorDto } from "../main.dto";


export type GetStatsByOrganizersDto = {
    startDate: Date;
    endDate: Date;
}

export type GetByOrganizersResult = StatsByOrganizers[];

export type StatsByOrganizers = {
  type: EventType,
  total: number,
  partial: {
    agency: number,
    other: number,
  }
}

export type GetStatsByOrganizersResponseDto = {
  success: boolean,
  stats: GetByOrganizersResult,
} | ErrorDto;