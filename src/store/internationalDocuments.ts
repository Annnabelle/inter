import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, HexString, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import axios from "axios";
import { InternationalDocument, InternationalDocuments, InternationalDocumentsWithDocs, UpdateInternationalDocument } from "../types/internationalDocuments";
import { CreateDocumentDto, CreateDocumentResponseDto, DeleteDocumentDto, DocumentResponseDto, GetDocumentResponseDto, PopulatedDocumentResponseDto } from "../dtos/internationalDocuments";
import { CreateInternationalDocumentToCreateInternationalDocumentDto, InternationalDocumentResponseDtoToInternationalDocument, InternationalDocumentsResponseDtoToInternationalDocumentsResponse, PaginatedInternationalDocumentsDtoToPaginatedInternationalDocuments, UpdateInternationalDocumentToUpdateInternationalDocumentDto } from "../mappers/internationalDocuments.mapper";

type InternationalDocumentsState = {
  internationalDocuments: InternationalDocument[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  internationalDocumentById: InternationalDocumentsWithDocs | null
  internationalDocumentUpdate: InternationalDocument | null,
  internationalDocumentDelete: InternationalDocument[] | null
};

const initialState: InternationalDocumentsState = {
  internationalDocuments: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  internationalDocumentById: null,
  internationalDocumentUpdate: null,
  internationalDocumentDelete: null
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<DocumentResponseDto> {
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
  
export const RetrieveInternationalDocuments = createAsyncThunk<PaginatedResponse<InternationalDocument>, {page: number, limit: number},{ rejectValue: string }>(
  "internationalDocuments/RetrieveInternationalDocuments",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetDocumentResponseDto>(`${BASE_URL}/documents?limit=${limit}&page=${page}`);
      console.log("response", response);
      
      if (isSuccessResponse(response.data)) {
        const paginatedDocuments = PaginatedInternationalDocumentsDtoToPaginatedInternationalDocuments(response.data);
        return paginatedDocuments;
      } else {
        const error = response.data as ErrorDto;
        console.log(error);
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения международных документов");
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.message || "Произошла ошибка при получении международных документов");
    }
  }
);

export const RetrieveInternationalDocumentById = createAsyncThunk<InternationalDocumentsWithDocs, {id: HexString},{ rejectValue: string }>(
  "internationalDocuments/RetrieveInternationalDocumentById",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetDocumentResponseDto>(`${BASE_URL}/documents/${id}`);

      if ("success" in response.data && response.data.success === true) {
        console.log("ers", response.data);
        const data = response.data as {success: true, document: PopulatedDocumentResponseDto}
        const project = InternationalDocumentResponseDtoToInternationalDocument(data.document);
        return project;

      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения международного документа");
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message || "Произошла ошибка при получении международного документа");
    }
  }
);



export const UpdateInternationalDocumentRequest = createAsyncThunk<InternationalDocument, UpdateInternationalDocument, { rejectValue: string }>(
  'internationalDocuments/UpdateInternationalDocumentRequest',
  async (data, { rejectWithValue }) => {
    try {
      const dto = UpdateInternationalDocumentToUpdateInternationalDocumentDto(data);
      const response = await axios.patch(`${BASE_URL}/documents/${data.id}`, dto);
      console.log("response.data ", response.data );
      
      if ('success' in response.data && response.data.success) {
        console.log(response.data);
        
        return InternationalDocumentsResponseDtoToInternationalDocumentsResponse(response.data.employee); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления международного документа');
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const CreateInternationalDocument = createAsyncThunk(
  'internationalDocuments/CreateInternationalDocument',
  async (data: InternationalDocuments, {rejectWithValue}) => {
    try {
      const dto = CreateInternationalDocumentToCreateInternationalDocumentDto(data);
      const response = await axios.post<CreateDocumentResponseDto>(`${BASE_URL}/documents`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления международного документа')
      }
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)

export const DeleteInternationalDocument = createAsyncThunk(
  'internationalDocuments/DeleteInternationalDocument',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axios.delete<DeleteDocumentDto>(`${BASE_URL}/documents/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления международного документа')
    }
  }
)
  

const expertsSlice = createSlice({
  name: "internationalDocuments",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(RetrieveInternationalDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveInternationalDocuments.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<InternationalDocument>>) => {
          state.loading = false;
          state.internationalDocuments = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(RetrieveInternationalDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(RetrieveInternationalDocumentById.pending, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(RetrieveInternationalDocumentById.fulfilled, (state, action: PayloadAction<InternationalDocumentsWithDocs>) => {
        state.loading = false,
        state.internationalDocumentById = action.payload
        state.success = true
      })
      .addCase(RetrieveInternationalDocumentById.rejected, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(CreateInternationalDocument.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(CreateInternationalDocument.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(CreateInternationalDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
      .addCase(UpdateInternationalDocumentRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateInternationalDocumentRequest.fulfilled, (state, action: PayloadAction<InternationalDocument>) => {
        state.loading = false;
        state.internationalDocumentUpdate = action.payload;
      })
      .addCase(UpdateInternationalDocumentRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(DeleteInternationalDocument.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteInternationalDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.internationalDocumentDelete = state.internationalDocuments.filter(document => document.id !== String(action.meta.arg));
      })
      .addCase(DeleteInternationalDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default expertsSlice.reducer;