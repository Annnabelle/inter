import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { ExpertsType, ExpertWithDocs } from "../types/experts.type";
import { EventResponseDto, GetEventResponseDto } from "../dtos/events/getEvent";
import { Event, EventById} from "../types/events";
import { GetEventsCalendarDto } from "../dtos/events/getEventsCalendar";
import { EventsCalendarResponseDtoToEventsCalendar, PaginatedEventsCalendarDtoToPaginatedEventsCalendar, UpdateEventCalendarToUpdateEventCalendarDTO } from "../mappers/events.caledar.mapper";
import { DeleteEventDto } from "../dtos/events/deleteEvent";
import axios from "axios"

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
  selectedEvent: null
};

function isSuccessResponse(
  data: unknown
): data is { success: true; events: EventResponseDto[]; total: number; page?: number; limit?: number } {
  return (
    typeof data === "object" &&
    data !== null &&
    "success" in data &&
    (data as any).success === true &&
    "events" in data &&
    Array.isArray((data as any).events)
  );
}


type RetrieveEventsParams = {
  startDate: Date  | string, 
  endDate: Date | string,
}


export const RetrieveEventsCalendar = createAsyncThunk<
  PaginatedResponse<Event>,
  RetrieveEventsParams,
  { rejectValue: string }
>(
  "eventsCalendar/RetrieveEventsCalendar",
  async ({ startDate, endDate }, { rejectWithValue }) => {
    try {
      const startDateUTC = new Date(startDate).toISOString();
      const endDateUTC = new Date(endDate).toISOString();

      const response = await axios.get<GetEventsCalendarDto>(`${BASE_URL}/events/calendar`, {
        params: {
          startDate: startDateUTC,
          endDate: endDateUTC,
        }
      });

      if (isSuccessResponse(response.data)) {
        const paginatedEvents = PaginatedEventsCalendarDtoToPaginatedEventsCalendar(response.data);
        return paginatedEvents;
      } else {
        const error = response.data as unknown as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения ивентов");
      }
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error.message || "Произошла ошибка при получении ивентов");
    }
  }
);



// export const RetrieveExpertById = createAsyncThunk<ExpertWithDocs, {id: HexString}, {rejectValue: string}>(
//   "events/RetrieveExpertById",
//   async ({id}, {rejectWithValue}) => {
//     try {
//       const response = await axios.get<GetExpertResponseDto>(`${BASE_URL}/experts/${id}`);
//       if ('success' in response.data && response.data.success === true) {
//         const data = response.data as {success: true, expert: PopulatedExpertResponseDto}
//         const expert = ExpertResponseDtoToExpert(data.expert)
//         return expert
//       } else {
//         const error = response.data as ErrorDto
//         return rejectWithValue(error.errorMessage?.ru || "Ошибка получения эксперта")
//       }
//     } catch (error: any) {
//         console.log(error);
//         return rejectWithValue(error.message || "Произошла ошибка")
//     }
//   }
// )



export const UpdateEventCalendar = createAsyncThunk<Event, Event, { rejectValue: string }>(
  'events/UpdateEventCalendar',
  async (data, { rejectWithValue }) => {
    try {
      console.log('====================================');
      console.log(data, 'data');
      console.log('====================================');
      const dto = UpdateEventCalendarToUpdateEventCalendarDTO(data);
      const response = await axios.patch(`${BASE_URL}/events/${data.id}`, dto);
      console.log("response.data ", response.data );
      
      if ('success' in response.data && response.data.success) {
        console.log(response.data);
        
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


// export const CreateExpert = createAsyncThunk(
//   'events/createExpert',
//   async (data: ExpertsType, {rejectWithValue}) => {
//     try {
//       const dto = CreateExpertToCreateExpertDto(data);
//       const response = await axios.post<CreateExpertResponseDto>(`${BASE_URL}/experts`, dto);
//       if ('success' in response.data && response.data.success){
//         return response.data;
//       } else {
//         const error = response.data as ErrorDto;
//         return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления эксперта')
//       }
//     }catch (error: any){
//       return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
//     }
//   }
// )

export const DeleteEvent = createAsyncThunk(
  'eventsCalendar/DeleteEvent',
  async(id: string | undefined, {rejectWithValue}) => {
    try{
      const response = await axios.delete<DeleteEventDto>(`${BASE_URL}/events/${id}`)
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
      const response = await axios.get<GetEventResponseDto>(`${BASE_URL}/events/${id}`);
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
      .addCase( RetrieveEventsCalendar.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Event>>) => {
          state.loading = false;
          state.eventsCalendar = action.payload.data;
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
    //   .addCase(CreateExpert.pending, (state) => {
    //     state.loading = true;
    //     state.success = false;
    //     state.error = null;
    //   })
    //   .addCase(CreateExpert.fulfilled, (state) => {
    //     state.loading = false;
    //     state.success = true;
    //   })
    //   .addCase(CreateExpert.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
    //   })
    //   .addCase(RetrieveExpertById.pending, (state) => {
    //     state.loading = true,
    //     state.error = null,
    //     state.success = false
    //   })
    //   .addCase(RetrieveExpertById.fulfilled, (state, action: PayloadAction<ExpertWithDocs>) => {
    //     state.loading = false,
    //     state.expertById = action.payload
    //     state.success = true
    //   })
    //   .addCase(RetrieveExpertById.rejected, (state) => {
    //     state.loading = true,
    //     state.error = null,
    //     state.success = false
    //   })
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