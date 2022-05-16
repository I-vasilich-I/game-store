import { createAsyncThunk } from "@reduxjs/toolkit";
import { setIsLoading, setStatus } from "@/redux/store/form/formSlice";
import { setError } from "@/redux/store/modal/modalSlice";
import THUNK_ACTIONS from "@/redux/thunk/actions/thunkActions";
import authenticate from "@/api/apiAuth";
import { setLocalStorageItem } from "@/helpers";

type TPayload = {
  email: string;
  password: string;
  url: string;
};

const authUser = createAsyncThunk(THUNK_ACTIONS.AUTH_USER, async ({ email, password, url }: TPayload, thunkAPI) => {
  thunkAPI.dispatch(setIsLoading(true));
  const { data, status } = await authenticate({ url, sendData: { email, password } });

  if (status === 200 || status === 201) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { name: userName, password: passW, isAdmin, ...rest } = data;
    const isAdminT = Boolean((isAdmin && isAdmin === "true") || false);
    const newData = { userName, isAdmin: isAdminT, ...rest };
    setLocalStorageItem("user", newData);
    thunkAPI.dispatch(setStatus(status));
    thunkAPI.dispatch(setIsLoading(false));
    return newData;
  }

  thunkAPI.dispatch(setIsLoading(false));
  thunkAPI.dispatch(setError(data));
  return data;
});

export default authUser;
