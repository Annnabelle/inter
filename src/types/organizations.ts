import { HexString } from "../dtos/main.dto";

export interface Organizations {
    key: HexString;
    organizationName: {
        en?: string,
        ru?: string, 
        uz?: string
    };
    organizationType: string;
    comment?: string, 
    action: string;
}

export type CreateOrganization = {
    name: {
        ru: string,
        uz: string,
        en: string
    },
    comment?: string,
    organizationType: string
}

export type Organization = {
    id: HexString,
    name: {
        ru: string,
        uz: string,
        en: string
    },
    comment?: string,
    organizationType: string
}