import type { TypeUserStore } from "@/models/model";
import { createSlice } from "@reduxjs/toolkit";

const userToken = localStorage.getItem("userToken") ?? null;
const userString = localStorage.getItem("userInfo");
const userInfor = userString ? JSON.parse(userString) : null;

type Init = {
  loading: boolean;
  user: TypeUserStore | null;
  token: string | null;
  error: boolean;
  isLoggin: boolean
};

const initialState: Init = {
  error: false,
  loading: false,
  token: userToken,
  user: userInfor,
  isLoggin: false
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggin = true;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isLoggin = false;
      localStorage.removeItem("userToken")
      localStorage.removeItem("userInfo");
    }
  },
});

export const { setLoading, setUser, setError, setToken , logout} = userSlice.actions;
export default userSlice.reducer;
