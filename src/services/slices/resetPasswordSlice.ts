import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResetPasswordState {
  canReset: boolean;
}

export const initialState: ResetPasswordState = {
  canReset: false,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    allowResetPassword(state) {
      state.canReset = true;
    },
    denyResetPassword(state) {
      state.canReset = false;
    },
  },
});

export const { allowResetPassword, denyResetPassword } =
  resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
