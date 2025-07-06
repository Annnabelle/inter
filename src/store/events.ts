import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, HexString, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { ExpertsType, ExpertWithDocs } from "../types/experts.type";
import { GetEventsDto } from "../dtos/events/getEvents";
import { EventResponseDto } from "../dtos/events/getEvent";
import { PaginatedEventsDtoToPaginatedEvents } from "../mappers/events.mapper";
import { Event, EventSortField, EventType } from "../types/events";
import { mapEventToCreateEventDto } from "../mappers/events.caledar.mapper";
import { CreateEventResponseDto } from "../dtos/events/addEvent";
import qs from "qs"
import axiosInstance from "../utils/axiosInstance";

type EventsState = {
  events: Event[]
  eventsCalendar: Event[]
  delegations: Event[];
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  expertUpdate: ExpertsType | null,
  expertDelete: ExpertsType[] | null,
  expertById: ExpertWithDocs | null
  currentEvent: Event | null,
};

const initialState: EventsState = {
  events: [],
  eventsCalendar: [],
  delegations: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  expertUpdate: null,
  expertDelete: null,
  expertById: null,
  currentEvent: null
};

function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<EventResponseDto> {
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

type RetrieveEventsParams = {
  page: number, 
  limit: number,
  organizationId?: HexString,
  countryId?: HexString,
  eventTypes?: EventType,
  sortBy?: EventSortField,
  sortOrder?: 'asc' | 'desc',
}

export const RetrieveEvents = createAsyncThunk<
  PaginatedResponse<Event>,
  RetrieveEventsParams,
  { rejectValue: string }
>(
  "events/RetrieveEvents",
  async ({ page, limit, organizationId, countryId, eventTypes, sortBy, sortOrder }, { rejectWithValue }) => {
    try {
      const requestParams: any = {
        limit,
        page,
        ...(eventTypes && { type: eventTypes }),
        sortBy: sortBy ?? 'startDate',
        sortOrder: sortOrder ?? 'asc',
        ...(organizationId && { organizationId }),
        ...(countryId && { countryId }),
      };

      const response = await axiosInstance.get<GetEventsDto>(`${BASE_URL}/events`, {
        params: requestParams,
        paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
      });

      if (isSuccessResponse(response.data)) {
        console.log("res", response.data);
        const paginatedEvents = PaginatedEventsDtoToPaginatedEvents(response.data);
        return paginatedEvents;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения ивентов");
      }
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.message || "Произошла ошибка при получении ивентов");
    }
  }
);


export const CreateEvent = createAsyncThunk(
  'events/CreateEvent',
  async (data: Event, { rejectWithValue }) => {
    try {
      const dto = mapEventToCreateEventDto(data);
      const response = await axiosInstance.post<CreateEventResponseDto>(`${BASE_URL}/events`, dto);
      
      if (response.data?.success) {
        return response.data;
      }

      // логируем ответ, если он неуспешный
      console.warn('Invalid response from server:', response.data);

      return rejectWithValue('Ошибка добавления мероприятия'); // <-- безопасная дефолтная ошибка
    } catch (error: any) {
      console.error('Request failed', error);
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(RetrieveEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(RetrieveEvents.fulfilled, (state, action: AnyAction) => {
        state.loading = false;
        if (action.meta.arg.eventTypes === 'delegations') {
          state.delegations = action.payload.data;
        } else {
          state.events = action.payload.data;
        }
        state.limit = action.payload.limit;
        state.page = action.payload.page;
        state.total = action.payload.total;
        state.success = true;
      })
      .addCase(RetrieveEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(CreateEvent.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(CreateEvent.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(CreateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
      })
    //   .addCase(UpdateExpert.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(UpdateExpert.fulfilled, (state, action: PayloadAction<ExpertsType>) => {
    //     state.loading = false;
    //     state.expertUpdate = action.payload;
    //   })
    //   .addCase(UpdateExpert.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload || "An error occurred";
    //   })
    //   .addCase(DeleteExpert.pending, state => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(DeleteExpert.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.expertDelete = state.experts.filter(expert => expert.id !== String(action.meta.arg));
    //   })
    //   .addCase(DeleteExpert.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload as string;
    //   });
  },
});

export default eventsSlice.reducer;