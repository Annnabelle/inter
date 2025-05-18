import { PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto"
import { TranslatorCreateDto, TranslatorResponseDto, UpdateTranslatorDto } from "../dtos/translators"
import { Translator } from "../types/translator"


  export function mapTranslatorDtoToTranslator(translatorDto: TranslatorResponseDto): Translator{
      return {
        id: translatorDto.id,
        firstName: translatorDto.firstName,
        lastName: translatorDto.lastName,
        email: translatorDto.email,
        phone: translatorDto.phone,
        status: translatorDto.status,
        languages: translatorDto.languages.map(lang => {
          return {
              language: lang.language,
              rating: lang.rating,
          }
        }),
      }
  }

  export function mapTranslatorToUpdateTranslatorDto(translator: Translator ): UpdateTranslatorDto {
    return {
      firstName: translator.firstName,
      lastName: translator.lastName,
      email: translator.email,
      phone: translator.phone,
      languages: translator.languages.map(langObj => {
        return {
          language: langObj.language,
          rating: langObj.rating,
        }
      }),
    }
  };
  

export function mapTranslatorToTranslatorCreateDto(translator: Translator): TranslatorCreateDto {
  return {
    firstName: translator.firstName,
    lastName: translator.lastName,
    email: translator.email,
    phone: translator.phone,
    languages: translator.languages.map(langObj => {
      return {
        language: langObj.language,
        rating: langObj.rating,
      }
    }),
  }
};

export function mapPaginatedTranslatorsDtoToPaginatedTranslators(paginatedDto: PaginatedResponseDto<TranslatorResponseDto>): PaginatedResponse<Translator>{
  return {
    page: paginatedDto.page,
    limit: paginatedDto.limit,
    total: paginatedDto.total,
    data: paginatedDto.data.map(translatorDto => {
      return mapTranslatorDtoToTranslator(translatorDto)
    })
  }
}

