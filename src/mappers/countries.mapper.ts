import { CountryResponseDto, SearchCountriesDto } from "../dtos/countries";
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

// export function SearchDocumentToSearchDocumentDto(search: SearchCountry): SearchCountriesDto {
//   return{
//     id: search.id,
//     name: {
//       ru: search.
//     }
//   }
// }


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

// export function paginatedSearchDtoToPaginatedSearch(search: PaginatedResponse<SearchCountriesDto>): PaginatedResponse<Search> {
//    return{
//         limit: search.limit,
//         page: search.page,
//         total: search.total,
//         data: search.data.map(countrySearch => {
//             return SearchDocumentToSearchDocumentDto(countrySearch)
//         })
//     }
// }