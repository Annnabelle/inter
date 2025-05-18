import { CountryResponseDto } from "../countries";
import { PaginatedDto } from "../internationalDocuments";
import { ErrorDto, HexString, PaginatedResponseDto } from "../main.dto";
import { UploadResponseDto } from "../uploads";

export const AgreementSortField = {
  Id: '_id',
} as const;

export const AgreementSortFields = Object.values(AgreementSortField);

export type AgreementSortField = typeof AgreementSortField[keyof typeof AgreementSortField];

export type CreateAgreementDto = {
  name: string;
  date: Date;
  countryId?: HexString;
  place?: string;
  signLevel?: string;
  comment?: string;
  files?: HexString[];
}

export type AgreementResponseDto = {
  id: HexString,
  name: string;
  date: Date;
  countryId: HexString | null,
  place?: string,
  signLevel?: string,
  comment?: string,
};

export type DeleteAgreementDto = {
  id: HexString;
}

export type GetAgreementDto = {
    id: HexString;
}

export type GetAgreementsDto = PaginatedDto & {
    organizationId?: HexString;
    countryId?: HexString;
    sortBy?: AgreementSortField;
}

export type SearchAgreementsDto = PaginatedDto & {
    query: string
}

export class UpdateAgreementDto {
  name?: string;
  date?: Date;
  countryId?: HexString;
  place?: string;
  signLevel?: string;
  comment?: string;
  files?: HexString[];
}

export type PopulatedAgreementResponseDto = AgreementResponseDto & {
  country: CountryResponseDto | null,
  files: UploadResponseDto[],
};

export type CreateAgreementResponseDto = {
  success: boolean,
  agreement: AgreementResponseDto,
} | ErrorDto;

export type DeleteAgreementResponseDto = {
  success: boolean,
} | ErrorDto;

export type GetAgreementResponseDto = {
  success: boolean,
  agreement: PopulatedAgreementResponseDto,
} | ErrorDto;

export type GetAgreementsResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<AgreementResponseDto>)| ErrorDto;

export type UpdateAgreementResponseDto = {
  success: boolean,
  agreement: AgreementResponseDto,
} | ErrorDto;