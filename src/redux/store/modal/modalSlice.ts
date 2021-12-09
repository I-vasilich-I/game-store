import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TModalType } from "@/types";

interface IModal {
  isModalOpen: boolean;
  error: string;
  alert: string;
  modalType: TModalType;
}

const initialState: IModal = {
  isModalOpen: false,
  error: "",
  alert: "",
  modalType: "auth",
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
    setModalType(state, action: PayloadAction<TModalType>) {
      state.modalType = action.payload;
    },
  },
});

export const { openModal, closeModal, setError, setAlert, setModalType } = modalSlice.actions;

export default modalSlice.reducer;
