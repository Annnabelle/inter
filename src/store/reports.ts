import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ErrorDto, HexString, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { BASE_URL } from "../utils/baseUrl";
import { Report, Reports, ReportsWithDocs } from "../types/reports";
import { CreateReportResponseDto, DeleteReportDto, GetReportResponseDto, PopulatedReportResponseDto, ReportResponseDto } from "../dtos/reports";
import { CreateReportToCreateReportDto, PaginatedReportsResponseDtoToPaginatedReportsResponse, ReportResponseDtoToReport, ReportsResponseDtoToReports, UpdateReportToUpdateReportResponseDto } from "../mappers/report.mapper";
import axiosInstance from "../utils/axiosInstance";

type ReportsState = {
  reports: Report[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  updateReport: Report | null,
  deleteReport: Reports | null
  reportById: ReportsWithDocs | null
};

const initialState: ReportsState = {
  reports: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  updateReport: null,
  deleteReport: null,
  reportById: null
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<ReportResponseDto> {
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
  
export const RetrieveReports = createAsyncThunk<PaginatedResponse<Report>, {page: number, limit: number},{ rejectValue: string }>(
  "reports/RetrieveReports",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetReportResponseDto>(`${BASE_URL}/reports?limit=${limit}&page=${page}`);
      console.log(response.data);
      
      if (isSuccessResponse(response.data)) {
        const reports = PaginatedReportsResponseDtoToPaginatedReportsResponse(response.data);
        return reports;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения отчетов");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении отчетов");
    }
  }
);

export const RetrieveReportById = createAsyncThunk<ReportsWithDocs, {id: HexString},{ rejectValue: string }>(
  "reports/RetrieveReportById",
  async ({id}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetReportResponseDto>(`${BASE_URL}/reports/${id}`);

      if ("success" in response.data && response.data.success === true) {
        const data = response.data as { success: true; report: PopulatedReportResponseDto };
        const reportById = ReportResponseDtoToReport(data.report);
        return reportById;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения отчета");
      }
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.message || "Произошла ошибка при получении отчета");
    }
  }
);


export const UpdateReport = createAsyncThunk<Report, ReportsWithDocs, { rejectValue: string }>(
  'organizationsEmployees/updateOrganizationsEmployees',
  async (data, { rejectWithValue }) => {
    try {
      const dto = UpdateReportToUpdateReportResponseDto(data);
      const response = await axiosInstance.patch(`${BASE_URL}/reports/${data.id}`, dto);
      console.log("response.data ", response.data );
      
      if ('success' in response.data && response.data.success) {
        console.log(response.data);
        
        return ReportsResponseDtoToReports(response.data.employee); 
      } else {
        const error = response.data as ErrorDto;
        console.log(error);
        
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления отчета');
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const CreateReport = createAsyncThunk(
  'reports/CreateReport',
  async (data: Report, {rejectWithValue}) => {
    try {
      const dto = CreateReportToCreateReportDto(data);
      const response = await axiosInstance.post<CreateReportResponseDto>(`${BASE_URL}/reports`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления отчета')
      }
    }catch (error: any){
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)

export const deleteReport = createAsyncThunk(
  'reports/deleteReport',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axiosInstance.delete<DeleteReportDto>(`${BASE_URL}/reports/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления отчета')
    }
  }
)
  

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(RetrieveReports.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveReports.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Report>>) => {
          state.loading = false;
          state.reports = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(RetrieveReports.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(RetrieveReportById.pending, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(RetrieveReportById.fulfilled, (state, action: PayloadAction<ReportsWithDocs>) => {
        state.loading = false,
        state.reportById = action.payload
        state.success = true
      })
      .addCase(RetrieveReportById.rejected, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(CreateReport.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(CreateReport.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(CreateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
      .addCase(UpdateReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateReport.fulfilled, (state, action: PayloadAction<Report>) => {
        state.loading = false;
        state.updateReport = action.payload;
      })
      .addCase(UpdateReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred";
      })
      .addCase(deleteReport.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.loading = false;
        state.reports = state.reports.filter(report => report.id !== String(action.meta.arg));
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default reportsSlice.reducer;