import { HexString } from "../dtos/main.dto";
import { Document } from "./uploads";

export type ExpertsType = {
    spheres: string, 
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    comment?: string;
    organizationId?: string;
    events?: string[];
    documents?: string[];
}

export type Expert = {
    spheres: string, 
    id: HexString,
    firstName: string;
    lastName: string;
    email?: string;
    phone?: string;
    comment?: string;
}

export type ExpertWithDocs = {
    id: HexString,
    spheres: string
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string,
    comment?: string,
    organization?: {
        id: HexString,
        name: {
            ru: string,
            uz: string,
            en: string,
        },
        comment?: string,
        type: string
    } | null,
    events: any[],
    files: Document[]
}