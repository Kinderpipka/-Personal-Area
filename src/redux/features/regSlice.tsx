import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
export type FormFields = "username" | "email" | "password" | "confirmPassword";

interface FormDataState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormDataState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const formDataSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateField(
      state,
      action: PayloadAction<{ field: FormFields; value: string }>
    ) {
      const { field, value } = action.payload;
      state[field] = value;
    },
  },
});

export const { updateField } = formDataSlice.actions;
export default formDataSlice.reducer;
