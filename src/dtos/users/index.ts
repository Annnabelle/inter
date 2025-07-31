import { EventResponseDto } from "../events/getEvent";
import { ErrorDto, HexString, PaginatedDto, PaginatedResponseDto } from "../main.dto";

export type LoginRequestDto = {
    email: string,
    password: string,
}

export type GetUsersByVisitsDto = PaginatedDto &{
  startDate: Date;
  endDate: Date;
}

export type GetUserByVisitsDto = {
  startDate: Date;
  endDate: Date;
  eventsSortOrder: 'asc' | 'desc';
}
  
export type UserResponseDto = {
  id: HexString;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  role: {
    id: string;
    name: {
      ru: string;
      uz: string;
      en: string;
    };
    alias: string;
  };
  language: string;
  lastLoggedInAt: string | null;
};

export type UserRegisterRequestDto = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    role: string;
    password: string;
    language: string;
  } | ErrorDto;
    
  
export type RegisterResponse = {
    success: boolean;
    user: UserResponseDto;
} | ErrorDto;


export type LoginResponseDto = {
    success: boolean;
    user: UserResponseDto;
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
} | ErrorDto;

export type GetUsersResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<UserResponseDto>)| ErrorDto;

export type GetUserResponseDto = {
  success: boolean,
  user: UserResponseDto,
} | ErrorDto;

export type DeleteUserResponseDto = {
  success: boolean,
} | ErrorDto;

export type UpdateUserResponseDto = {
  success: boolean,
  user: UserResponseDto,
} | ErrorDto;
  
export type UserRequestUpdateDto = {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  language: string,
} | ErrorDto


export type UserWithEventsResponseDto = {
  id: HexString,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  foreignVisitsCount: number,
  foreignVisits: EventResponseDto[],
};

export type GetStatsByUsersResponseDto = {
  success: boolean,
}  & PaginatedResponseDto<UserWithEventsResponseDto>| ErrorDto;

export type GetStatsByUserResponseDto = {
  success: boolean,
  user: UserWithEventsResponseDto | null,
} | ErrorDto;