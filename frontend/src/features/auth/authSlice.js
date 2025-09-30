import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: !!localStorage.getItem("token"),
    username: null,
    token: localStorage.getItem("token") || null,
    loginError: null,
  },
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      state.username = null;
      state.token = null;
      state.loginError = null;
      localStorage.removeItem("token");
    },
    setError(state, action) {
      state.loginError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.loginError = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        console.log("Saving token:", action.payload.token);
        state.isLoggedIn = true;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.loginError = null;
        localStorage.setItem("token", action.payload.token);
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.loginError = action.payload?.data?.error || "Ошибка авторизации";
      })
      .addMatcher(authApi.endpoints.register.matchPending, (state) => {
        state.loginError = null;
      })
      .addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, action) => {
          console.log("Saving token:", action.payload.token);
          state.isLoggedIn = true;
          state.username = action.payload.username;
          state.token = action.payload.token;
          state.loginError = null;
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addMatcher(authApi.endpoints.register.matchRejected, (state, action) => {
        state.loginError = action.payload?.data?.error || "Ошибка регистрации";
      });
  },
});

export const { logout, setError } = authSlice.actions;
export default authSlice.reducer;
