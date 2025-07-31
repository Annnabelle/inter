import { HexString, PaginatedDto } from "../dtos/main.dto";
import { UserResponseDto } from "../dtos/users";

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export type UserLoginType = {
  email: string,
  password: string
}

export type AuthState = {
    user: UserResponseDto | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
    status?: string | null
    success?: boolean | null
    sessionStart?: number | null
    isAuthenticated?: boolean
};

export type User = {
    id: HexString;
    key?: string,
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    status: string;
    role: {
      id?: HexString;
      name?: {
        ru?: string;
        uz?: string;
        en?: string;
      };
      alias?: string;
    };
    language: string;
    lastLoggedInAt: string | null;
}


export type UserRegister = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  role: string;
  password: string;
  language: string;
}

export type GetUsersByVisits = PaginatedDto &{
  startDate: Date;
  endDate: Date;
}

export type GetUserByVisits = {
  startDate: Date;
  endDate: Date;
  eventsSortOrder: 'asc' | 'desc';
}


  
