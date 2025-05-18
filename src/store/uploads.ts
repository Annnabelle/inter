import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, HexString} from "../dtos/main.dto";
import axios from "axios";
import { DeleteUploadQueryDto, DeleteUploadResponseDto, UploadResponseDto } from "../dtos/uploads";
import { Upload } from "../types/uploads";

type UploadsState = {
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
};

const initialState: UploadsState = {
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
};

interface DeleteUploadArgs {
  id: string;
  owner: string;
  entity: string;
}




export const CreateDocument = createAsyncThunk(
  'uploads/createDocument',
  async (data: any, {rejectWithValue}) => {
    try {
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

// export const deleteUpload = createAsyncThunk<
//   string, 
//   DeleteUploadArgs,
//   { rejectValue: string }
// >(
//   'uploads/deleteUpload',
//   async ({ id, owner, entity }, { rejectWithValue }) => {
//     try {
//       await axios.delete(`${BASE_URL}/uploads/${id}?owner=${owner}&entity=${entity}`);
//       return id;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data || 'Ошибка удаления файла');
//     }
//   }
// );

  

const uploadsSlice = createSlice({
  name: "uploads",
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

export default uploadsSlice.reducer;