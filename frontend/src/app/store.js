import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../features/auth/authApi";
import { channelsApi } from "../features/channels/channelsApi";
import { messagesApi } from '../features/messages/messagesApi';
import authReducer from '../features/auth/authSlice';
import channelReducer from "../features/channels/channelsSlice";
import messagesReducer from '../features/messages/messagesSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    auth: authReducer,
    channels: channelReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat([authApi.middleware, channelsApi.middleware, messagesApi.middleware])
});

export default store;
