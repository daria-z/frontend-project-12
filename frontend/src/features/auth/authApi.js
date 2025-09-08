import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5002" }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    // If we have a token set in state, let's assume that we should be passing it.
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (value) => ({
        url: "/api/v1/login",
        method: "POST",
        body: value, // { username: 'admin', password: 'admin' } => { token: ..., username: 'admin' }
      }),
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/api/v1/signup",
        method: "POST",
        body: userData, // { username: 'newuser', password: '123456' } => { token: ..., username: 'newuser' }
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

// const [login, { isLoading, error }] = useLoginMutation();
// await login({ username: 'admin', password: 'admin' }).unwrap(); // Отправляет POST на /api/v1/login
// .unwrap() извлекает данные из ответа или выбрасывает ошибку, если запрос не удался.

