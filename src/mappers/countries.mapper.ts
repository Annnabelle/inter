import { CountryResponseDto } from "../dtos/countries";
import { PaginatedResponse } from "../dtos/main.dto";
import { Country } from "../types/countries";

export function CountriesResponseDtoToCountriesResponse(country: CountryResponseDto): Country {
  return {
    id: country.id,
    name: {
        uz: country.name.uz,
        en: country.name.en,
        ru: country.name.ru,
    },
    comment: country.comment,
  };
}


export function paginatedCountriesDtoToPaginatedCountries(paginatedCountry: PaginatedResponse<CountryResponseDto> ): PaginatedResponse<Country> {
    return{
        limit: paginatedCountry.limit,
        page: paginatedCountry.page,
        total: paginatedCountry.total,
        data: paginatedCountry.data.map(country => {
            return CountriesResponseDtoToCountriesResponse(country)
        })
    }
}