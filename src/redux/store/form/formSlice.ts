import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthFormTypes } from "@/types";

interface IForm {
  authFormType: AuthFormTypes;
  status: number;
  isLoading: boolean;
  isPhotoLoading: boolean;
  isSaving: boolean;
}

const initialState: IForm = {
  authFormType: "signin",
  status: 0,
  isLoading: false,
  isPhotoLoading: false,
  isSaving: false,
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
    setIsPhotoLoading(state, action: PayloadAction<boolean>) {
      state.isPhotoLoading = action.payload;
    },
    setIsSaving(state, action: PayloadAction<boolean>) {
      state.isSaving = action.payload;
    },
    setStatus(state, action: PayloadAction<number>) {
      state.status = action.payload;
    },
  },
});

export const { setAuthFormType, setIsLoading, setIsPhotoLoading, setIsSaving, setStatus } = formSlice.actions;

export default formSlice.reducer;
