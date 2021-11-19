import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userSVG from "images/account_circle.svg";

interface IUser {
  userName: string | null;
  email: string | null;
  address: string | null;
  phone: string | null;
  photo: string | null;
}

interface IUserProp {
  prop: keyof IUser;
  value: string | null;
}

const userRaw = localStorage.getItem("user");
const user = userRaw ? JSON.parse(userRaw) : null;

const initialState: IUser = {
  userName: user?.userName || null,
  email: user?.email || null,
  address: user?.address || null,
  phone: user?.phone || null,
  photo: user?.photo || userSVG,
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
    },

    setUserProp(state, action: PayloadAction<IUserProp>) {
      const { prop, value } = action.payload;
      state[prop] = value;
    },
  },
});

export const { setUser, setUserProp } = userSlice.actions;

export default userSlice.reducer;
