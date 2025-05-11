export type ErrorDto = {
    success: boolean;
    errorMessage: {
      ru: string;
      uz: string;
      en: string;
    };
    errorCode: number;
};


export type PaginatedResponseDto<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export type PaginatedResponse<T> = {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

export type HexString = string

export type MultilingualStringDto = {
    ru: string;
    uz: string;
    en: string;
}

export type MultilingualOptionalStringDto = {
    ru?: string;
    uz?: string;
    en?: string;
}

export const OrganizationType = {
  International: "international",
  NonGovInternational: "non_gov",
} as const;
