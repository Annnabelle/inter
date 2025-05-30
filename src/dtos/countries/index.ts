import { PaginatedDto } from "../internationalDocuments";
import { ErrorDto, HexString, MultilingualStringDto, PaginatedResponseDto } from "../main.dto";

export type CountryResponseDto = {
  id: HexString,
  name: MultilingualStringDto,
  comment?: string,
};


export type GetCountriesResponseDto = ({
  success: boolean,
} & PaginatedResponseDto<CountryResponseDto>)| ErrorDto;

export type SearchCountriesDto = PaginatedDto & {
    query: string
}