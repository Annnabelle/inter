import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import userReducer from './usersSlice'
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import translatorsReducer from './translators'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    translators: translatorsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

