import { UploadResponseDto } from "../uploads";
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


export type PopulatedProjectResponseDto = ProjectResponseDto & {
  documents: UploadResponseDto[],
};

export type GetProjectResponseDto = {
  success: boolean,
  project: PopulatedProjectResponseDto,
} | ErrorDto;


export type CreateProjectResponseDto = {
  success: boolean,
  project: ProjectResponseDto,
} | ErrorDto;

export type DeleteProjectResponseDto = {
  success: boolean,
} | ErrorDto;


export type GetProjectsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<ProjectResponseDto>)| ErrorDto;

export type UpdateProjectResponseDto = {
  success: boolean,
  project: ProjectResponseDto,
} | ErrorDto;