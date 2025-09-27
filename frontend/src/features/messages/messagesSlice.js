import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: "messages",
  initialState: {
    messagesList: [],
    currentMessage: {
      id: null,
      body: null,
      channelId: null,
      username: null,
    },
  },
  reducers: {
    getMessages(state, action) {
      state.messagesList = action.payload;
    },
    editMessage(state, action) {
      const { id, body, channelId, username } = action.payload;
      const message = state.messagesList.find((message) => message.id === id);
      if (message) {
        message.body = body;
        message.channelId = channelId;
        message.username = username;
      }
    },
    addMessage(state, action) {
      state.messagesList.push(action.payload);
    },
    removeMessage(state, action) {
      const id = action.payload;
      state.messagesList = state.messagesList.filter(
        (message) => message.id !== id
      );
    },
  },
});

export const { getMessages, editMessage, addMessage, removeMessage } =
  messagesSlice.actions;
export default messagesSlice.reducer;
