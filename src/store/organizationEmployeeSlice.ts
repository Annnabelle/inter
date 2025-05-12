import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { createOrganizationType, Organization } from "../types/organizations";
import { CreateOrganizationResponseDto, GetOrganizationsResponseDto, OrganizationResponseDto } from "../dtos/organizations";
import { createOrganizationToCreateOrganizationDto, organizationResponseDtoToOrganization, paginatedOrganizationsDtoToPaginatedOrganizations, updateOrganizationsToUpdateOrganizationDto } from "../mappers/organizations.mapper";
import axios from "axios";
import { organizationEmployee, organizationEmployees, organizationEmployeesWithDocs } from "../types/organizationEmployee";
import { createOrganizationEmployeeDto, CreateOrganizationEmployeeResponseDto, DeleteOrganizationEmployeeDto, GetOrganizationEmployeeResponseDto, OrganizationEmployeeResponseDto } from "../dtos/organizationEmployee";
import { createOrganizationEmployeeToCreateOrganizationEmployeeDto, organizationEmployeeResponseDtoToOrganizationEmployee, paginatedOrganizationsEmployeesDtoToPaginatedOrganizationsEmployees, updateOrganizationsEmployeesToUpdateOrganizationEmployeesDto } from "../mappers/organizationEmployee.mapper";

type OrganizationsEmployeesState = {
  organizationsEmployees: organizationEmployee[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  organizationsEmployee: organizationEmployee | null
};

const initialState: OrganizationsEmployeesState = {
  organizationsEmployees: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  organizationsEmployee: null
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<OrganizationEmployeeResponseDto> {
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
  
export const retrieveOrganizationsEmployees = createAsyncThunk<PaginatedResponse<organizationEmployee>, {page: number, limit: number, id: string},{ rejectValue: string }>(
  "organizationsEmployees/retrieveOrganizationsEmployees",
  async ({page, limit, id}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetOrganizationEmployeeResponseDto>(`${BASE_URL}/organization-employees?limit=${limit}&page=${page}&organizationId=${id}`);
      console.log(response.data);
      
      if (isSuccessResponse(response.data)) {
        const paginatedOrganizations = paginatedOrganizationsEmployeesDtoToPaginatedOrganizationsEmployees(response.data);
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



export const updateOrganizationsEmployees = createAsyncThunk<organizationEmployee, organizationEmployeesWithDocs, { rejectValue: string }>(
  'organizationsEmployees/updateOrganizationsEmployees',
  async (data, { rejectWithValue }) => {
    try {
      const dto = updateOrganizationsEmployeesToUpdateOrganizationEmployeesDto(data);
      const response = await axios.patch(`${BASE_URL}/organization-employees/${data.id}`, dto);
      console.log("response.data ", response.data );
      
      if ('success' in response.data && response.data.success) {
        console.log(response.data);
        
        return organizationEmployeeResponseDtoToOrganizationEmployee(response.data.employee); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления организации');
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const createOrganizationsEmployees = createAsyncThunk(
  'organizationsEmployees/createOrganizationsEmployees',
  async (data: organizationEmployees, {rejectWithValue}) => {
    try {
      const dto = createOrganizationEmployeeToCreateOrganizationEmployeeDto(data);
      const response = await axios.post<CreateOrganizationEmployeeResponseDto>(`${BASE_URL}/organization-employees`, dto);
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

export const deleteOrganizationsEmployees = createAsyncThunk(
  'organizationsEmployees/deleteOrganizationsEmployees',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axios.delete<DeleteOrganizationEmployeeDto>(`${BASE_URL}/organization-employees/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления сотрудника')
    }
  }
)
  

const organizationsEmployeesSlice = createSlice({
  name: "organizationsEmployees",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveOrganizationsEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( retrieveOrganizationsEmployees.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<organizationEmployee>>) => {
          state.loading = false;
          state.organizationsEmployees = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(retrieveOrganizationsEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(createOrganizationsEmployees.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createOrganizationsEmployees.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrganizationsEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
      .addCase(updateOrganizationsEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizationsEmployees.fulfilled, (state, action: PayloadAction<organizationEmployee>) => {
        state.loading = false;
        state.organizationsEmployee = action.payload;
      })
      .addCase(updateOrganizationsEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(deleteOrganizationsEmployees.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganizationsEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationsEmployees = state.organizationsEmployees.filter(organizationsEmployee => organizationsEmployee.id !== String(action.meta.arg));
      })
      .addCase(deleteOrganizationsEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default organizationsEmployeesSlice.reducer;