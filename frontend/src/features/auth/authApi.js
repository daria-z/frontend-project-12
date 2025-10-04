import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Channels", "Messages"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials, // { username: 'admin', password: 'admin' } => { token: ..., username: 'admin' }
      }),
      invalidatesTags: ["Channels", "Messages"],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData, // { username: 'newuser', password: '123456' } => { token: ..., username: 'newuser' }
      }),
      invalidatesTags: ["Channels", "Messages"],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

// const [login, { isLoading, error }] = useLoginMutation();
// await login({ username: 'admin', password: 'admin' }).unwrap(); // Отправляет POST на /api/v1/login
// .unwrap() извлекает данные из ответа или выбрасывает ошибку, если запрос не удался.




