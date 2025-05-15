import { ErrorDto, HexString } from "../main.dto";

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

export type CreateUploadResponseDto = {
  success: boolean,
  upload: UploadResponseDto,
} | ErrorDto;

export type DeleteUploadResponseDto = {
  success: boolean,
} | ErrorDto;