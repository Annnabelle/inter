import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import {  mapPaginatedTranslatorsDtoToPaginatedTranslators, mapTranslatorDtoToTranslator, mapTranslatorToTranslatorCreateDto, mapTranslatorToUpdateTranslatorDto } from "../mappers/transaltor.mapper";
import { CreateTranslatorRequest, Translator } from "../types/translator";
import axios from "axios";
import { CreateTranslatorResponseDto, GetTranslatorResponseDto, GetTranslatorsResponseDto, TranslatorResponseDto } from "../dtos/translators";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";

type TranslatorState = {
  translators: Translator[];
  loading: boolean;
  error: string | null;
  success: boolean;
  translator: Translator | null
  limit: number,
  page: number,
  total: number
};

const initialState: TranslatorState = {
  translators: [],
  loading: false,
  error: null,
  success: false,
  translator: null, 
  limit: 0,
  page: 1,
  total: 0
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<TranslatorResponseDto> {
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
  
export const retrieveTranslators = createAsyncThunk<PaginatedResponse<Translator>, {page: number, limit: number},{ rejectValue: string }>(
  "translators/retrieveTranslators",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetTranslatorsResponseDto>(`${BASE_URL}/translators?page=${page}&limit=${limit}`);

      if (isSuccessResponse(response.data)) {
        const paginatedTranslators = mapPaginatedTranslatorsDtoToPaginatedTranslators(response.data);
        console.log('====================================');
        console.log('paginatedTranslators', paginatedTranslators);
        console.log('====================================');
        return paginatedTranslators;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения переводчика");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении переводчика");
    }
  }
);


export const retrieveTranslatorsById = createAsyncThunk<Translator, string, { rejectValue: string }>(
  "translators/retrieveTranslatorsById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetTranslatorResponseDto>(`${BASE_URL}/translators/${id}`);

      if ('translator' in response.data) { 
        const translator = mapTranslatorDtoToTranslator(response.data.translator);
        return translator;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения переводчика");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении переводчика");
    }
  }
);


export const createTranslator = createAsyncThunk(
  'translators/createTranslators',
  async (data: CreateTranslatorRequest, {rejectWithValue}) => {
    try {
      const dto = mapTranslatorToTranslatorCreateDto(data);
      const response = await axios.post<CreateTranslatorResponseDto>(`${BASE_URL}/translators`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления переводчика')
      }
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)


export const updateTranslator = createAsyncThunk<Translator, Translator, { rejectValue: string }>(
  'translators/updateTranslator',
  async (data, { rejectWithValue }) => {
    try {
      const dto = mapTranslatorToUpdateTranslatorDto(data);
      const response = await axios.patch(`${BASE_URL}/translators/${data.id}`, dto);

      if ('success' in response.data && response.data.success) {
        return mapTranslatorToUpdateTranslatorDto(response.data.translator); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления юзера');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);

export const deleteTranslator = createAsyncThunk(
  'translator/deleteTranslator',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axios.delete(`${BASE_URL}/translators/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления сервера')
    }
  }
)




  

const translatorsSlice = createSlice({
  name: "translators",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(retrieveTranslators.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        retrieveTranslators.fulfilled,
        (state, action: PayloadAction<PaginatedResponseDto<Translator>>) => {
          state.loading = false;
          state.translators = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(retrieveTranslators.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(retrieveTranslatorsById.pending, (state) => {
        state.loading = true;
        state.error = null
        state.success = false;
      })
      .addCase(retrieveTranslatorsById.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.translator = action.payload;
      })
      .addCase(retrieveTranslatorsById.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Ошибка при получении пользователей";
      })
      .addCase(createTranslator.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createTranslator.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createTranslator.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
      .addCase(updateTranslator.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTranslator.fulfilled, (state, action: PayloadAction<Translator>) => {
        state.loading = false;
        state.translator = action.payload;
      })
      .addCase(updateTranslator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(deleteTranslator.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTranslator.fulfilled, (state, action) => {
        state.loading = false;
        state.translators = state.translators.filter(translator => translator.id !== String(action.meta.arg));
      })
      .addCase(deleteTranslator.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default translatorsSlice.reducer;