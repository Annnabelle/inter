import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto} from "../dtos/main.dto";
import { ExpertsType, ExpertWithDocs } from "../types/experts.type";
import { GetEventResponseDto } from "../dtos/events/getEvent";
import { Event, EventById, GetEventsCalendar} from "../types/events";
import { EventTypeCounters, GetEventsCalendarResponseDto } from "../dtos/events/getEventsCalendar";
import { EventsCalendarResponseDtoToEventsCalendar, isErrorDto, RetrieveEventsCalendarDtoToRetrieveEventsCalendar, UpdateEventCalendarToUpdateEventCalendarDTO } from "../mappers/events.caledar.mapper";
import { DeleteEventDto } from "../dtos/events/deleteEvent";
import axiosInstance from "../utils/axiosInstance";

type EventsState = {
  events: Event[]
  eventsCalendar: Event[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  expertUpdate: ExpertsType | null,
  eventDelete: Event[] | null,
  expertById: ExpertWithDocs | null
  selectedEvent: EventById | null;
  eventCounter: EventTypeCounters | null
};

const initialState: EventsState = {
  events: [],
  eventsCalendar: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  expertUpdate: null,
  eventDelete: null,
  expertById: null,
  selectedEvent: null,
  eventCounter: null
};



type RetrieveEventsParams = {
  startDate: Date  | string, 
  endDate: Date | string,
}


export const RetrieveEventsCalendar = createAsyncThunk<
  GetEventsCalendar,
  RetrieveEventsParams,
  { rejectValue: string }
>(
  "eventsCalendar/RetrieveEventsCalendar",
  async (
    { startDate, endDate }: RetrieveEventsParams,
    { rejectWithValue }
  ): Promise<GetEventsCalendar | ReturnType<typeof rejectWithValue>> => {
    try {
      const startDateUTC = new Date(startDate).toISOString();
      const endDateUTC = new Date(endDate).toISOString();

      const response = await axiosInstance.get<GetEventsCalendarResponseDto>(`${BASE_URL}/events/calendar`, {
        params: {
          startDate: startDateUTC,
          endDate: endDateUTC,
        },
      });

      if (isErrorDto(response.data)) {
        return rejectWithValue(response.data.errorMessage?.ru || "Ошибка получения ивентов");
      }

      const retrieveEvents = RetrieveEventsCalendarDtoToRetrieveEventsCalendar(response.data);
      if (!retrieveEvents) {
        return rejectWithValue("Получен пустой результат");
      }

      return retrieveEvents;

    } catch (error: any) {
      console.error("RetrieveEventsCalendar error:", error);
      return rejectWithValue(error.message || "Произошла ошибка при получении ивентов");
    }
  }
);


export const UpdateEventCalendar = createAsyncThunk<Event, Event, { rejectValue: string }>(
  'events/UpdateEventCalendar',
  async (data, { rejectWithValue }) => {
    try {
      const dto = UpdateEventCalendarToUpdateEventCalendarDTO(data);
      const response = await axiosInstance.patch(`${BASE_URL}/events/${data.id}`, dto);
      
      if ('success' in response.data && response.data.success) {
        
        return EventsCalendarResponseDtoToEventsCalendar(response.data.employee); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления ивента');
      }
    } catch (error: any) {
      console.log(error);
      
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const DeleteEvent = createAsyncThunk(
  'eventsCalendar/DeleteEvent',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axiosInstance.delete<DeleteEventDto>(`${BASE_URL}/events/${id}`)
      return response.data
    } catch(error: any){
      return rejectWithValue(error.response?.data || 'Ошибка удаления мероприятия')
    }
  }
)

export const RetrieveEventById = createAsyncThunk(
  "eventsCalendar/retrieveEventById",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get<GetEventResponseDto>(`${BASE_URL}/events/${id}`);
      
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
  

const eventsCalendarSlice = createSlice({
  name: "eventsCalendar",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(RetrieveEventsCalendar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase( RetrieveEventsCalendar.fulfilled, (state, action: PayloadAction<GetEventsCalendar>) => {
          state.loading = false;
          state.eventsCalendar = action.payload.events;
          state.eventCounter = action.payload.counters
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(RetrieveEventsCalendar.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
      })
      .addCase(RetrieveEventById.pending, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(RetrieveEventById.fulfilled, (state, action: PayloadAction<EventById>) => {
        state.loading = false,
        state.selectedEvent = action.payload;
        state.success = true
      })
      .addCase(RetrieveEventById.rejected, (state) => {
        state.loading = true,
        state.error = null,
        state.success = false
      })
      .addCase(DeleteEvent.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.eventDelete = state.events.filter(event => event.id !== String(action.meta.arg));
      })
      .addCase(DeleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default eventsCalendarSlice.reducer;