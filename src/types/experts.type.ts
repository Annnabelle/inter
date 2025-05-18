import { HexString } from "../dtos/main.dto";

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