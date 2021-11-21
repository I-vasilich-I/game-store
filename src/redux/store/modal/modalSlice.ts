import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModal {
  isModalOpen: boolean;
  error: string;
  alert: string;
}

const initialState: IModal = {
  isModalOpen: false,
  error: "",
  alert: "",
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
  },
});

export const { openModal, closeModal, setError, setAlert } = modalSlice.actions;

export default modalSlice.reducer;
