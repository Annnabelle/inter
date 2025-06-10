import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import authReducer from './authSlice';
import userReducer from './usersSlice'
import translatorsReducer from './translators'
import organizationsReducer from './organizations'
import OrganizationEmployeeReducer from './organizationEmployeeSlice'
import organizationProjectsReducer from './projects'
import expertsReducer from './expertsSlice'
import uploadsReducer from './uploads'
import reportsReducer from './reports'
import countriesReducer from './countries'
import internationalDocumentsReducer from './internationalDocuments'
import agreementReducer from './agreements'
import eventsReducer from './events'
import eventsCalendarReducer from './eventsCalendar'
import organizersReducer from './orginizer'
import statisticsReducer from './stistics'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    translators: translatorsReducer,
    organizations: organizationsReducer,
    organizationEmployee: OrganizationEmployeeReducer,
    organizationProjects: organizationProjectsReducer,
    experts: expertsReducer,
    uploads: uploadsReducer,
    reports: reportsReducer,
    countries: countriesReducer,
    internationalDocuments: internationalDocumentsReducer,
    agreement: agreementReducer,
    events: eventsReducer,
    eventsCalendar: eventsCalendarReducer,
    organizer: organizersReducer,
    statistics: statisticsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

