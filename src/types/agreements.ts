import { CountryResponseDto } from "../dtos/countries";
import { HexString } from "../dtos/main.dto"
import { OrganizationResponseDto } from "../dtos/organizations";
import { Document } from "./uploads";

export type AgreementDocument = {
    id: HexString,
    name: string;
    date: Date;
    countryId: HexString | null,
    place?: string,
    signLevel?: string,
    comment?: string,
}

export type AgreementDocuments = {
    name: string;
    date: Date;
    countryId?: HexString;
    place?: string;
    signLevel?: string;
    comment?: string;
    files?: HexString[];
}

export type UpdateAgreementDocument = {
    id: HexString,
    name?: string;
    date?: Date;
    countryId?: HexString;
    place?: string;
    signLevel?: string;
    comment?: string;
    files?: Document[];
    
}

export type AgreementDocumentsWithDocs = {
    id: HexString,
    name: string;
    date: Date;
    countryId?: HexString | null;
    place?: string;
    signLevel?: string;
    comment?: string;
    files: Document[];
    country: CountryResponseDto | null,
}

export interface InternationalTreatiesTableDataType{
    key: string,
    name: string,
    date: string,
    place?: string,
    comment?: string,
    signLevel?: string
}