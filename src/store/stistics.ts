import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { isErrorDto } from "../mappers/events.caledar.mapper";
import { StatisticByPartners, StatisticsByLevel, StatisticsByOrganizers, SuccessResponse } from "../types/statistics";
import { mapStatisticsByLevelRetrieveDtoToStatisticsByLevel, mapStatisticsOrganizersRetrieveDtoToStatisticsOrganizers, PaginatedStatEventsByPartnerDtoToPaginatedStatEventsByPartner } from "../mappers/statistics.mapper";
import { GetStatsByOrganizersResponseDto } from "../dtos/statistics/getStatsByOrg";
import { GetStatsByLevelResponseDto } from "../dtos/statistics/getStatByLvl";
import { GetEventsResponseDto } from "../dtos/events/getEvents";
import { PaginatedResponse } from "../dtos/main.dto";
import axiosInstance from "../utils/axiosInstance";

type EventsState = {
  statisticByOrg: StatisticsByOrganizers[],
  statisticByLevel: StatisticsByLevel[],
  statisticByPartners: StatisticByPartners[],
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
};

const initialState: EventsState = {
  statisticByOrg: [],
  statisticByLevel: [],
  statisticByPartners: [],
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
};


type RetrieveStatisticsParams = {
  startDate: Date  | string, 
  endDate: Date | string,
}

type RetrieveStatisticsByPartnersParams = {
  // startDate: string;
  // endDate: string;
  partnerId: string;
  page?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
};


export const RetrieveStatisticByOrganizer = createAsyncThunk<
  SuccessResponse<StatisticsByOrganizers>,
  RetrieveStatisticsParams,
  { rejectValue: string }
>(
  "statistic/RetrieveStatisticCalendar",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const startDateUTC = new Date(startDate).toISOString();
      const endDateUTC = new Date(endDate).toISOString();

      const response = await axiosInstance.get<GetStatsByOrganizersResponseDto>(`${BASE_URL}/stats/organizers`, {
        params: {
          startDate: startDateUTC,
          endDate: endDateUTC,
        },
      });

      if (isErrorDto(response.data)) {
        return rejectWithValue(response.data.errorMessage?.ru || "Ошибка получения статистики");
      }

      const result = mapStatisticsOrganizersRetrieveDtoToStatisticsOrganizers(response.data);
      return result;

    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении статистики");
    }
  }
);


export const RetrieveStatisticByLevel = createAsyncThunk<
  SuccessResponse<StatisticsByLevel>,
  RetrieveStatisticsParams,
  { rejectValue: string }
>(
  "statistic/RetrieveStatisticByLevel",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const startDateUTC = new Date(startDate).toISOString();
      const endDateUTC = new Date(endDate).toISOString();

      const response = await axiosInstance.get<GetStatsByLevelResponseDto>(`${BASE_URL}/stats/level`, {
        params: {
          startDate: startDateUTC,
          endDate: endDateUTC,
        },
      });

      if (isErrorDto(response.data)) {
        return rejectWithValue(response.data.errorMessage?.ru || "Ошибка получения статистики");
      }

      const result = mapStatisticsByLevelRetrieveDtoToStatisticsByLevel(response.data);
      return result;

    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении статистики");
    }
  }
);

export const RetrieveStatisticByPartners = createAsyncThunk<
  PaginatedResponse<StatisticByPartners>,
  RetrieveStatisticsByPartnersParams,
  { rejectValue: string }
>(
  "statistic/RetrieveStatisticByPartners",
  async ({ partnerId, page = 1, sortBy = 'startDate', sortOrder = 'asc', limit = 10 }, { rejectWithValue }) => {
    try {

      const response = await axiosInstance.get<GetEventsResponseDto>(`${BASE_URL}/stats/events`, {
        params: {
          partnerId,
          page,
          sortBy,
          sortOrder,
          limit,
        },
      });

      if (isErrorDto(response.data)) {
        return rejectWithValue(response.data.errorMessage?.ru || "Ошибка получения статистики");
      }

      const result = PaginatedStatEventsByPartnerDtoToPaginatedStatEventsByPartner(response.data);
      return result;

    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении статистики");
    }
  }
);



  

const statisticSlice = createSlice({
  name: "statistic",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(RetrieveStatisticByOrganizer.pending, (state) => {
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveStatisticByOrganizer.fulfilled, (state, action: PayloadAction<SuccessResponse<StatisticsByOrganizers>>) => {
          state.statisticByOrg = action.payload.data;
          state.success = true;
        }
      )
      .addCase(RetrieveStatisticByOrganizer.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(RetrieveStatisticByLevel.pending, (state) => {
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveStatisticByLevel.fulfilled, (state, action: PayloadAction<SuccessResponse<StatisticsByLevel>>) => {
        state.statisticByLevel = action.payload.data;
        state.success = true;
      })
      .addCase(RetrieveStatisticByLevel.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })

      .addCase(RetrieveStatisticByPartners.pending, (state) => {
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveStatisticByPartners.fulfilled, (state, action: PayloadAction<PaginatedResponse<StatisticByPartners>>) => {
        state.statisticByPartners = action.payload.data;
        state.success = true;
      })
      .addCase(RetrieveStatisticByPartners.rejected, (state, action) => {
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
  },
});

export default statisticSlice.reducer;