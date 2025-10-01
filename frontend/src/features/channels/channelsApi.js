import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const channelsApi = createApi({
  reducerPath: "channelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      console.log("Channels API token:", token);
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Channels"],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: (channelsList) => ({
        url: "/channels",
        method: "GET",
        body: channelsList,
      }),
      providesTags: ["Channels"],
    }),
    addChannel: builder.mutation({
      query: (newChannel) => ({
        url: "/channels",
        method: "POST",
        body: newChannel, // { name: 'new channel' }
      }),
      invalidatesTags: ["Channels"],
    }),
    editChannel: builder.mutation({
      query: ({ id, ...editedChannel }) => ({
        url: `/channels/${id}`,
        method: "PATCH",
        body: editedChannel,
      }),
      invalidatesTags: ["Channels"],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `/channels/${id}`,
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
