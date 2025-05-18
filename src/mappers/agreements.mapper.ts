import { AgreementResponseDto, CreateAgreementDto, PopulatedAgreementResponseDto, UpdateAgreementDto } from "../dtos/agreements";
import { PaginatedResponse } from "../dtos/main.dto";
import { AgreementDocument, AgreementDocuments, AgreementDocumentsWithDocs, UpdateAgreementDocument } from "../types/agreements";

export function CreateAgreementDocumentToCreateAgreementDocumentDto(AgreementDocument: AgreementDocuments): CreateAgreementDto {
    return {
        name: AgreementDocument.name,
        date: AgreementDocument.date,
        countryId: AgreementDocument.countryId,
        place: AgreementDocument.place,
        signLevel: AgreementDocument.signLevel,
        comment: AgreementDocument.comment,
        files: AgreementDocument.files
    }
}

export function AgreementDocumentResponseDtoToAgreementDocument(AgreementDocument: PopulatedAgreementResponseDto): AgreementDocumentsWithDocs {
  return {
    id: AgreementDocument.id,
    name: AgreementDocument.name,
    date: AgreementDocument.date,
    countryId: AgreementDocument.countryId,
    place: AgreementDocument.place,
    signLevel: AgreementDocument.signLevel,
    comment: AgreementDocument.comment,
    files: AgreementDocument.files.map(document => { 
        return {
            extension: document.extension,
            id: document.id,
            mimeType: document.mimeType,
            originalName: document.originalName,
            url: document.url
        }
    }),
    country: AgreementDocument.country ? {
        id: AgreementDocument.country.id,
        name: {
            ru: AgreementDocument.country.name.ru,
            en: AgreementDocument.country.name.en,
            uz: AgreementDocument.country.name.uz,
        },
        comment: AgreementDocument.country.comment
    } : null
  };
}

export function AgreementDocumentsResponseDtoToAgreementDocumentsResponse(AgreementDocument: AgreementResponseDto): AgreementDocument{
  return {
    id: AgreementDocument?.id,
    name: AgreementDocument?.name,
    date: AgreementDocument?.date,
    countryId: AgreementDocument?.countryId,
    place: AgreementDocument?.place,
    signLevel: AgreementDocument?.signLevel,
    comment: AgreementDocument?.comment,
  };
}


export function UpdateAgreementDocumentToUpdateAgreementDocumentDto(AgreementDocument: UpdateAgreementDocument): UpdateAgreementDto{
    return {
        name: AgreementDocument.name,
        date: AgreementDocument.date,
        countryId: AgreementDocument.countryId,
        place: AgreementDocument.place,
        signLevel: AgreementDocument.signLevel,
        comment: AgreementDocument.comment,
        files: AgreementDocument?.files?.map((file => file.id))
    }
}

export function PaginatedAgreementDocumentsDtoToPaginatedAgreementDocuments(AgreementDocuments: PaginatedResponse<AgreementResponseDto> ): PaginatedResponse<AgreementDocument> {
    return{
        limit: AgreementDocuments.limit,
        page: AgreementDocuments.page,
        total: AgreementDocuments.total,
        data: AgreementDocuments.data.map(AgreementDocument => {
            return AgreementDocumentsResponseDtoToAgreementDocumentsResponse(AgreementDocument)
        })
    }
}