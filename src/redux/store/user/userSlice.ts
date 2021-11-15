import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  userName: string | null;
  email: string | null;
  description: string | null;
  img: string | null;
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
  description: user?.description || null,
  img: null,
};

export const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.description = action.payload.description;
      state.img = action.payload.img;
    },

    setUserProp(state, action: PayloadAction<IUserProp>) {
      const { prop, value } = action.payload;
      state[prop] = value;
    },
  },
});

export const { setUser, setUserProp } = userSlice.actions;

export default userSlice.reducer;
