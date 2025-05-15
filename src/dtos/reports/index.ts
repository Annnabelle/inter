import { UploadResponseDto } from "../documents";
import { ErrorDto, HexString, PaginatedResponseDto } from "../main.dto";

export const ReportType = {
  Weekly: 'weekly',
  Monthly: 'monthly',
  Quarterly: 'quarterly',
  SemiAnnual: 'semi_annual',
  Annual: 'annual',
} as const;

export const ReportTypes = Object.values(ReportType);

export type ReportType = typeof ReportType[keyof typeof ReportType];

export type ReportResponseDto = {
  id: HexString,
  name: string,
  type: ReportType,
  startDate: Date,
  endDate: Date,
  responsible?: string,
  comment?: string,
};

export type CreateReportDto = {
  name: string;
  type: ReportType;
  startDate: Date;
  endDate: Date;
  responsible?: string;
  comment?: string;
  documents?: HexString[];
}

export type DeleteReportDto = {
  id: HexString;
}


export type GetReportDto = {
    id: HexString;
}

export type UpdateReportDto = {
  name?: string;
  type?: ReportType;
  startDate: Date;
  endDate: Date;
  responsible?: string;
  comment?: string;
  documents?: HexString[];
}

export type CreateReportResponseDto = {
  success: boolean,
  report: ReportResponseDto,
} | ErrorDto;

export type DeleteReportResponseDto = {
  success: boolean,
} | ErrorDto;

export type PopulatedReportResponseDto = ReportResponseDto & {
  documents: UploadResponseDto[],
};

export type GetReportResponseDto = {
  success: boolean,
  report: PopulatedReportResponseDto,
} | ErrorDto;

export type GetReportsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<ReportResponseDto>)| ErrorDto;


export type UpdateReportResponseDto = {
  success: boolean,
  report: ReportResponseDto,
} | ErrorDto;