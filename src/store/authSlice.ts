import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../types/user';
import { BASE_URL } from '../utils/baseUrl';
import { mapLoginFormToDto } from '../mappers/auth.mapper';
import { LoginRequestDto, LoginResponseDto, UserRegisterRequestDto, UserResponseDto } from '../dtos/users';
import { ErrorDto } from '../dtos/main.dto';
import { mapUserRegisterToUserRegisterDto } from '../mappers/user.mapper';
import { RegisterFormTypes } from '../types/auth.types';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async (data: LoginRequestDto, { rejectWithValue }) => {
    try {
      const dto = mapLoginFormToDto(data);
      const response = await axios.post<LoginResponseDto>(`${BASE_URL}/users/login`, dto);

      if ('success' in response.data && response.data.success) {
        const { user, tokens } = response.data as Exclude<LoginResponseDto, ErrorDto>;
        localStorage.setItem('accessToken', tokens.accessToken);
        localStorage.setItem('refreshToken', tokens.refreshToken);
        return { user, tokens };
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка авторизации');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
);



export const registerUser = createAsyncThunk(
  'auth/register',
  async (data: RegisterFormTypes, {rejectWithValue}) => {
    try {
      const dto = mapUserRegisterToUserRegisterDto(data);
      const response = await axios.post<UserRegisterRequestDto>(`${BASE_URL}/users/register`, dto);
      if ('success' in response.data && response.data.success){
        return response.data;
      } else {
        const error = response.data as ErrorDto;
        return rejectWithValue(error.errorMessage?.ru || 'Ошибка добавления')
      }
    }catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка сервера');
    }
  }
)

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
  status: null,
  success: null,
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
        state.user = action.payload.user;
        state.accessToken = action.payload.tokens.accessToken;
        state.refreshToken = action.payload.tokens.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.status = "succeeded";
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;





