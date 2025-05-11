export interface OrganizationsDataType {
    key: string;
    organizationName: {
        en?: string,
        ru?: string, 
        uz?: string
    };
    organizationType: string;
    comment?: string, 
    action: string;
}

export type createOrganizationType = {
    name: {
        ru: string,
        uz: string,
        en: string
    },
    comment?: string,
    organizationType: string
}

export type Organization = {
    id: string,
    name: {
        ru: string,
        uz: string,
        en: string
    },
    comment?: string,
    organizationType: string
}