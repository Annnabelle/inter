import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { Organizer } from "../types/organizer";
import { paginatedOrganizersDtoToPaginatedOrganizers } from "../mappers/organizer.mapper";
import { GetOrganizersResponseDto, OrganizerResponseDto } from "../dtos/organizer";
import axiosInstance from "../utils/axiosInstance";

type OrganizersState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  organizerSearch: Organizer[]
};

const initialState: OrganizersState = {
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  organizerSearch: []
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<OrganizerResponseDto> {
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

export const fetchOrganizerSearch = createAsyncThunk<PaginatedResponse<Organizer>, {query: string},{ rejectValue: string }>(
  "organizer/fetchOrganizerSearch",
  async ({query}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetOrganizersResponseDto>(`${BASE_URL}/organizers/search?query=${query}`);

      if (isSuccessResponse(response.data)) {
        const paginatedOrganizers = paginatedOrganizersDtoToPaginatedOrganizers(response.data);
        return paginatedOrganizers;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения организаций");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении организаций");
    }
  }
);
  

const organizersSlice = createSlice({
  name: "organizer",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizerSearch.rejected, (state) => {
        state.success = false;
      })
      .addCase(fetchOrganizerSearch.pending, (state) => {
        state.success = false;
      })
      .addCase( fetchOrganizerSearch.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Organizer>>) => {
        state.loading = false;
        state.organizerSearch = action.payload.data;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.total = action.payload.total
        state.success = true;
      })
  },
});

export default organizersSlice.reducer;