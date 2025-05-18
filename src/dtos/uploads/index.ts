import { ErrorDto, HexString } from "../main.dto";

export const UploadOwnerEntity = {
    Project: 'project',
    Employee: 'employee',
    Expert: 'expert',
    Report: 'report',
    Document: 'document',
    Agreement: 'agreement',
} as const;

export const UploadOwnerEntities = Object.values(UploadOwnerEntity);

export type UploadOwnerEntity = typeof UploadOwnerEntity[keyof typeof UploadOwnerEntity];

export type UploadResponseDto = {
  id: HexString,
  url: string,
  mimeType: string,
  extension: string,
  originalName: string,
};

export class CreateUploadDto {
  entity?: {
    project?: string,
    employee?: string,
    expert?: string,
    report?: string,
  };
  owner?: HexString;

}

export type DeleteUploadQueryDto = {
  entity: UploadOwnerEntity;
  owner: HexString;
}

export type CreateUploadResponseDto = {
  success: boolean,
  upload: UploadResponseDto,
} | ErrorDto;

export type DeleteUploadResponseDto = {
  success: boolean,
} | ErrorDto;