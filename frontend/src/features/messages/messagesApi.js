import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: "/messages",
        method: "GET",
      }),
      providesTags: ["Messages"],
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: "/messages",
        method: "POST",
        body: newMessage, // { body, channelId, username }
      }),
      invalidatesTags: ["Messages"],
    }),
    editMessage: builder.mutation({
      query: ({ id, body }) => ({
        url: `/messages/${id}`,
        method: "PATCH",
        body: { body },
      }),
      invalidatesTags: ["Messages"],
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
