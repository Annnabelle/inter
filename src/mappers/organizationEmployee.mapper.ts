import { PaginatedResponse } from "../dtos/main.dto";
import { createOrganizationEmployeeDto, OrganizationEmployeeResponseDto, UpdateOrganizationEmployeeDto } from "../dtos/organizationEmployee";
import { organizationEmployee, organizationEmployees, organizationEmployeesWithDocs } from "../types/organizationEmployee";

export function createOrganizationEmployeeToCreateOrganizationEmployeeDto(organizationEmployee: organizationEmployees): createOrganizationEmployeeDto {
    return {
        firstName: organizationEmployee.firstName,
        lastName: organizationEmployee.lastName,
        phone: organizationEmployee.phone,
        email: organizationEmployee.email,
        position: organizationEmployee.position,
        comment: organizationEmployee.comment,
        organizationId: organizationEmployee.organizationId
    }
}

export function organizationEmployeeResponseDtoToOrganizationEmployee(dto: OrganizationEmployeeResponseDto): organizationEmployee {
  return {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    phone: dto.phone,
    email: dto.email,
    position: dto.position,
    comment: dto.comment,
    organizationId: dto.organizationId
  };
}

export function updateOrganizationsEmployeesToUpdateOrganizationEmployeesDto(organizationEmployee: organizationEmployeesWithDocs): UpdateOrganizationEmployeeDto{
    return {
        firstName: organizationEmployee.firstName,
        lastName: organizationEmployee.lastName,
        phone: organizationEmployee.phone,
        email: organizationEmployee.email,
        position: organizationEmployee.position,
        comment: organizationEmployee.comment,
        documents: organizationEmployee.documents,
    }
}

export function paginatedOrganizationsEmployeesDtoToPaginatedOrganizationsEmployees(paginatedOrganizations: PaginatedResponse<OrganizationEmployeeResponseDto> ): PaginatedResponse<organizationEmployee> {
    return{
        limit: paginatedOrganizations.limit,
        page: paginatedOrganizations.page,
        total: paginatedOrganizations.total,
        data: paginatedOrganizations.data.map(organizationDto => {
            return organizationEmployeeResponseDtoToOrganizationEmployee(organizationDto)
        })
    }
}