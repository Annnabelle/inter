import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, HexString, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import axios from "axios";
import { InternationalDocument, InternationalDocuments, InternationalDocumentsWithDocs, UpdateInternationalDocument } from "../types/internationalDocuments";
import { CreateDocumentDto, CreateDocumentResponseDto, DeleteDocumentDto, DocumentResponseDto, GetDocumentResponseDto, PopulatedDocumentResponseDto } from "../dtos/internationalDocuments";
import { CreateInternationalDocumentToCreateInternationalDocumentDto, InternationalDocumentResponseDtoToInternationalDocument, InternationalDocumentsResponseDtoToInternationalDocumentsResponse, PaginatedInternationalDocumentsDtoToPaginatedInternationalDocuments, UpdateInternationalDocumentToUpdateInternationalDocumentDto } from "../mappers/internationalDocuments.mapper";
import { AgreementDocument, AgreementDocuments, AgreementDocumentsWithDocs, UpdateAgreementDocument } from "../types/agreements";
import { AgreementResponseDto, CreateAgreementResponseDto, DeleteAgreementDto, GetAgreementResponseDto, PopulatedAgreementResponseDto } from "../dtos/agreements";
import { AgreementDocumentResponseDtoToAgreementDocument, AgreementDocumentsResponseDtoToAgreementDocumentsResponse, CreateAgreementDocumentToCreateAgreementDocumentDto, PaginatedAgreementDocumentsDtoToPaginatedAgreementDocuments, UpdateAgreementDocumentToUpdateAgreementDocumentDto } from "../mappers/agreements.mapper";

type AgreementDocumentsState = {
  agreementDocuments: AgreementDocument[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  agreementDocumentById: AgreementDocumentsWithDocs | null
  agreementDocumentUpdate: AgreementDocument | null,
  agreementDocumentDelete: AgreementDocument[] | null
};

const initialState: AgreementDocumentsState = {
  agreementDocuments: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  agreementDocumentById: null,
  agreementDocumentUpdate: null,
  agreementDocumentDelete: null
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<AgreementResponseDto> {
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
  
export const RetrieveAgreementDocuments = createAsyncThunk<PaginatedResponse<AgreementDocument>, {page: number, limit: number},{ rejectValue: string }>(
  "agreements/RetrieveAgreementDocuments",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetAgreementResponseDto>(`${BASE_URL}/agreements?limit=${limit}&page=${page}`);
      console.log("response", response);
      
      if (isSuccessResponse(response.data)) {
        const paginatedDocuments = PaginatedAgreementDocumentsDtoToPaginatedAgreementDocuments(response.data);
        return paginatedDocuments;
      } else {
        const error = response.data as ErrorDto;
        console.log(error);
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения договоров");
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.message || "Произошла ошибка при получении договоров");
    }
  }
);

export const RetrieveAgreementDocumentById = createAsyncThunk<AgreementDocumentsWithDocs, {id: HexString},{ rejectValue: string }>(
  "agreements/RetrieveAgreementDocumentById",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axios.get<GetAgreementResponseDto>(`${BASE_URL}/agreements/${id}`);

      if ("success" in response.data && response.data.success === true) {
        console.log("ers", response.data);
        const data = response.data as {success: true, agreement: PopulatedAgreementResponseDto
        }
        const project = AgreementDocumentResponseDtoToAgreementDocument(data.agreement);
        return project;

      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения договора");
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message || "Произошла ошибка при получении договоров");
    }
  }
);



export const UpdateAgreementDocumentRequest = createAsyncThunk<AgreementDocument, UpdateAgreementDocument, { rejectValue: string }>(
  'agreements/UpdateAgreementDocumentRequest',
  async (data, { rejectWithValue }) => {
    try {
      const dto = UpdateAgreementDocumentToUpdateAgreementDocumentDto(data);
      const response = await axios.patch(`${BASE_URL}/agreements/${data.id}`, dto);
      console.log("response.data ", response.data );
      
      if ('success' in response.data && response.data.success) {
        console.log(response.data);
        
        return AgreementDocumentsResponseDtoToAgreementDocumentsResponse(response.data.employee); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления договора');
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const CreateAgreementDocument = createAsyncThunk(
  'agreements/CreateAgreementDocument',
  async (data: AgreementDocuments, {rejectWithValue}) => {
    try {
      const dto = CreateAgreementDocumentToCreateAgreementDocumentDto(data);
      const response = await axios.post<CreateAgreementResponseDto>(`${BASE_URL}/agreements`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления договора')
      }
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)

export const DeleteAgreementDocument = createAsyncThunk(
  'agreements/DeleteAgreementDocument',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axios.delete<DeleteAgreementDto>(`${BASE_URL}/agreements/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления договора')
    }
  }
)
  

const AgreementSlice = createSlice({
  name: "agreements",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(RetrieveAgreementDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveAgreementDocuments.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<AgreementDocument>>) => {
          state.loading = false;
          state.agreementDocuments = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(RetrieveAgreementDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(RetrieveAgreementDocumentById.pending, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(RetrieveAgreementDocumentById.fulfilled, (state, action: PayloadAction<AgreementDocumentsWithDocs>) => {
        state.loading = false,
        state.agreementDocumentById = action.payload
        state.success = true
      })
      .addCase(RetrieveAgreementDocumentById.rejected, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(CreateAgreementDocument.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(CreateAgreementDocument.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(CreateAgreementDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
      .addCase(UpdateAgreementDocumentRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateAgreementDocumentRequest.fulfilled, (state, action: PayloadAction<AgreementDocument>) => {
        state.loading = false;
        state.agreementDocumentUpdate = action.payload;
      })
      .addCase(UpdateAgreementDocumentRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(DeleteAgreementDocument.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteAgreementDocument.fulfilled, (state, action) => {
        state.loading = false;
        state.agreementDocumentDelete = state.agreementDocuments.filter(document => document.id !== String(action.meta.arg));
      })
      .addCase(DeleteAgreementDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default AgreementSlice.reducer;