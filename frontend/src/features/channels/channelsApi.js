import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const channelsApi = createApi({
  reducerPath: "channelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5002",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Channels"],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ({
        url: "/api/v1/channels",
        method: "GET",
      }),
      providesTags: ["Channels"],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: "/api/v1/channels",
        method: "POST",
        body: newChannel, // { name: 'new channel' }
      }),
      invalidatesTags: ["Channels"],
    }),
    editChannel: builder.mutation({
      query: (id, editedChannel) => ({
        url: `/api/v1/channels/${id}`,
        method: "PATCH",
        body: editedChannel, // { name: 'new name channel' }
      }),
      invalidatesTags: ["Channels"],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/api/v1/channels/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Channels"],
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
