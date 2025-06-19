
import { ErrorDto, HexString, MultilingualStringDto, PaginatedDto, PaginatedResponseDto } from "../main.dto";

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