import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IModal {
  isModalOpen: boolean;
  error: string;
}

const initialState: IModal = {
  isModalOpen: false,
  error: "",
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
  },
});

export const { openModal, closeModal, setError } = modalSlice.actions;

export default modalSlice.reducer;
