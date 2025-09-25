import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    username: null,
    email: null,
    token: null,
    loginEror: null,
  },
  reducers: {
    register(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.loginEror = null;
    },
    setLogin(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.loginError = null;
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.username = null;
      state.email = null;
      state.password = null;
    },
    setError(state, action) {
      state.loginEror = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchPending,
      (state) => {
           state.loginError = null;
         }),
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        state.username = action.payload;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.loginError = null;
        state.isAuthenticated = true;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, action) => {
        state.loginError = action.payload?.data?.error || "Что-то пошло не так";
      }
    );
  }
});

// authSlice здесь — объект: { reducer: Function, actions: { login: Function, setError: Function }, ... }

export const { register, setLogin, logout, setError } = authSlice.actions;
export default authSlice.reducer;
