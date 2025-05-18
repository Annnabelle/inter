import { CountryResponseDto } from "../countries";
import { ErrorDto, HexString, PaginatedResponseDto } from "../main.dto";
import { OrganizationResponseDto } from "../organizations";
import { UploadResponseDto } from "../uploads";

export type CreateDocumentDto = {
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

export type DocumentResponseDto = {
  id: HexString,
  name: string;
  date: Date;
  countryId: HexString | null,
  organizationId: HexString | null,
  place?: string,
  signLevel?: string,
  approval?: string,
  comment?: string,
};

export type PopulatedDocumentResponseDto = DocumentResponseDto & {
  organization: OrganizationResponseDto | null,
  country: CountryResponseDto | null,
  files: UploadResponseDto[],
};

export type DeleteDocumentDto = {
  id: HexString;
}

export type GetDocumentDto = {
    id: HexString;
}

export class PaginatedDto {
  page?: number = 1;
  limit?: number = 10;
  sortOrder?: 'asc' | 'desc';
}

export type GetDocumentsDto = PaginatedDto & {
    organizationId?: HexString;
    countryId?: HexString;
    // sortBy?: DocumentSortField;
};


export class UpdateDocumentDto {
  name?: string;
  date?: Date;
  countryId?: HexString;
  organizationId?: HexString;
  place?: string;
  signLevel?: string;
  approval?: string;
  comment?: string;
  files?: HexString[];
}

export type CreateDocumentResponseDto = {
  success: boolean,
  document: DocumentResponseDto,
} | ErrorDto;

export type DeleteDocumentResponseDto = {
  success: boolean,
} | ErrorDto;

export type GetDocumentResponseDto = {
  success: boolean,
  document: PopulatedDocumentResponseDto,
} | ErrorDto;

export type GetDocumentsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<DocumentResponseDto>)| ErrorDto;

export type UpdateDocumentResponseDto = {
  success: boolean,
  document: DocumentResponseDto,
} | ErrorDto;