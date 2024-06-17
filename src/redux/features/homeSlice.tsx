import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://reqres.in/api/users?page=2");
      return response.data.data as User[];
    } catch (error) {
      return rejectWithValue("Ошибка при получении данных");
    }
  }
);

export const fetchOtherUsers = createAsyncThunk(
  "users/fetchOtherUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://reqres.in/api/users");

      if (Array.isArray(response.data.data)) {
        return response.data.data as User[];
      } else {
        throw new Error("Data is not iterable");
      }
    } catch (error) {
      return rejectWithValue(
        "Ошибка при получении данных из второй базы данных"
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;

        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchOtherUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchOtherUsers.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;

          state.users = [...state.users, ...action.payload];
        }
      )
      .addCase(fetchOtherUsers.rejected, (state, action) => {
        state.loading = false;

        if (!state.error) {
          state.error = action.payload as string;
        }
      });
  },
});

export const {} = usersSlice.actions;
export default usersSlice.reducer;
