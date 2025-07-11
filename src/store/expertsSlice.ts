import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, HexString, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { Expert, ExpertsType, ExpertWithDocs } from "../types/experts.type";
import { CreateExpertResponseDto, DeleteExpertDto, ExpertResponseDto, GetExpertResponseDto, GetExpertsResponseDto, PopulatedExpertResponseDto } from "../dtos/experts";
import { CreateExpertToCreateExpertDto, ExpertResponseDtoToExpert, ExpertsResponseDtoToExperts, PaginatedExpertsDtoToPaginatedExperts, UpdateExpertToUpdateExpertDto } from "../mappers/experts.mapper";
import axiosInstance from "../utils/axiosInstance";

type ExpertsState = {
  experts: Expert[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  expertUpdate: ExpertsType | null,
  expertDelete: ExpertsType[] | null,
  expertById: ExpertWithDocs | null,
  expertSearch: Expert[]
};

const initialState: ExpertsState = {
  experts: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  expertUpdate: null,
  expertDelete: null,
  expertById: null,
  expertSearch: []
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<ExpertResponseDto> {
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
  
export const RetrieveExperts = createAsyncThunk<PaginatedResponse<Expert>, {page: number, limit: number},{ rejectValue: string }>(
  "experts/retrieveExperts",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetExpertsResponseDto>(`${BASE_URL}/experts?limit=${limit}&page=${page}`);

      if (isSuccessResponse(response.data)) {
        const paginatedOrganizationProjects = PaginatedExpertsDtoToPaginatedExperts(response.data);
        return paginatedOrganizationProjects;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения экспертов");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении экспертов");
    }
  }
);

export const RetrieveExpertById = createAsyncThunk<ExpertWithDocs, {id: HexString}, {rejectValue: string}>(
  "experts/RetrieveExpertById",
  async ({id}, {rejectWithValue}) => {
    try { 
      const response = await axiosInstance.get<GetExpertResponseDto>(`${BASE_URL}/experts/${id}`);
      if ('success' in response.data && response.data.success === true) {
        const data = response.data as {success: true, expert: PopulatedExpertResponseDto}
        const expert = ExpertResponseDtoToExpert(data.expert)
        return expert
      } else {
        const error = response.data as ErrorDto
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения эксперта")
      }
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error.message || "Произошла ошибка")
    }
  }
)



export const UpdateExpert = createAsyncThunk<ExpertsType, Expert, { rejectValue: string }>(
  'experts/updateExpert',
  async (data, { rejectWithValue }) => {
    try {
      const dto = UpdateExpertToUpdateExpertDto(data);
      const response = await axiosInstance.patch(`${BASE_URL}/experts/${data.id}`, dto);
      console.log("response.data ", response.data );
      
      if ('success' in response.data && response.data.success) {
        console.log(response.data);
        
        return ExpertsResponseDtoToExperts(response.data.employee); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления эксперта');
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const CreateExpert = createAsyncThunk(
  'experts/createExpert',
  async (data: ExpertsType, {rejectWithValue}) => {
    try {
      const dto = CreateExpertToCreateExpertDto(data);
      const response = await axiosInstance.post<CreateExpertResponseDto>(`${BASE_URL}/experts`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления эксперта')
      }
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)

export const DeleteExpert = createAsyncThunk(
  'experts/deleteExpert',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axiosInstance.delete<DeleteExpertDto>(`${BASE_URL}/experts/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления эксперта')
    }
  }
)


export const RetrieveSearchExpert = createAsyncThunk<PaginatedResponse<Expert>, {query: string}, {rejectValue: string}>(
  'experts/searchExpert',
  async ({query}, {rejectWithValue}) => {
    try {
      const response = await axiosInstance.get<GetExpertsResponseDto>(`${BASE_URL}/experts/search?query=${query}`);
      if(isSuccessResponse(response.data)){
        const expertSearch = PaginatedExpertsDtoToPaginatedExperts(response.data)
        return expertSearch;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error?.errorMessage?.ru || 'Error in search expert')
      }
    }catch (error: any) {
      return rejectWithValue(error.message || 'Error on serverSide')
    }
  }
)
  

const expertsSlice = createSlice({
  name: "experts",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(RetrieveExperts.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveExperts.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Expert>>) => {
          state.loading = false;
          state.experts = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(RetrieveExperts.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(CreateExpert.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(CreateExpert.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(CreateExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
      .addCase(RetrieveExpertById.pending, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(RetrieveExpertById.fulfilled, (state, action: PayloadAction<ExpertWithDocs>) => {
        state.loading = false,
        state.expertById = action.payload
        state.success = true
      })
      .addCase(RetrieveExpertById.rejected, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(UpdateExpert.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateExpert.fulfilled, (state, action: PayloadAction<ExpertsType>) => {
        state.loading = false;
        state.expertUpdate = action.payload;
      })
      .addCase(UpdateExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(DeleteExpert.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteExpert.fulfilled, (state, action) => {
        state.loading = false;
        state.expertDelete = state.experts.filter(expert => expert.id !== String(action.meta.arg));
      })
      .addCase(DeleteExpert.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(RetrieveSearchExpert.pending, (state) => {
        state.success = true
      })
      .addCase(RetrieveSearchExpert.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Expert>>) =>{
        state.loading = false;
        state.expertSearch = action.payload.data;
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.total = action.payload.total
        state.success = true;
      })
      .addCase(RetrieveSearchExpert.rejected, (state) => {
        state.success = false;
      });
  },
});

export default expertsSlice.reducer;