import { PaginatedResponse } from "../dtos/main.dto";
import { CreateProjectDto, PopulatedProjectResponseDto, ProjectResponseDto, UpdateProjectDto } from "../dtos/projects";
import { Project, Projects, ProjectUpdate, ProjectWithDocs } from "../types/projects";

export function createOrganizationProjectToCreateOrganizationProjectDto(project: Projects): CreateProjectDto {
    return {
        name: project.name,
        organizationId: project.organizationId,
        comment: project.comment,
        documents: project.documents
    }
}

export function organizationProjectResponseDtoToOrganizationProject(project: ProjectResponseDto): Project {
  return {
    id: project?.id,
    name: project?.name,
    organizationId: project?.organizationId,
    comment: project?.comment,
  };
}

export function RetrieveProjectDtoToRetrieveProject(
  dto: PopulatedProjectResponseDto
): ProjectWithDocs { 
  return {
    id: dto?.id,
    name: dto.name,
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

export function updateOrganizationsProjectToUpdateOrganizationProjectDto(projectUpdate: ProjectUpdate): UpdateProjectDto{
    return {
        name: projectUpdate.name,
        comment: projectUpdate.comment,
        documents: projectUpdate.documents,
    }
}

export function paginatedOrganizationsProjectsDtoToPaginatedOrganizationsProjects(paginatedOrganizationsProjects: PaginatedResponse<ProjectResponseDto> ): PaginatedResponse<Projects> {
    return{
        limit: paginatedOrganizationsProjects.limit,
        page: paginatedOrganizationsProjects.page,
        total: paginatedOrganizationsProjects.total,
        data: paginatedOrganizationsProjects.data.map(paginatedOrganizationsProject => {
            return organizationProjectResponseDtoToOrganizationProject(paginatedOrganizationsProject)
        })
    }
}