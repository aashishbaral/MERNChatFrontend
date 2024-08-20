import {
  ConversationUser,
  setSelectedConversation,
} from "../redux/conversationSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type ChatUserProps = {
  conversationUser: ConversationUser;
};

const ChatUser: React.FC<ChatUserProps> = ({ conversationUser }) => {
  const { fullName, profilePicture } = conversationUser;
  const dispatch = useAppDispatch();
  const { selectedConversation } = useAppSelector(
    (state) => state.conversation
  );

  const isActive = selectedConversation?._id === conversationUser._id;
  return (
    <div
      className={`flex flex-row py-4 px-2 gap-1 items-center border-b cursor-pointer border-gray-200 ${
        isActive ? "border-l-4 border-blue-400 bg-indigo-200 " : ""
      }`}
      onClick={() => dispatch(setSelectedConversation(conversationUser))}
    >
      <div className="w-1/4">
        <img
          src={profilePicture}
          className="object-cover h-10 w-14 rounded-full"
          alt={fullName}
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold text-gray-800">{fullName}</div>
        {/* <span className="text-gray-500">{message}</span> */}
      </div>
    </div>
  );
};

export default ChatUser;
