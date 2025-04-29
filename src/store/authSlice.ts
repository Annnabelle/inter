import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mapLoginFormToDto, mapUserDtoToUser } from '../utils/authMapper';
import { ErrorDto, LoginResponseDto } from '../utils/dtos';
import { AuthState } from '../types/user';
import { BASE_URL } from '../utils/baseUrl';
import axios from 'axios';

export type LoginForm = {
  email: string;
  password: string;
};

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginForm, { rejectWithValue }) => {
    try {
      const dto = mapLoginFormToDto(data);
      const response = await axios.post<LoginResponseDto>(`${BASE_URL}/users/login`, dto);

      if ('success' in response.data && response.data.success) {
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка авторизации');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        const { user, tokens } = action.payload as Exclude<LoginResponseDto, ErrorDto>;
        state.user = mapUserDtoToUser(user);
        state.accessToken = tokens.accessToken;
        state.refreshToken = tokens.refreshToken;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;





