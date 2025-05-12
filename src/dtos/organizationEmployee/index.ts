import { ErrorDto, HexString, PaginatedResponseDto } from "../main.dto";

export type createOrganizationEmployeeDto = {
  firstName: string;
  lastName: string;
  organizationId: HexString;
  email: string;
  phone: string;
  comment?: string;
  position?: string;
  documents?: HexString[];
}

export type OrganizationEmployeeResponseDto = {
  id: HexString,
  firstName: string,
  lastName: string,
  phone?: string,
  email?: string,
  position?: string,
  comment?: string,
  organizationId: HexString,
};

export type DeleteOrganizationEmployeeDto = {
  id: HexString;
}

export type GetOrganizationEmployeeDto = {
    id: HexString;
}

export class UpdateOrganizationEmployeeDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  comment?: string;
  position?: string;
  documents?: HexString[];
}

export type CreateOrganizationEmployeeResponseDto = {
  success: boolean,
  employee: OrganizationEmployeeResponseDto,
} | ErrorDto;

export type DeleteOrganizationEmployeeResponseDto = {
  success: boolean,
} | ErrorDto;

export type GetOrganizationEmployeeResponseDto = {
  success: boolean,
  employee: OrganizationEmployeeResponseDto,
} | ErrorDto;

export type GetOrganizationEmployeesResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<OrganizationEmployeeResponseDto>)| ErrorDto;

export type UpdateOrganizationEmployeeResponseDto = {
  success: boolean,
  employee: OrganizationEmployeeResponseDto,
} | ErrorDto;