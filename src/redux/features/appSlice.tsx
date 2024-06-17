import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface AuthState {
  email: string;
  password: string;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  email: '',
  password: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        const userData = JSON.parse(storedData);
        if (userData.email === email && userData.password === password) {
          state.isAuthenticated = true;
        } else {
          throw new Error('Invalid credentials');
        }
      } else {
        throw new Error('No user data');
      }
    },
    logout(state) {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;