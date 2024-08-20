import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoLogOut, IoSend } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import useLogout from "../hooks/useLogout";
import {
  fetchConversationUsers,
  fetchMessages,
  sendMessage,
} from "../redux/conversationSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Status } from "../types/globalTypes";
import ChatUser from "./ChatUser";
import LoadingSpinner from "./LoadingSpinner";
import Message from "./Message";

const NoChatSelected = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100/40 rounded-lg">
      <div className="text-5xl mb-4">
        <MdOutlineMessage className="text-indigo-600" />
      </div>
      <div className="px-4 text-center sm:text-lg md:text-xl text-indigo-600 font-semibold flex flex-col items-center gap-2">
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

const ChatContainer = () => {
  const { logout, loading: logoutLoading } = useLogout();
  const dispatch = useAppDispatch();

  const {
    conversationUserStatus,
    conversationUsers,
    selectedConversation,
    messages,
    messageStatus,
  } = useAppSelector((state) => state.conversation);

  useEffect(() => {
    dispatch(fetchConversationUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedConversation?._id) return;
    dispatch(fetchMessages());
  }, [selectedConversation?._id, dispatch, messages.length]);

  console.log(messages);

  const [message, setMessage] = useState("");

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message) return;
    await dispatch(sendMessage(message));
    setMessage("");
  };

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="container w-full max-w-[700px]  py-10 mx-auto shadow-lg rounded-lg bg-white/80 backdrop-blur-sm">
      {/* Chatting */}
      <div className="flex flex-row justify-between ">
        {/* Chat list */}
        <div className="flex flex-col w-2/5 border-r ">
          {/* Search */}
          <div className="border-b border-secondary py-4 px-2">
            <input
              type="text"
              placeholder="Search chatting"
              className="py-2 px-2 border-2 border-secondary rounded-2xl w-full"
            />
          </div>

          {/* User list */}
          <div className="flex flex-col justify-between h-[300px] overflow-y-auto custom-scrollbar">
            {conversationUserStatus === Status.LOADING ? (
              <LoadingSpinner />
            ) : (
              conversationUsers.map((conversationUser) => (
                <ChatUser
                  conversationUser={conversationUser}
                  key={conversationUser?._id}
                />
              ))
            )}
          </div>

          <div className="w-1/2 mt-9 mx-3">
            <button
              onClick={handleLogout}
              disabled={logoutLoading}
              className="flex items-center gap-1"
            >
              {logoutLoading ? (
                <LoadingSpinner />
              ) : (
                <IoLogOut className="size-8 text-indigo-500 inline-block" />
              )}{" "}
              <span className="text-indigo-500">Sign out</span>
            </button>
          </div>
        </div>

        {/* Message */}
        <div className="w-full flex flex-col px-5 justify-between">
          {!selectedConversation ? (
            <NoChatSelected />
          ) : (
            <>
              <div className="flex gap-1">
                <img
                  src={selectedConversation.profilePicture}
                  alt={selectedConversation.fullName}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <h1 className="text-indigo-600 text-base m-2">
                  {selectedConversation.fullName}
                </h1>
              </div>

              <div className="h-[300px] overflow-y-auto custom-scrollbar flex flex-col justify-end mt-5 space-y-4">
                <Message
                  sender
                  text="Welcome to the group everyone!"
                  image="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                />
                <Message
                  text="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                  image="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                />
                <Message
                  sender
                  text="Lorem ipsum dolor sit amet consectetur."
                  image="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                />
                <Message
                  text="Happy holiday guys!"
                  image="https://source.unsplash.com/vpOeXr5wmR4/600x600"
                />
              </div>

              {/* Input */}
              <div className="py-5 px-2">
                <form
                  className="py-5 w-full relative"
                  onSubmit={handleMessageSubmit}
                >
                  <input
                    className="w-full  border-secondary py-4 outline-none placeholder:px-2 px-4 rounded-xl placeholder-gray-500"
                    type="text"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white rounded-full p-2 hover:bg-indigo-600"
                  >
                    {messageStatus === Status.LOADING ? (
                      <AiOutlineLoading3Quarters className="animate-spin text-white size-4" />
                    ) : (
                      <IoSend />
                    )}
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
