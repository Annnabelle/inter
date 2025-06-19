import { CreateDocumentDto, DocumentResponseDto, PopulatedDocumentResponseDto, UpdateDocumentDto } from "../dtos/internationalDocuments";
import { PaginatedResponse } from "../dtos/main.dto";
import { InternationalDocument, InternationalDocuments, InternationalDocumentsWithDocs, UpdateInternationalDocument } from "../types/internationalDocuments";

export function CreateInternationalDocumentToCreateInternationalDocumentDto(InternationalDocument: InternationalDocuments): CreateDocumentDto {
    return {
        name: InternationalDocument.name,
        date: InternationalDocument.date,
        countryId: InternationalDocument.countryId,
        organizationId: InternationalDocument.organizationId,
        place: InternationalDocument.place,
        signLevel: InternationalDocument.signLevel,
        approval: InternationalDocument.approval,
        comment: InternationalDocument.comment,
        files: InternationalDocument.files
    }
}

export function InternationalDocumentResponseDtoToInternationalDocument(InternationalDocument: PopulatedDocumentResponseDto): InternationalDocumentsWithDocs {
  return {
    id: InternationalDocument.id,
    name: InternationalDocument.name,
    date: InternationalDocument.date,
    countryId: InternationalDocument.countryId,
    organizationId: InternationalDocument.organizationId,
    place: InternationalDocument.place,
    signLevel: InternationalDocument.signLevel,
    approval: InternationalDocument.approval,
    comment: InternationalDocument.comment,
    files: InternationalDocument.files.map(document => { 
        return {
            extension: document.extension,
            id: document.id,
            mimeType: document.mimeType,
            originalName: document.originalName,
            url: document.url
        }
    }),
    organization: InternationalDocument.organization ? {
        comment: InternationalDocument.organization.comment,
        name: {
            ru: InternationalDocument.organization.name.ru,
            en: InternationalDocument.organization.name.en,
            uz: InternationalDocument.organization.name.uz,
        },
        type: InternationalDocument.organization.type,
        id: InternationalDocument.organization.id,
    } : null,
    country: InternationalDocument.country ? {
        id: InternationalDocument.country.id,
        name: {
            ru: InternationalDocument.country.name.ru,
            en: InternationalDocument.country.name.en,
            uz: InternationalDocument.country.name.uz,
        },
        comment: InternationalDocument.country.comment
    } : null
  };
}

export function InternationalDocumentsResponseDtoToInternationalDocumentsResponse(InternationalDocument: DocumentResponseDto): InternationalDocument{
  return {
    id: InternationalDocument?.id,
    name: InternationalDocument?.name,
    date: InternationalDocument?.date,
    countryId: InternationalDocument?.countryId,
    organizationId: InternationalDocument?.organizationId,
    place: InternationalDocument?.place,
    signLevel: InternationalDocument?.signLevel,
    approval: InternationalDocument?.approval,
    comment: InternationalDocument?.comment,
  };
}


export function UpdateInternationalDocumentToUpdateInternationalDocumentDto(InternationalDocument: UpdateInternationalDocument): UpdateDocumentDto{
    return {
        name: InternationalDocument.name,
        date: InternationalDocument.date,
        countryId: InternationalDocument.countryId,
        organizationId: InternationalDocument.organizationId,
        place: InternationalDocument.place,
        signLevel: InternationalDocument.signLevel,
        approval: InternationalDocument.approval,
        comment: InternationalDocument.comment,
        files: InternationalDocument?.files?.map((file => file.id))
    }
}

export function PaginatedInternationalDocumentsDtoToPaginatedInternationalDocuments(InternationalDocuments: PaginatedResponse<DocumentResponseDto> ): PaginatedResponse<InternationalDocument> {
    return{
        limit: InternationalDocuments.limit,
        page: InternationalDocuments.page,
        total: InternationalDocuments.total,
        data: InternationalDocuments.data.map(InternationalDocument => {
            return InternationalDocumentsResponseDtoToInternationalDocumentsResponse(InternationalDocument)
        })
    }
}