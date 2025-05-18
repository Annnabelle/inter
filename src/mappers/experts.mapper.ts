import { CreateExpertDto, ExpertResponseDto, UpdateExpertDto } from "../dtos/experts";
import { PaginatedResponse } from "../dtos/main.dto";
import { Expert, ExpertsType } from "../types/experts.type";

export function CreateExpertToCreateExpertDto(expert: ExpertsType): CreateExpertDto {
    return {
        spheres: expert.spheres,
        firstName: expert.firstName,
        lastName: expert.lastName,
        email: expert.email,
        phone: expert.phone,
        comment: expert.comment,
        organizationId: expert.organizationId,
        events: expert.events,
        documents: expert.documents
    }
}


export function ExpertsResponseDtoToExperts(expert: ExpertResponseDto): Expert {
  return {
    id: expert?.id,
    spheres: expert?.spheres,
    firstName: expert?.firstName,
    lastName: expert?.lastName,
    comment: expert?.comment,
    phone: expert?.phone,
    email: expert?.email
  };
}


export function UpdateExpertToUpdateExpertDto(expert: ExpertsType): UpdateExpertDto{
    return {
        firstName: expert.firstName,
        spheres: expert.spheres,
        lastName: expert.lastName,
        comment: expert.comment,
        email: expert.email,
        phone: expert.phone,
        organizationId: expert.organizationId,
        events: expert.events,
        documents: expert.documents,
    }
}

export function PaginatedExpertsDtoToPaginatedExperts(paginatedOrganizationsProjects: PaginatedResponse<ExpertResponseDto> ): PaginatedResponse<Expert> {
    return{
        limit: paginatedOrganizationsProjects.limit,
        page: paginatedOrganizationsProjects.page,
        total: paginatedOrganizationsProjects.total,
        data: paginatedOrganizationsProjects.data.map(paginatedOrganizationsProject => {
            return ExpertsResponseDtoToExperts(paginatedOrganizationsProject)
        })
    }
}