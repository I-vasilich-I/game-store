import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authUser from "@/redux/thunk/authThunk/authThunk";
import { IUser } from "@/types";
import userSVG from "images/account_circle.svg";
import { getLocalStorageItem } from "@/helpers";

interface IUserProp {
  prop: keyof IUser;
  value: string | null;
}

const user = getLocalStorageItem<IUser>("user");

const initialState: IUser = {
  userName: user?.userName || null,
  email: user?.email || null,
  address: user?.address || null,
  phone: user?.phone || null,
  photo: user?.photo || userSVG,
  isAdmin: Boolean(user?.isAdmin === "true" || user?.isAdmin || false),
};

export const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.address = action.payload.address;
      state.phone = action.payload.phone;
      state.photo = action.payload.photo || userSVG;
      state.isAdmin = action.payload.isAdmin;
    },

    setUserProp(state, action: PayloadAction<IUserProp>) {
      const { prop, value } = action.payload;
      if (prop === "isAdmin") {
        return;
      }

      state[prop] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authUser.fulfilled, (state, { payload: { userName, isAdmin, email, address, phone, photo } }) => {
      state.userName = userName;
      state.email = email;
      state.address = address;
      state.phone = phone;
      state.photo = photo;
      state.isAdmin = isAdmin;
    });
  },
});

export const { setUser, setUserProp } = userSlice.actions;

export default userSlice.reducer;
