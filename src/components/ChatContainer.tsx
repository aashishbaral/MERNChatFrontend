import { useEffect } from "react";
import { IoLogOut } from "react-icons/io5";
import { MdOutlineMessage } from "react-icons/md";
import useLogout from "../hooks/useLogout";
import { fetchConversationUsers } from "../redux/conversationSlice";
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

  const { conversationUserStatus, conversationUsers, selectedConversation } =
    useAppSelector((state) => state.conversation);

  console.log(conversationUsers);

  useEffect(() => {
    dispatch(fetchConversationUsers());
  }, [dispatch]);

  const handleLogout = () => {
    logout();
  };
  return (
    <div className="container w-full max-w-[700px]  py-10 mx-auto shadow-lg rounded-lg bg-white/80 backdrop-blur-sm">
      {/* Header */}
      {/* <div className="px-5 py-5 flex justify-between items-center bg-transparent border-b border-secondary">
        <div className="font-semibold text-2xl text-gray-800">GoingChat</div>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search"
            className="rounded-2xl outline-none py-3 px-5 w-full placeholder:text-gray-500"
          />
        </div>
        <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          RA
        </div>
      </div> */}

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
                <ChatUser conversationUser={conversationUser} />
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
              <h1 className="text-indigo-400 text-base m-2">
                {selectedConversation.fullName}
              </h1>
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
              <div className="py-5">
                <input
                  className="w-full border-secondary py-4 outline-none placeholder:px-2 px-4 rounded-xl placeholder-gray-500"
                  type="text"
                  placeholder="Type your message here..."
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
