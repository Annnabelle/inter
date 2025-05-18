import { HexString } from "../dtos/main.dto"
import { ReportType } from "../dtos/reports"
import { Document } from "./uploads"

export type Report = {
    id: HexString,
    name: string,
    type: ReportType,
    startDate: Date,
    endDate: Date,
    responsible?: string,
    comment?: string
    documents?: HexString[];
}

export type Reports = {
    name: string,
    type: ReportType,
    startDate: Date,
    endDate: Date,
    responsible?: string,
    comment?: string
    documents?: HexString[];
}

export type UpdateReport = {
    name?: string;
    type?: ReportType;
    startDate: Date;
    endDate: Date;
    responsible?: string;
    comment?: string;
    documents?: HexString[];
}

export type ReportsWithDocs = {
    id?: HexString,
    name: string;
    type: ReportType;
    startDate: Date;
    endDate: Date;
    responsible?: string;
    comment?: string;
    documents: Document[];
}