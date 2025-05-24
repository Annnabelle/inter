import { CreateExpertDto, ExpertResponseDto, PopulatedExpertResponseDto, UpdateExpertDto } from "../dtos/experts";
import { PaginatedResponse } from "../dtos/main.dto";
import { Expert, ExpertsType, ExpertWithDocs } from "../types/experts.type";

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


export function ExpertResponseDtoToExpert(expert: PopulatedExpertResponseDto): ExpertWithDocs {
  return {
    id: expert?.id,
    spheres: expert?.spheres,
    firstName: expert?.firstName,
    lastName: expert?.lastName,
    email: expert?.email,
    phone: expert?.phone,
    comment: expert?.comment,
    organization: expert.organization ? {
        id: expert.organization.id,
        name: {
            ru: expert.organization.name.ru,
            en: expert.organization.name.en,
            uz: expert.organization.name.uz
        },
        comment: expert.organization.comment,
        type: expert.organization.type
    }: null,
    events: expert.events,
    files: expert.documents
  };
}

export function ExpertsResponseDtoToExperts(expert: ExpertResponseDto): Expert {
  return {
    id: expert?.id,
    spheres: expert?.spheres,
    firstName: expert?.firstName,
    lastName: expert?.lastName,
    email: expert?.email,
    phone: expert?.phone,
    comment: expert?.comment
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