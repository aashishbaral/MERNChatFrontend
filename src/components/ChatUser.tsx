type ChatUserProps = {
  image: string;
  name: string;
  message: string;
  isActive?: boolean;
};

const ChatUser: React.FC<ChatUserProps> = ({
  image,
  name,
  message,
  isActive,
}) => (
  <div
    className={`flex flex-row py-4 px-2 items-center border-b border-gray-200 ${
      isActive ? "border-l-4 border-blue-400 bg-gray-100" : ""
    }`}
  >
    <div className="w-1/4">
      <img
        src={image}
        className="object-cover h-12 w-12 rounded-full"
        alt={name}
      />
    </div>
    <div className="w-full">
      <div className="text-lg font-semibold text-gray-800">{name}</div>
      <span className="text-gray-500">{message}</span>
    </div>
  </div>
);

export default ChatUser;
