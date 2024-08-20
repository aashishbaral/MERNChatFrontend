import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { API } from "../http/http";
import { Status } from "../types/globalTypes";

export type Conversation = {
  _id: string;
  messages: string[];
};

export interface ConversationUser {
  _id: string;
  email: string;
  fullName: string;
  gender: string;
  profilePicture: string;
  username: string;
}

interface ConversationState {
  conversations: Conversation[];
  selectedConversation: ConversationUser | null;
  messages: string[];
  conversationStatus: Status;
  conversationUsers: ConversationUser[];
  conversationUserStatus: Status;
}

const initialState: ConversationState = {
  conversations: [],
  selectedConversation: null,
  messages: [],
  conversationStatus: Status.IDLE,
  conversationUsers: [],
  conversationUserStatus: Status.IDLE,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversations(state, action) {
      state.conversations = action.payload;
    },
    setSelectedConversation(state, action) {
      state.selectedConversation = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setConversationStatus(state, action) {
      state.conversationStatus = action.payload;
    },
    setConversationUsers(state, action) {
      state.conversationUsers = action.payload;
    },
    setConversationUserStatus(state, action) {
      state.conversationStatus = action.payload;
    },
  },
});

export const {
  setConversations,
  setSelectedConversation,
  setConversationUserStatus,
  setConversationUsers,
  setMessages,
  setConversationStatus,
} = conversationSlice.actions;
export default conversationSlice.reducer;

export const fetchConversationUsers = () => {
  return async (dispatch: any) => {
    dispatch(setConversationUserStatus(Status.LOADING));
    try {
      const { data } = await API.get("users");
      dispatch(setConversationUsers(data.data));
    } catch (error) {
      const errorMessage =
        error instanceof AxiosError && error.response?.data?.message
          ? error.response.data.message
          : "An error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      // dispatch(setConversationUserStatus(Status.IDLE));
    }
  };
};
