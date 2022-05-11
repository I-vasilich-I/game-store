import { createAsyncThunk } from "@reduxjs/toolkit";
import THUNK_ACTIONS from "@/redux/thunk/actions/thunkActions";
import { setIsLoading, setIsPhotoLoading, setIsSaving, setStatus } from "@/redux/store/form/formSlice";
import {
  changePasswordService,
  changeProfileInfoService,
  changeProfilePhotoService,
  uploadPhoto,
} from "@/api/apiProfile";
import { IProfile, IUser } from "@/types";
import { setUser } from "@/redux/store/user/userSlice";
import { setAlert, setError } from "@/redux/store/modal/modalSlice";
import { setLocalStorageItem } from "@/helpers";

type TPhotoPayload = {
  email: string;
  photo: File;
};

type TPasswordPayload = {
  email: string;
  password: string;
};

const changeProfileInfo = createAsyncThunk(THUNK_ACTIONS.PROFILE_CHANGE_INFO, async (sendData: IProfile, thunkAPI) => {
  thunkAPI.dispatch(setIsSaving(true));
  const { data, status, error } = await changeProfileInfoService(sendData);
  if (status === 200) {
    const { name: userName, password, isAdmin, ...rest } = data as IUser;
    const isAdminT = Boolean((isAdmin && isAdmin === "true") || false);
    setLocalStorageItem("user", { userName, isAdmin: isAdminT, ...rest });
    thunkAPI.dispatch(setUser({ userName, password, isAdmin: isAdminT, ...rest }));
    thunkAPI.dispatch(setAlert("Profile info changed"));
  } else {
    thunkAPI.dispatch(setError(error as string));
  }
  thunkAPI.dispatch(setIsSaving(false));
});

const changeProfilePhoto = createAsyncThunk(
  THUNK_ACTIONS.PROFILE_CHANGE_PHOTO,
  async ({ email, photo }: TPhotoPayload, thunkAPI) => {
    thunkAPI.dispatch(setIsPhotoLoading(true));
    const photoUrl: string = await uploadPhoto(photo);
    const { data, status, error } = await changeProfilePhotoService({ email, photo: photoUrl });
    if (status === 200) {
      const { name: userName, password, isAdmin, ...rest } = data as IUser;
      const isAdminT = Boolean((isAdmin && isAdmin === "true") || false);
      setLocalStorageItem("user", { userName, isAdmin: isAdminT, ...rest });
      thunkAPI.dispatch(setUser({ userName, password, isAdmin: isAdminT, ...rest }));
      thunkAPI.dispatch(setAlert("Profile photo changed"));
    } else {
      thunkAPI.dispatch(setError(error as string));
    }
    thunkAPI.dispatch(setIsPhotoLoading(false));
  }
);

const changeProfilePassword = createAsyncThunk(
  THUNK_ACTIONS.PROFILE_CHANGE_PASSWORD,
  async ({ email, password }: TPasswordPayload, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const { data, status, error } = await changePasswordService({ email, password });
    if (status === 200) {
      const { name: userName, password: pass, isAdmin, ...rest } = data as IUser;
      const isAdminT = Boolean((isAdmin && isAdmin === "true") || false);
      setLocalStorageItem("user", { userName, isAdmin: isAdminT, ...rest });
      thunkAPI.dispatch(setUser({ userName, password: pass, isAdmin: isAdminT, ...rest }));
      thunkAPI.dispatch(setAlert("Password changed"));
      thunkAPI.dispatch(setStatus(status));
    } else {
      thunkAPI.dispatch(setError(error as string));
    }
    thunkAPI.dispatch(setIsLoading(false));
  }
);

export { changeProfileInfo, changeProfilePhoto, changeProfilePassword };
