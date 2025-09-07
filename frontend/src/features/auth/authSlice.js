import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    username: null,
    email: null,
    token: null,
    error: null,
  },
  reducers: {
    register(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.error = null;
    },
    setLogin(state, action) {
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.token = action.payload.token;
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
      state.error = action.payload;
    },
  },
});

// authSlice здесь — объект: { reducer: Function, actions: { login: Function, setError: Function }, ... }

export const { register, setLogin, logout, setError } = authSlice.actions;
export default authSlice.reducer;


