import { ErrorDto, HexString, PaginatedResponseDto } from "../main.dto";
import { OrganizationResponseDto } from "../organizations";
import { UploadResponseDto } from "../uploads";

export type CreateExpertDto = {
  firstName: string;
  lastName: string;
  spheres: string
  email?: string;
  phone?: string;
  comment?: string;
  organizationId?: HexString;
  events?: HexString[];
  documents?: HexString[];
}

export type ExpertResponseDto = {
  id: HexString,
  spheres: string
  firstName: string,
  lastName: string,
  email?: string,
  phone?: string,
  comment?: string,
};

export type FullExpertResponseDto = {
  id: HexString,
  firstName: string,
  spheres: string
  lastName: string,
  email?: string,
  phone?: string,
  comment?: string,
  organization?: any,
  events: any[],
  documents: any[],
};


export type DeleteExpertDto = {
  id: HexString;
}

export type GetExpertDto = {
    id: HexString;
}

export class UpdateExpertDto {
  firstName?: string;
  spheres?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  comment?: string;
  organizationId?: HexString;
  events?: HexString[];
  documents?: HexString[];
}

export type CreateExpertResponseDto = {
  success: boolean,
  expert: ExpertResponseDto,
} | ErrorDto;

export type DeleteExpertResponseDto = {
  success: boolean,
} | ErrorDto;

export type GetExpertResponseDto = {
  success: boolean,
  expert: FullExpertResponseDto,
} | ErrorDto;

export type GetExpertsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<ExpertResponseDto>)| ErrorDto;

export type UpdateExpertResponseDto = {
  success: boolean,
  expert: ExpertResponseDto,
} | ErrorDto;

export type PopulatedExpertResponseDto = ExpertResponseDto & {
  organization: OrganizationResponseDto | null,
  events: any[],
  documents: UploadResponseDto[],
};