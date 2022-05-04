import authUser from "@/redux/thunk/authThunk/authThunk";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import userSVG from "images/account_circle.svg";

interface IUser {
  userName: string | null;
  email: string | null;
  address: string | null;
  phone: string | null;
  photo: string | null;
  isAdmin?: boolean;
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
  isAdmin: user?.isAdmin === "true" || false,
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
