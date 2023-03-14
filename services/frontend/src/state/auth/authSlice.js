import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { accessToken: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { access_token, user } = action.payload;
      state.accessToken = access_token;
      state.user = user;
    },
    logOut: (state) => {
      state.user = null;
      state.accessToken = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.accessToken;
export const selectAuth = (state) => state.auth;
