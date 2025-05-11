import { PaginatedResponse } from "../dtos/main.dto";
import { CreateOrganizationDto, OrganizationResponseDto, UpdateOrganizationDto } from "../dtos/organizations";
import { createOrganizationType, Organization } from "../types/organizations";

export function createOrganizationToCreateOrganizationDto(organization: createOrganizationType): CreateOrganizationDto {
    return {
        name: {
            en: organization.name.en,
            uz: organization.name.uz,
            ru: organization.name.ru
        },
        type: organization.organizationType,
        comment: organization.comment
    }
}

export function organizationResponseDtoToOrganization(dto: OrganizationResponseDto): Organization {
  return {
    id: dto.id,
    name: {
        uz: dto.name.uz,
        en: dto.name.en,
        ru: dto.name.ru,
    },
    comment: dto.comment,
    organizationType: dto.type, 
  };
}

export function updateOrganizationsToUpdateOrganizationDto(organization: Organization): UpdateOrganizationDto{
    return {
        name: {
            ru: organization.name.ru,
            uz: organization.name.uz,
            en: organization.name.en,
        },
        comment: organization.comment,
        type: organization.organizationType
    }
}

export function paginatedOrganizationsDtoToPaginatedOrganizations(paginatedOrganizations: PaginatedResponse<OrganizationResponseDto> ): PaginatedResponse<Organization> {
    return{
        limit: paginatedOrganizations.limit,
        page: paginatedOrganizations.page,
        total: paginatedOrganizations.total,
        data: paginatedOrganizations.data.map(organizationDto => {
            return organizationResponseDtoToOrganization(organizationDto)
        })
    }
}