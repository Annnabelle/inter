import { EventResponseDto } from "../dtos/events/getEvent";
import { PaginatedResponse } from "../dtos/main.dto";
import { Event } from "../types/events";

export function EventsResponseDtoToEvents(event: EventResponseDto): Event {
  return {
    id: event?.id,
    name: event?.name,
    comment: event?.comment,
    eventType: event?.eventType,
    startDate: event?.startDate,
    endDate: event?.endDate
  };
}

// export function ExpertResponseDtoToExpert(expert: PopulatedEventResponseDto): ExpertWithDocs {
//   return {
//     id: expert?.id,
//     spheres: expert?.spheres,
//     firstName: expert?.firstName,
//     lastName: expert?.lastName,
//     email: expert?.email,
//     phone: expert?.phone,
//     comment: expert?.comment,
//     organization: expert.organization ? {
//         id: expert.organization.id,
//         name: {
//             ru: expert.organization.name.ru,
//             en: expert.organization.name.en,
//             uz: expert.organization.name.uz
//         },
//         comment: expert.organization.comment,
//         type: expert.organization.type
//     }: null,
//     events: expert.events,
//     files: expert.documents
//   };
// }

export function PaginatedEventsDtoToPaginatedEvents(paginatedEvents: PaginatedResponse<EventResponseDto> ): PaginatedResponse<Event> {
    return{
        limit: paginatedEvents.limit,
        page: paginatedEvents.page,
        total: paginatedEvents.total,
        data: paginatedEvents.data.map(event => {
            return EventsResponseDtoToEvents(event)
        })
    }
}