import { createSlice } from "@reduxjs/toolkit";

const channelsSlice = createSlice({
  name: "channels",
  initialState: {
    channelsList: [],
    activeChannelId: null,
  },
  reducers: {
    getChannels(state, action) {
      state.channelsList = action.payload;
    },
    editChannel(state, action) {
      const { id, name, removable } = action.payload;
      const channel = state.channelsList.find((channel) => channel.id === id);
      if (channel) {
        channel.name = name;
        channel.removable = removable;
      }
    },
    addChannel(state, action) {
      state.channelsList.push(action.payload);
    },
    removeChannel(state, action) {
      const id = action.payload;
      state.channelsList = state.channelsList.filter(
        (channel) => channel.id !== id
      );
      if (state.activeChannelId === id) {
        state.activeChannelId = null;
      }
    },
    setActiveChannel(state, action) {
      state.activeChannelId = action.payload;
    },
  },
});

export const { getChannels, editChannel, addChannel, removeChannel, setActiveChannel } =
  channelsSlice.actions;
export default channelsSlice.reducer;
