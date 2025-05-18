import { ErrorDto, HexString, MultilingualOptionalStringDto, MultilingualStringDto, PaginatedResponseDto } from "../main.dto";

export type OrganizationResponseDto = {
  id: HexString,
  name: {
    ru: string,
    uz: string,
    en: string,
  },
  comment?: string,
  type: string
};

export type CreateOrganizationDto = {
  name: MultilingualStringDto,
  comment?: string;
  type: string;
}

export type DeleteOrganizationDto = {
  id: HexString;
}

export type GetOrganizationDto = {
    id: HexString;
}

// export class GetOrganizationsDto extends PaginatedDto{
//     type: OrganizationType;
//     sortBy?: OrganizationSortField;
// }

export type UpdateOrganizationDto = {
  name: MultilingualOptionalStringDto;
  comment?: string;
  type: string;
}

export type CreateOrganizationResponseDto = {
  success: boolean,
  organization: OrganizationResponseDto,
} | ErrorDto;

export type DeleteOrganizationResponseDto = {
  success: boolean,
} | ErrorDto;

export type GetOrganizationResponseDto = {
  success: boolean,
  organization: OrganizationResponseDto,
} | ErrorDto;

export type GetOrganizationsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<OrganizationResponseDto>)| ErrorDto;

export type UpdateOrganizationResponseDto = {
  success: boolean,
  organization: OrganizationResponseDto,
} | ErrorDto;