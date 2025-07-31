import { EventResponseDto } from "../dtos/events/getEvent";
import { PaginatedResponse } from "../dtos/main.dto";
import { StatsByLevel } from "../dtos/statistics/getStatByLvl";
import { StatsByOrganizers } from "../dtos/statistics/getStatsByOrg";
import { UserWithEventsResponseDto } from "../dtos/users";
import { StatisticByPartners, StatisticsByLevel, StatisticsByOrganizers, SuccessObjResponse, SuccessResponse } from "../types/statistics";

export function StatisticsOrganizersResponseDtoToStatisticsOrganizers(params: StatsByOrganizers): StatisticsByOrganizers {
  return {
    type: params.type,
    total: params.total,
    partial: {
        agency: params.partial.agency,
        other: params.partial.other
    }
  };
}

export function mapStatisticsOrganizersRetrieveDtoToStatisticsOrganizers(
  params: { success: boolean; stats: StatsByOrganizers[] }
): SuccessResponse<StatisticsByOrganizers> {
  return {
    success: params.success,
    data: params.stats.map(StatisticsOrganizersResponseDtoToStatisticsOrganizers)
  };
}

export function StatisticsByLevelResponseDtoToStatisticsByLevel(params: StatsByLevel): StatisticsByLevel {
  return {
    type: params.type,
    total: params.total,
    partial: {
        director: params.partial.director,
        deputy: params.partial.deputy,
        expert: params.partial.expert
    }
  };
}

export function mapStatisticsByLevelRetrieveDtoToStatisticsByLevel(
  params: { success: boolean; stats: StatsByLevel[] }
): SuccessResponse<StatisticsByLevel> {
  return {
    success: params.success,
    data: params.stats.map(StatisticsByLevelResponseDtoToStatisticsByLevel)
  };
}

export function StatEventsByPartnerResponseDtoToStatEventsByPartner(params: EventResponseDto): StatisticByPartners {
  return {
    id: params.id,
    name: params.name,
    comment: params.comment,
    eventType: params.eventType,
    startDate: params.startDate,
    endDate: params.endDate
  };
}

export function PaginatedStatEventsByPartnerDtoToPaginatedStatEventsByPartner(params: PaginatedResponse<EventResponseDto> ): PaginatedResponse<StatisticByPartners> {
    return{
        limit: params.limit,
        page: params.page,
        total: params.total,
        data: params.data.map(event => {
            return StatEventsByPartnerResponseDtoToStatEventsByPartner(event)
        })
    }
}

export function StatisticsByUsersDtoToStatisticsByUsers(params: PaginatedResponse<UserWithEventsResponseDto>): PaginatedResponse<UserWithEventsResponseDto> {
  return {
    total: params.total,
    page: params.page,
    limit: params.limit,
    data: params.data.map(user => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      foreignVisitsCount: user.foreignVisitsCount,
      foreignVisits: user.foreignVisits.map(event => ({
        id: event.id,
        name: event.name,
        comment: event.comment,
        eventType: event.eventType,
        startDate: event.startDate,
        endDate: event.endDate
      }))
    }))
  };
}

export function StatisticsByUserDtoToStatisticsByUser(
  params: { success: boolean; user: UserWithEventsResponseDto | null }
): SuccessObjResponse<UserWithEventsResponseDto | null> {
  if (!params.user) {
    return {
      success: params.success,
      data: null,
    };
  }

  const mappedUser: UserWithEventsResponseDto = {
    id: params.user.id,
    firstName: params.user.firstName,
    lastName: params.user.lastName,
    email: params.user.email,
    phone: params.user.phone,
    foreignVisitsCount: params.user.foreignVisitsCount,
    foreignVisits: params.user.foreignVisits.map((event) => ({
      id: event.id,
      name: event.name,
      comment: event.comment,
      eventType: event.eventType,
      startDate: event.startDate,
      endDate: event.endDate,
    })),
  };

  return {
    success: params.success,
    data: mappedUser,
  };
}

