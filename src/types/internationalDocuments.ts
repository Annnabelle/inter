import { CountryResponseDto } from "../dtos/countries";
import { HexString } from "../dtos/main.dto"
import { OrganizationResponseDto } from "../dtos/organizations";
import { Document } from "./uploads";

export type InternationalDocument = {
    id: HexString,
    name: string;
    date: Date;
    countryId: HexString | null,
    organizationId: HexString | null,
    place?: string,
    signLevel?: string,
    approval?: string,
    comment?: string,
}

export type InternationalDocuments = {
    name: string;
    date: Date;
    countryId?: HexString;
    organizationId?: HexString;
    place?: string;
    signLevel?: string;
    approval?: string;
    comment?: string;
    files: HexString[];
}

export type UpdateInternationalDocument = {
    id: HexString,
    name?: string;
    date?: Date;
    countryId?: HexString;
    organizationId?: HexString;
    place?: string;
    signLevel?: string;
    approval?: string;
    comment?: string;
    files?: Document[];
}

export type InternationalDocumentsWithDocs = {
    id: HexString,
    name: string;
    date: Date;
    countryId: HexString | null;
    organizationId: HexString | null;
    place?: string;
    signLevel?: string;
    approval?: string;
    comment?: string;
    files: Document[];
    organization: OrganizationResponseDto | null,
    country: CountryResponseDto | null,
}

export interface InternationalDocumentsTableDataType{
    // id: HexString,
    key: string,
    name: string;
    date: string;
    countryId: HexString | null,
    organizationId: HexString | null,
    place?: string,
    signLevel?: string,
    approval?: string,
    comment?: string,
}