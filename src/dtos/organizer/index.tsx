import { ErrorDto, HexString, PaginatedResponseDto } from "../main.dto";

export type OrganizerResponseDto = {
  id: HexString,
  name: string
};

export type GetOrganizersResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<OrganizerResponseDto>)| ErrorDto;