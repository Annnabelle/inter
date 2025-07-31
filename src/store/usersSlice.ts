import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/user";
import { mapPaginatedUsersDtoToPaginatedUsers, mapUserDtoToUser, mapUserUpdateToUpdateUserDto } from "../mappers/user.mapper";
import { BASE_URL } from "../utils/baseUrl";
import { GetUsersResponseDto, UserResponseDto } from "../dtos/users";
import { ErrorDto, PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import axiosInstance from "../utils/axiosInstance";

type UserState = {
  users: User[];
  loading: boolean;
  error: string | null;
  dataLimit: number,
  dataPage: number,
  dataTotal: number,
  usersSearch: User[]
};

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  dataLimit: 0,
  dataPage: 1,
  dataTotal: 0,
  usersSearch: []
};

export type UserUpdateType = {
  id: string,
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  status: string,
  language: string
}


function isSuccessResponse(
  data: unknown
): data is { success: true } & PaginatedResponseDto<UserResponseDto> {
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

export interface RetrieveUsersResult {
  users: User[];
  dataLimit: number;
  dataPage: number;
  dataTotal: number;
}

  
export const retrieveUsers = createAsyncThunk<RetrieveUsersResult, { page: number; limit: number}, { rejectValue: string }>(
  "users/retrieveUsers",
  async ({page, limit}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetUsersResponseDto>(`${BASE_URL}/users?page=${page}&limit=${limit}`);
      
      if (isSuccessResponse(response.data)) {
        const users = response.data.data.map(mapUserDtoToUser);
        const usersData = {
          users: users,
          dataLimit: response.data.limit,
          dataPage: response.data.page,
          dataTotal: response.data.total
        }
        return usersData;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения пользователей");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении пользователей");
    }
  }
);

export const searchUsers = createAsyncThunk<PaginatedResponse<User>, {query: string},{ rejectValue: string }>(
  "users/searchUsers",
  async ({query}, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get<GetUsersResponseDto>(`${BASE_URL}/users/search?query=${query}`);
      if (isSuccessResponse(response.data)) {
        const countriesSearch = mapPaginatedUsersDtoToPaginatedUsers(response.data);
        return countriesSearch;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || "Ошибка получения сотрудников");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Произошла ошибка при получении сотрудников");
    }
  }
);

export const retrieveUserById = createAsyncThunk<User, string, { rejectValue: string }>(
  "users/retrieveUserById",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`${BASE_URL}/users/${userId}`);

      // ✅ ВАЖНО: данные лежат в response.data.user
      const user = response.data?.user;
      if (user) {
        return user;
      } else {
        return rejectWithValue("Пользователь не найден");
      }
    } catch (error: any) {
      return rejectWithValue(error.message || "Ошибка получения пользователя");
    }
  }
);





export const updateUser = createAsyncThunk<User, UserUpdateType, { rejectValue: string }>(
  'users/updateUser',
  async (data, { rejectWithValue }) => {
    try {
      const dto = mapUserUpdateToUpdateUserDto(data);
      const response = await axiosInstance.patch(`${BASE_URL}/users/${data.id}`, dto);

      if ('success' in response.data && response.data.success) {
        return mapUserDtoToUser(response.data.user); 
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка обновления пользователя');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);


export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`${BASE_URL}/users/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Ошибка удаления');
    }
  }
);
  

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    resetUsers(state) {
      state.users = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(retrieveUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(retrieveUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.dataLimit = action.payload.dataLimit;
      state.dataPage = action.payload.dataPage;
      state.dataTotal = action.payload.dataTotal;
    })
    .addCase(retrieveUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload ?? 'Неизвестная ошибка';
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    })
    .addCase(deleteUser.pending, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.filter(user => user.id !== String(action.meta.arg));
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    })
    .addCase(searchUsers.pending, (state) => {
      state.loading = true;
    })
    .addCase( searchUsers.fulfilled, (state, action: PayloadAction<PaginatedResponseDto<User>>) => {
      state.loading = false;
      state.usersSearch = action.payload.data;
      // state.limit = action.payload.limit;
      // state.page = action.payload.page;
      // state.total = action.payload.total
      // state.success = true;
    })
    .addCase(searchUsers.rejected, (state) => {
      state.loading = false;
    })
    .addCase(retrieveUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(retrieveUserById.fulfilled, (state, action) => {
      const user = action.payload;
      const exists = state.users.find((u) => u.id === user.id);
      if (!exists) {
        state.users.push(user);
      }
    })

    .addCase(retrieveUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "An error occurred";
    });
  },
});

export const { resetUsers } = userSlice.actions;
export default userSlice.reducer;
