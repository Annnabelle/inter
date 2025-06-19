import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { OrganizationEmployee, OrganizationEmployees, OrganizationEmployeeUpdate, OrganizationEmployeeWithDocs } from "../types/organizationEmployee";
import { CreateOrganizationEmployeeResponseDto, DeleteOrganizationEmployeeDto, GetOrganizationEmployeeResponseDto, OrganizationEmployeeResponseDto, PopulatedOrganizationEmployeeResponseDto } from "../dtos/organizationEmployee";
import { CreateOrganizationEmployeeToCreateOrganizationEmployeeDto, PaginatedOrganizationsEmployeesResponseDtoToPaginatedOrganizationsEmployeesResponse, OrganizationEmployeeResponseDtoToOrganizationEmployeeResponse, UpdateOrganizationEmployeeToUpdateOrganizationEmployeeResponseDto, OrganizationEmployeesResponseDtoToOrganizationEmployees } from "../mappers/organizationEmployee.mapper";
import { ErrorDto, HexString, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { BASE_URL } from "../utils/baseUrl";
import axiosInstance from "../utils/axiosInstance";

type OrganizationsEmployeesState = {
  organizationsEmployees: OrganizationEmployee[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  organizationsEmployee: OrganizationEmployee | null,
  employee: OrganizationEmployeeWithDocs | null
};

const initialState: OrganizationsEmployeesState = {
  organizationsEmployees: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  organizationsEmployee: null,
  employee: null
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
  
export const RetrieveOrganizationEmployees = createAsyncThunk<PaginatedResponse<OrganizationEmployee>, {page: number, limit: number, id: HexString | undefined},{ rejectValue: string }>(
  "organizationsEmployees/retrieveOrganizationsEmployees",
  async ({page, limit, id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetOrganizationEmployeeResponseDto>(`${BASE_URL}/organization-employees?limit=${limit}&page=${page}&organizationId=${id}`);
      console.log(response.data);
      
      if (isSuccessResponse(response.data)) {
        const paginatedOrganizations = PaginatedOrganizationsEmployeesResponseDtoToPaginatedOrganizationsEmployeesResponse(response.data);
        return paginatedOrganizations;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения сотрудников");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении сотрудников");
    }
  }
);

export const retrieveOrganizationsEmployeeById = createAsyncThunk<OrganizationEmployeeWithDocs, {id: string},{ rejectValue: string }>(
  "organizationsEmployees/retrieveOrganizationsEmployeeById",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetOrganizationEmployeeResponseDto>(`${BASE_URL}/organization-employees/${id}`);

      if ("success" in response.data && response.data.success === true) {
        const data = response.data as { success: true; employee: PopulatedOrganizationEmployeeResponseDto };
        const employee = OrganizationEmployeeResponseDtoToOrganizationEmployeeResponse(data.employee);
        return employee;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения сотрудника"); 
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message || "Произошла ошибка при получении сотрудника");
    }
  }
);




export const updateOrganizationsEmployees = createAsyncThunk<OrganizationEmployee, OrganizationEmployeeUpdate, { rejectValue: string }>(
  'organizationsEmployees/updateOrganizationsEmployees',
  async (data, { rejectWithValue }) => {
    try {
      const dto = UpdateOrganizationEmployeeToUpdateOrganizationEmployeeResponseDto(data);
      const response = await axiosInstance.patch(`${BASE_URL}/organization-employees/${data.id}`, dto);
      console.log("response.data ", response.data );
      
      if ('success' in response.data && response.data.success) {
        console.log(response.data);
        
        return OrganizationEmployeesResponseDtoToOrganizationEmployees(response.data.employee); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления сотрудника');
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const createOrganizationsEmployees = createAsyncThunk(
  'organizationsEmployees/createOrganizationsEmployees',
  async (data: OrganizationEmployees, {rejectWithValue}) => {
    try {
      const dto = CreateOrganizationEmployeeToCreateOrganizationEmployeeDto(data);
      const response = await axiosInstance.post<CreateOrganizationEmployeeResponseDto>(`${BASE_URL}/organization-employees`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления сотрудника')
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
      const response = await axiosInstance.delete<DeleteOrganizationEmployeeDto>(`${BASE_URL}/organization-employees/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления сотрудников')
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
      .addCase(RetrieveOrganizationEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveOrganizationEmployees.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<OrganizationEmployee>>) => {
          state.loading = false;
          state.organizationsEmployees = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(RetrieveOrganizationEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(retrieveOrganizationsEmployeeById.pending, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(retrieveOrganizationsEmployeeById.fulfilled, (state, action: PayloadAction<OrganizationEmployeeWithDocs>) => {
        state.loading = false,
        state.employee = action.payload
        state.success = true
      })
      .addCase(retrieveOrganizationsEmployeeById.rejected, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
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
      .addCase(updateOrganizationsEmployees.fulfilled, (state, action: PayloadAction<OrganizationEmployee>) => {
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