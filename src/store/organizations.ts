import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { createOrganizationType, Organization } from "../types/organizations";
import { CreateOrganizationResponseDto, GetOrganizationsResponseDto, OrganizationResponseDto } from "../dtos/organizations";
import { createOrganizationToCreateOrganizationDto, organizationResponseDtoToOrganization, paginatedOrganizationsDtoToPaginatedOrganizations, updateOrganizationsToUpdateOrganizationDto } from "../mappers/organizations.mapper";
import axios from "axios";

type OrganizationsState = {
  nonGovOrganizations: Organization[];
  internationalOrganizations: Organization[];
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  organization: Organization | null
};

const initialState: OrganizationsState = {
  nonGovOrganizations: [],
  internationalOrganizations: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  organization: null
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<OrganizationResponseDto> {
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
  
export const retrieveNonGovOrganizations = createAsyncThunk<PaginatedResponse<Organization>, {page: number, limit: number},{ rejectValue: string }>(
  "organizations/retrieveNonGovOrganizations",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetOrganizationsResponseDto>(`${BASE_URL}/organizations?page=${page}&limit=${limit}&type=non_gov`);

      if (isSuccessResponse(response.data)) {
        const paginatedOrganizations = paginatedOrganizationsDtoToPaginatedOrganizations(response.data);
        return paginatedOrganizations;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения организаций");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении организаций");
    }
  }
);

export const retrieveInternationalOrganizations = createAsyncThunk<PaginatedResponse<Organization>, {page: number, limit: number},{ rejectValue: string }>(
  "organizations/retrieveInternationalOrganizations",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetOrganizationsResponseDto>(`${BASE_URL}/organizations?page=${page}&limit=${limit}&type=international`);

      if (isSuccessResponse(response.data)) {
        const paginatedOrganizations = paginatedOrganizationsDtoToPaginatedOrganizations(response.data);
        return paginatedOrganizations;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения организаций");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении организаций");
    }
  }
);


export const updateOrganization = createAsyncThunk<Organization, Organization, { rejectValue: string }>(
  'organizations/updateOrganization',
  async (data, { rejectWithValue }) => {
    try {
      const dto = updateOrganizationsToUpdateOrganizationDto(data);
      const response = await axios.patch(`${BASE_URL}/organizations/${data.id}`, dto);
      if ('success' in response.data && response.data.success) {
        return organizationResponseDtoToOrganization(response.data.organization); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления организации');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const createOrganization = createAsyncThunk(
  'organizations/createOrganization',
  async (data: createOrganizationType, {rejectWithValue}) => {
    try {
      const dto = createOrganizationToCreateOrganizationDto(data);
      const response = await axios.post<CreateOrganizationResponseDto>(`${BASE_URL}/organizations`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления организации')
      }
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)

export const deleteOrganization = createAsyncThunk(
  'organizations/deleteOrganization',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axios.delete(`${BASE_URL}/organizations/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления организации')
    }
  }
)
  

const organizationsSlice = createSlice({
  name: "organizations",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveNonGovOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( retrieveNonGovOrganizations.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Organization>>) => {
          state.loading = false;
          state.nonGovOrganizations = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(retrieveNonGovOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(retrieveInternationalOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( retrieveInternationalOrganizations.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Organization>>) => {
          state.loading = false;
          state.internationalOrganizations = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(retrieveInternationalOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(createOrganization.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createOrganization.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
      .addCase(updateOrganization.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganization.fulfilled, (state, action: PayloadAction<Organization>) => {
        state.loading = false;
        state.organization = action.payload;
      })
      .addCase(updateOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(deleteOrganization.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.nonGovOrganizations = state.nonGovOrganizations.filter(nonGovOrganization => nonGovOrganization.id !== String(action.meta.arg));
        state.internationalOrganizations = state.internationalOrganizations.filter(internationalOrganization => internationalOrganization.id !== String(action.meta.arg));
      })
      .addCase(deleteOrganization.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default organizationsSlice.reducer;