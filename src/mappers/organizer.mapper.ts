import { PaginatedResponse } from "../dtos/main.dto";
import { OrganizerResponseDto } from "../dtos/organizer";
import { Organizer } from "../types/organizer";

export function organizerResponseDtoToOrganizer(organizer: OrganizerResponseDto): Organizer {
  return {
    id: organizer.id,
    name: organizer.name
  };
}

export function paginatedOrganizersDtoToPaginatedOrganizers(paginatedOrganizers: PaginatedResponse<OrganizerResponseDto> ): PaginatedResponse<Organizer> {
    return{
        limit: paginatedOrganizers.limit,
        page: paginatedOrganizers.page,
        total: paginatedOrganizers.total,
        data: paginatedOrganizers.data.map(organizer => {
            return organizerResponseDtoToOrganizer(organizer)
        })
    }
}