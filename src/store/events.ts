import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/baseUrl";
import { ErrorDto, HexString, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { ExpertsType, ExpertWithDocs } from "../types/experts.type";
import axios from "axios";
import { GetEventsDto, GetEventsResponseDto } from "../dtos/events/getEvents";
import { EventResponseDto } from "../dtos/events/getEvent";
import { PaginatedEventsDtoToPaginatedEvents } from "../mappers/events.mapper";
import { Event, EventSortField, EventType } from "../types/events";
import qs from "qs"

type EventsState = {
  events: Event[]
  loading: boolean;
  error: string | null;
  success: boolean;
  limit: number,
  page: number,
  total: number,
  expertUpdate: ExpertsType | null,
  expertDelete: ExpertsType[] | null,
  expertById: ExpertWithDocs | null
};

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  success: false,
  limit: 0,
  page: 1,
  total: 0,
  expertUpdate: null,
  expertDelete: null,
  expertById: null
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
  eventTypes?: EventType[],
  sortBy?: EventSortField, // event sort fields
  sortOrder?: 'asc' | 'desc',
}
  
export const RetrieveEvents = createAsyncThunk<
  PaginatedResponse<Event>,
  RetrieveEventsParams,
  { rejectValue: string }
>(
  "events/RetrieveEvents",
  async ({ page, limit, organizationId, countryId, eventTypes, sortBy, sortOrder}, { rejectWithValue }) => {
    try {

      const requestParams: any = {
          limit,
          page,
          sortBy: sortBy ?? 'startDate',
          sortOrder: sortOrder ?? 'asc',
          organizationId: organizationId || undefined,
          countryId: countryId || undefined,
          type: eventTypes && Array.isArray(eventTypes) ? eventTypes : undefined,
      }

      const response = await axios.get<GetEventsDto>(`${BASE_URL}/events`, {
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



// export const UpdateExpert = createAsyncThunk<ExpertsType, Expert, { rejectValue: string }>(
//   'events/updateExpert',
//   async (data, { rejectWithValue }) => {
//     try {
//       const dto = UpdateExpertToUpdateExpertDto(data);
//       const response = await axios.patch(`${BASE_URL}/experts/${data.id}`, dto);
//       console.log("response.data ", response.data );
      
//       if ('success' in response.data && response.data.success) {
//         console.log(response.data);
        
//         return ExpertsResponseDtoToExperts(response.data.employee); 
//       } else {
//         const error = response.data as ErrorDto;
//         return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления эксперта');
//       }
//     } catch (error: any) {
//       console.log(error);
      
//       return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
//     }
//   }
// );


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

// export const DeleteExpert = createAsyncThunk(
//   'events/deleteExpert',
//   async(id: string | undefined, {rejectWithValue}) => {
//     try{
//       const response = await axios.delete<DeleteExpertDto>(`${BASE_URL}/experts/${id}`)
//       return response.data
//     } catch(error: any){
//       return rejectWithValue(error.response?.data || 'Ошибка удаления эксперта')
//     }
//   }
// )
  

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
      .addCase( RetrieveEvents.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<Event>>) => {
          state.loading = false;
          state.events = action.payload.data;
          state.limit = action.payload.limit;
          state.page = action.payload.page;
          state.total = action.payload.total
          state.success = true;
        }
      )
      .addCase(RetrieveEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' ? action.payload : 'Что-то пошло не так';
        state.success = false;
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