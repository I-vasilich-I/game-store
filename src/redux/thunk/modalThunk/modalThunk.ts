import { createAsyncThunk } from "@reduxjs/toolkit";
import { closeModal, setModalType } from "@/redux/store/modal/modalSlice";
import { setAuthFormType, setStatus } from "@/redux/store/form/formSlice";
import THUNK_ACTIONS from "@/redux/thunk/actions/thunkActions";

const onCloseModal = createAsyncThunk(THUNK_ACTIONS.MODAL_CLOSE, (_, thunkAPI) => {
  thunkAPI.dispatch(closeModal());
  thunkAPI.dispatch(setAuthFormType("signin"));
  thunkAPI.dispatch(setStatus(0));
  thunkAPI.dispatch(setModalType("auth"));
});

export default onCloseModal;
