import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { organizationEmployee } from "../types/organizationEmployee";
import { CreateProjectResponseDto, DeleteProjectDto, GetProjectsResponseDto, ProjectResponseDto } from "../dtos/projects";
import { createOrganizationProjectToCreateOrganizationProjectDto, organizationProjectResponseDtoToOrganizationProject, paginatedOrganizationsProjectsDtoToPaginatedOrganizationsProjects, updateOrganizationsProjectToUpdateOrganizationProjectDto } from "../mappers/projects.mapper";
import { project, projects, projectUpdate } from "../types/projects";
import axios from "axios";

type OrganizationsEmployeesState = {
  organizationProjects: projects[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  organizationsProjectUpdate: project | null,
  organizationProjectDelete: project[] | null
};

const initialState: OrganizationsEmployeesState = {
  organizationProjects: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  organizationsProjectUpdate: null,
  organizationProjectDelete: null
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<ProjectResponseDto> {
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
  
export const retrieveOrganizationsProjects = createAsyncThunk<PaginatedResponse<projects>, {page: number, limit: number, id: string},{ rejectValue: string }>(
  "organizationsProjects/retrieveOrganizationsProjects",
  async ({page, limit, id}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetProjectsResponseDto>(`${BASE_URL}/projects?limit=${limit}&page=${page}&organizationId=${id}`);

      if (isSuccessResponse(response.data)) {
        const paginatedOrganizationProjects = paginatedOrganizationsProjectsDtoToPaginatedOrganizationsProjects(response.data);
        return paginatedOrganizationProjects;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения проекта");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении проектов");
    }
  }
);



export const updateOrganizationsProject = createAsyncThunk<projects, projects, { rejectValue: string }>(
  'organizationsProjects/updateOrganizationsProject',
  async (data, { rejectWithValue }) => {
    try {
      const dto = updateOrganizationsProjectToUpdateOrganizationProjectDto(data);
      const response = await axios.patch(`${BASE_URL}/projects/${data.id}`, dto);
      console.log("response.data ", response.data );
      
      if ('success' in response.data && response.data.success) {
        console.log(response.data);
        
        return organizationProjectResponseDtoToOrganizationProject(response.data.employee); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления проекта');
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const createOrganizationProject = createAsyncThunk(
  'organizationsProjects/createOrganizationProject',
  async (data: project, {rejectWithValue}) => {
    try {
      const dto = createOrganizationProjectToCreateOrganizationProjectDto(data);
      const response = await axios.post<CreateProjectResponseDto>(`${BASE_URL}/projects`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления проекта')
      }
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)

export const deleteOrganizationProject = createAsyncThunk(
  'organizationsProjects/deleteOrganizationProject',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axios.delete<DeleteProjectDto>(`${BASE_URL}/projects/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления проекта')
    }
  }
)
  

const organizationsProjectsSlice = createSlice({
  name: "organizationsProjects",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveOrganizationsProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( retrieveOrganizationsProjects.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<projects>>) => {
          state.loading = false;
          state.organizationProjects = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(retrieveOrganizationsProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(createOrganizationProject.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createOrganizationProject.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createOrganizationProject.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
      .addCase(updateOrganizationsProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizationsProject.fulfilled, (state, action: PayloadAction<project>) => {
        state.loading = false;
        state.organizationsProjectUpdate = action.payload;
      })
      .addCase(updateOrganizationsProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(deleteOrganizationProject.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrganizationProject.fulfilled, (state, action) => {
        state.loading = false;
        state.organizationProjectDelete = state.organizationProjects.filter(organizationProject => organizationProject.id !== String(action.meta.arg));
      })
      .addCase(deleteOrganizationProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default organizationsProjectsSlice.reducer;