import { ErrorDto, HexString, PaginatedResponseDto } from "../main.dto";

export type CreateProjectDto = {
  name: string
  organizationId: HexString;
  comment?: string;
  documents?: HexString[];
}

export type ProjectResponseDto = {
  id: HexString,
  name: string,
  comment?: string,
  organizationId: HexString,
};

export type DeleteProjectDto = {
  id: HexString;
}

export type UpdateProjectDto = {
  name?: string;
  comment?: string;
  documents?: HexString[];
}

export type CreateProjectResponseDto = {
  success: boolean,
  project: ProjectResponseDto,
} | ErrorDto;

export type DeleteProjectResponseDto = {
  success: boolean,
} | ErrorDto;

export type GetProjectResponseDto = {
  success: boolean,
  project: ProjectResponseDto,
} | ErrorDto;

export type GetProjectsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<ProjectResponseDto>)| ErrorDto;

export type UpdateProjectResponseDto = {
  success: boolean,
  project: ProjectResponseDto,
} | ErrorDto;