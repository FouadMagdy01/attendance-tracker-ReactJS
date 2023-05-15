import { createSlice } from "@reduxjs/toolkit";
import type { NoticeType } from "antd/es/message/interface";

interface StateTypes {
  messageId: String;
  messageDuration: number;
  messageType: NoticeType;
  messageContent: String;
}
interface PayloadTypes {
  duration?: number;
  context: String;
  type: NoticeType;
}
interface ActionTypes {
  type?: any;
  payload: PayloadTypes;
}
const initialState = {
  messageId: "",
  messageDuration: 4,
  messageType: "success",
  messageContent: "",
} as StateTypes;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    displayMessage: (state, action: ActionTypes) => {
      const now = new Date().getTime();
      const messageId = ((Math.random() * Math.random()) / now).toString();
      return {
        messageId: messageId,
        messageDuration: action.payload.duration
          ? action.payload.duration
          : state.messageDuration,
        messageType: action.payload.type,
        messageContent: action.payload.context,
      };
    },
  },
});

export const displayMessage = notificationSlice.actions.displayMessage;
export default notificationSlice.reducer;
