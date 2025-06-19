import { PaginatedResponse } from "../dtos/main.dto";
import { organizationEmployeesDto, OrganizationEmployeeResponseDto, UpdateOrganizationEmployeeDto, PopulatedOrganizationEmployeeResponseDto } from "../dtos/organizationEmployee";
import { OrganizationEmployee, OrganizationEmployees, OrganizationEmployeeUpdate, OrganizationEmployeeWithDocs } from "../types/organizationEmployee";

export function CreateOrganizationEmployeeToCreateOrganizationEmployeeDto(organizationEmployee: OrganizationEmployees): organizationEmployeesDto {
    return {
        firstName: organizationEmployee.firstName,
        lastName: organizationEmployee.lastName,
        phone: organizationEmployee.phone,
        email: organizationEmployee.email,
        position: organizationEmployee.position,
        comment: organizationEmployee.comment,
        organizationId: organizationEmployee.organizationId,
        documents: organizationEmployee.documents
    }
}

export function OrganizationEmployeesResponseDtoToOrganizationEmployees(dto: OrganizationEmployeeResponseDto): OrganizationEmployee {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    phone: dto.phone,
    email: dto.email,
    position: dto.position,
    comment: dto.comment,
    organizationId: dto.organizationId,
  };
}

export function OrganizationEmployeeResponseDtoToOrganizationEmployeeResponse(
  dto: PopulatedOrganizationEmployeeResponseDto
): OrganizationEmployeeWithDocs { 
  return {
    id: dto?.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    phone: dto.phone,
    email: dto.email,
    position: dto.position,
    comment: dto.comment,
    organizationId: dto.organizationId,
    documents: dto.documents.map(document => { 
        return {
            extension: document.extension,
            id: document.id,
            mimeType: document.mimeType,
            originalName: document.originalName,
            url: document.url
        }
    })
  };
}

export function UpdateOrganizationEmployeeToUpdateOrganizationEmployeeResponseDto(organizationEmployee: OrganizationEmployeeUpdate): UpdateOrganizationEmployeeDto{
    return {
        firstName: organizationEmployee.firstName,
        lastName: organizationEmployee.lastName,
        phone: organizationEmployee.phone,
        email: organizationEmployee.email,
        position: organizationEmployee.position,
        comment: organizationEmployee.comment,
        documents: organizationEmployee.documents
    }
}

export function PaginatedOrganizationsEmployeesResponseDtoToPaginatedOrganizationsEmployeesResponse(paginatedOrganizations: PaginatedResponse<OrganizationEmployeeResponseDto> ): PaginatedResponse<OrganizationEmployee> {
    return{
        limit: paginatedOrganizations.limit,
        page: paginatedOrganizations.page,
        total: paginatedOrganizations.total,
        data: paginatedOrganizations.data.map(organizationDto => {
            return OrganizationEmployeesResponseDtoToOrganizationEmployees(organizationDto)
        })
    }
}