import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModal {
  isModalOpen: boolean;
  error: string;
  alert: string;
  isProductEditForm: boolean;
}

const initialState: IModal = {
  isModalOpen: false,
  error: "",
  alert: "",
  isProductEditForm: false,
};

export const modalSlice = createSlice({
  name: "MODAL",
  initialState,
  reducers: {
    openModal(state) {
      state.isModalOpen = true;
    },
    closeModal(state) {
      state.isModalOpen = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setAlert(state, action: PayloadAction<string>) {
      state.alert = action.payload;
    },
    setIsProductEditForm(state, action: PayloadAction<boolean>) {
      state.isProductEditForm = action.payload;
    },
  },
});

export const { openModal, closeModal, setError, setAlert, setIsProductEditForm } = modalSlice.actions;

export default modalSlice.reducer;
