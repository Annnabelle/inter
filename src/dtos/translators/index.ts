import { TranslatorLanguage } from "../../utils/consts";
import { ErrorDto, HexString, PaginatedResponseDto } from "../main.dto";

export type TranslatorResponseDto = {
    id: HexString,
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string,
    status: string,
    languages: {
      language: TranslatorLanguage,
      rating: number,
    }[],
  };
  
  export type TranslatorCreateDto = {
    firstName: string,
    lastName: string,
    email?: string,
    phone?: string,
    languages: {
      language: TranslatorLanguage,
      rating: number,
    }[],
  };
  
  export type CreateTranslatorResponseDto = {
    success: boolean,
    translator: TranslatorResponseDto,
  } | ErrorDto;
  
  
  export type DeleteTranslatorResponseDto = {
    success: boolean,
  } | ErrorDto;
  
  
  export type GetTranslatorsResponseDto = ({
    success: boolean,
  } & PaginatedResponseDto<TranslatorResponseDto>)| ErrorDto;
  
  export type GetTranslatorResponseDto = {
    success: boolean,
    translator: TranslatorResponseDto,
  } | ErrorDto;
  
  
  export type UpdateTranslatorResponseDto = {
    success: boolean,
    translator: TranslatorResponseDto,
  } | ErrorDto;
  
  export type UpdateTranslatorDto = {
    firstName: string
    lastName: string
    phone?: string
    email?: string
    languages: {
      language: TranslatorLanguage,
      rating: number,
    }[],
  }