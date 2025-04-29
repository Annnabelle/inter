import { UserRole } from "../utils/roles";

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  role: UserRole;
  language: string;
  lastLoggedInAt: Date | null;
};

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export type AuthState = {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
};
  
