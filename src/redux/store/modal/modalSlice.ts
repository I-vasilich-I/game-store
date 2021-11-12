import { createSlice } from "@reduxjs/toolkit";

interface IModal {
  isModalOpen: boolean;
}

const initialState: IModal = {
  isModalOpen: false,
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
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
