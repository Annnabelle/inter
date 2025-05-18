import { PaginatedResponse } from "../dtos/main.dto";
import { CreateReportDto, PopulatedReportResponseDto, ReportResponseDto, UpdateReportDto } from "../dtos/reports";
import { Report, Reports, ReportsWithDocs } from "../types/reports";

export function CreateReportToCreateReportDto(report: Reports): CreateReportDto {
    return {
        name: report.name,
        type: report.type,
        startDate: report.startDate,
        endDate: report.endDate,
        responsible: report.responsible,
        comment: report.comment,
        documents: report.documents
    }
}

export function ReportsResponseDtoToReports(reports: ReportResponseDto): Report {
  return {
        id: reports?.id,
        name: reports?.name,
        type: reports?.type,
        startDate: reports?.startDate,
        endDate: reports?.endDate,
        responsible: reports?.responsible,
        comment: reports?.comment
  };
}

export function ReportResponseDtoToReport(
  report: PopulatedReportResponseDto
): ReportsWithDocs { 
  return {
    name: report.name,
    type: report.type,
    startDate: report.startDate,
    endDate: report.endDate,
    responsible: report.responsible,
    comment: report.comment,
    documents: report.documents.map(document => { 
        return {
            extension: document.extension,
            id: document.id,
            mimeType: document.mimeType,
            originalName: document.originalName,
            url: document.url
        }
    })
  };
}

export function UpdateReportToUpdateReportResponseDto(report: ReportsWithDocs): UpdateReportDto{
    return {
        name: report.name,
        type: report.type,
        startDate: report.startDate,
        endDate: report.endDate,
        responsible: report.responsible,
        comment: report.comment,
        documents: report.documents?.map((document => document.id))
    }
}

export function PaginatedReportsResponseDtoToPaginatedReportsResponse(paginatedReports: PaginatedResponse<ReportResponseDto> ): PaginatedResponse<Report> {
    return{
        limit: paginatedReports.limit,
        page: paginatedReports.page,
        total: paginatedReports.total,
        data: paginatedReports.data.map(reportDto => {
            return ReportsResponseDtoToReports(reportDto)
        })
    }
}