import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { Country } from "../types/countries";
import { CountryResponseDto, GetCountriesResponseDto } from "../dtos/countries";
import { paginatedCountriesDtoToPaginatedCountries } from "../mappers/countries.mapper";
import axiosInstance from "../utils/axiosInstance";

type CountriesState = {
  countries: Country[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  countriesSearch: Country[]
};


const initialState: CountriesState = {
  countries: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  countriesSearch: [],
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<CountryResponseDto> {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    (data as any).success === true &&
    "data" in data &&
    Array.isArray((data as any).data) &&
    "total" in data &&
    "page" in data &&
    "limit" in data
  );
}
  
export const RetrieveCountries = createAsyncThunk<PaginatedResponse<Country>, {page: number, limit: number},{ rejectValue: string }>(
  "countries/RetrieveCountries",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetCountriesResponseDto>(`${BASE_URL}/countries?limit=${limit}&page=${page}&sortOrder=asc`);

      if (isSuccessResponse(response.data)) {
        const paginatedCountries = paginatedCountriesDtoToPaginatedCountries(response.data);
        return paginatedCountries;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения стран");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении стран");
    }
  }
);

export const fetchCountries = createAsyncThunk<PaginatedResponse<Country>, {query: string},{ rejectValue: string }>(
  "countries/searchCountries",
  async ({query}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetCountriesResponseDto>(`${BASE_URL}/countries/search?query=${query}`);
    console.log('q2', query);
      if (isSuccessResponse(response.data)) {
        const countriesSearch = paginatedCountriesDtoToPaginatedCountries(response.data);
        return countriesSearch;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения стран");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении стран");
    }
  }
);
// export const fetchCountries = createAsyncThunk<PaginatedResponse<Search>,{ query: string },{ rejectValue: string }>(
//   'countries/searchCountries',
//   async ({ query }, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<GetCountriesResponseDto>(
//         `http://localhost:4000/countries/search?query=${query}`
//       );

//       if ('success' in response.data && response.data.success) {
//         return paginatedSearchDtoToPaginatedSearch(response.data.data);
//       } else {
//         return rejectWithValue('Search failed');
//       }
//     } catch (error) {
//       return rejectWithValue('Something went wrong');
//     }
//   }
// );



const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(RetrieveCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveCountries.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Country>>) => {
          state.loading = false;
          state.countries = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(RetrieveCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(fetchCountries.pending, (state) => {
        state.success = false;
      })
      .addCase( fetchCountries.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Country>>) => {
        state.loading = false;
        state.countriesSearch = action.payload.data;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.total = action.payload.total
        state.success = true;
      })
      .addCase(fetchCountries.rejected, (state) => {
        state.success = false;
      });
  },
});

export default countriesSlice.reducer;