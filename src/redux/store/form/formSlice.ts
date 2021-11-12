import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthFormTypes } from "@/types";

interface IForm {
  authFormType: AuthFormTypes;
}

const initialState: IForm = {
  authFormType: "signin",
};

export const formSlice = createSlice({
  name: "FORM",
  initialState,
  reducers: {
    setAuthFormType(state, action: PayloadAction<AuthFormTypes>) {
      state.authFormType = action.payload;
    },
  },
});

export const { setAuthFormType } = formSlice.actions;

export default formSlice.reducer;
