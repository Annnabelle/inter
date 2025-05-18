import { HexString } from "../dtos/main.dto";
import { Document } from "./uploads";
// import { Document } from "./documents"

export type Projects = {
    id: HexString,
    name: string,
    organizationId: string,
    comment?: string,
    documents?: string[]
}

export type ProjectWithDocs = {
    id: HexString,
    name: string,
    organizationId: string,
    comment?: string,
    documents?: Document[]
}

export type Project = {
    id: HexString, 
    name: string,
    organizationId: string,
    comment?: string,
}

export type ProjectUpdate = {
    name?: string;
    comment?: string;
    documents?: string[];
}