import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
// import { CreateProjectResponseDto, DeleteProjectDto, GetProjectsResponseDto, ProjectResponseDto } from "../dtos/projects";
// import { createOrganizationProjectToCreateOrganizationProjectDto, organizationProjectResponseDtoToOrganizationProject, paginatedOrganizationsProjectsDtoToPaginatedOrganizationsProjects, updateOrganizationsProjectToUpdateOrganizationProjectDto } from "../mappers/projects.mapper";
// import { project, projects } from "../types/projects";
import axios from "axios";

type DocumentsState = {
  // organizationProjects: projects[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  // organizationsProjectUpdate: project | null,
  // organizationProjectDelete: project[] | null
};

const initialState: DocumentsState = {
  // organizationProjects: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  // organizationsProjectUpdate: null,
  // organizationProjectDelete: null
};




export const CreateDocument = createAsyncThunk(
  'documents/createDocument',
  async (data: any, {rejectWithValue}) => {
    try {
    //   const dto = createOrganizationProjectToCreateOrganizationProjectDto(data);
      const response = await axios.post(`${BASE_URL}/uploads`, data);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления докемента')
      }
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)

// export const deleteOrganizationProject = createAsyncThunk(
//   'organizationsProjects/deleteOrganizationProject',
//   async(id: string | undefined, {rejectWithValue}) => {
//     try{
//       const response = await axios.delete<DeleteProjectDto>(`${BASE_URL}/projects/${id}`)
//       return response.data
//     } catch(error: any){
//       return rejectWithValue(error.response?.data || 'Ошибка удаления проекта')
//     }
//   }
// )
  

const organizationsProjectsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(CreateDocument.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(CreateDocument.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(CreateDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
  },
});

export default organizationsProjectsSlice.reducer;