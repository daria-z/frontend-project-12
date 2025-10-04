import { io } from "socket.io-client";
import store from "./app/store"; // Импортируй твой Redux store
import { addMessage } from "./features/messages/messagesSlice";
import {
  editChannel,
  addChannel,
  removeChannel,
} from "./features/channels/channelsSlice";

const socket = io("http://localhost:5001", {
  autoConnect: true,
});

socket.on("newMessage", (payload) => {
  store.dispatch(addMessage(payload));
});

socket.on("newChannel", (payload) => {
  store.dispatch(addChannel(payload));
});

socket.on("removeChannel", (payload) => {
  store.dispatch(removeChannel(payload.id));
});

socket.on("renameChannel", (payload) => {
  store.dispatch(editChannel(payload));
});

socket.on("connect_error", (error) => {
  console.error("WebSocket connection error:", error);
});

socket.on("connect", () => {
  console.log("WebSocket connected");
});

socket.on("disconnect", () => {
  console.log("WebSocket disconnected");
});

export default socket;

