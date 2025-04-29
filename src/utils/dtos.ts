export type ErrorDto = {
    success: boolean;
    errorMessage: {
      ru: string;
      uz: string;
      en: string;
    };
    errorCode: number;
  };

export type LoginRequestDto = {
    email: string,
    password: string,
}
  
  export type UserResponseDto = {
    id: string;
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
  
  export type LoginResponseDto = {
    success: boolean;
    user: UserResponseDto;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  } | ErrorDto;
  
  