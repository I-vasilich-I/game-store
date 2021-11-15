import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthFormTypes } from "@/types";

interface IForm {
  authFormType: AuthFormTypes;
  status: number;
  isLoading: boolean;
}

const initialState: IForm = {
  authFormType: "signin",
  status: 0,
  isLoading: false,
};

export const formSlice = createSlice({
  name: "FORM",
  initialState,
  reducers: {
    setAuthFormType(state, action: PayloadAction<AuthFormTypes>) {
      state.authFormType = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setStatus(state, action: PayloadAction<number>) {
      state.status = action.payload;
    },
  },
});

export const { setAuthFormType, setIsLoading, setStatus } = formSlice.actions;

export default formSlice.reducer;
