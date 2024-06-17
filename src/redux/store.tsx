import { configureStore } from '@reduxjs/toolkit';
import formDataReducer from './features/regSlice';
import authSlice from './features/appSlice';
import usersSlice from './features/homeSlice';

const store = configureStore({
  reducer: {
    formData: formDataReducer,
    auth: authSlice,
    users: usersSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;