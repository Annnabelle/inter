import { PaginatedResponse } from "../dtos/main.dto";
import { createOrganizationEmployeeDto, OrganizationEmployeeResponseDto, UpdateOrganizationEmployeeDto } from "../dtos/organizationEmployee";
import { CreateProjectDto, GetProjectsResponseDto, ProjectResponseDto, UpdateProjectDto } from "../dtos/projects";
import { organizationEmployee, organizationEmployees, organizationEmployeesWithDocs } from "../types/organizationEmployee";
import { project, projects, projectUpdate } from "../types/projects";

export function createOrganizationProjectToCreateOrganizationProjectDto(project: projects): CreateProjectDto {
    return {
        name: project.name,
        organizationId: project.organizationId,
        comment: project.comment,
        documents: project.documents
    }
}

export function organizationProjectResponseDtoToOrganizationProject(project: ProjectResponseDto): project {
  return {
    id: project?.id,
    name: project?.name,
    organizationId: project?.organizationId,
    comment: project?.comment,
  };
}

export function updateOrganizationsProjectToUpdateOrganizationProjectDto(projectUpdate: projectUpdate): UpdateProjectDto{
    return {
        name: projectUpdate.name,
        comment: projectUpdate.comment,
        documents: projectUpdate.documents,
    }
}

export function paginatedOrganizationsProjectsDtoToPaginatedOrganizationsProjects(paginatedOrganizationsProjects: PaginatedResponse<ProjectResponseDto> ): PaginatedResponse<projects> {
    return{
        limit: paginatedOrganizationsProjects.limit,
        page: paginatedOrganizationsProjects.page,
        total: paginatedOrganizationsProjects.total,
        data: paginatedOrganizationsProjects.data.map(paginatedOrganizationsProject => {
            return organizationProjectResponseDtoToOrganizationProject(paginatedOrganizationsProject)
        })
    }
}