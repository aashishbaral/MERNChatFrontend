type MessageProps = {
  sender?: boolean;
  text: string;
  image: string;
};

const Message: React.FC<MessageProps> = ({ sender, text, image }) => (
  <div
    className={`flex ${
      sender ? "justify-end" : "justify-start"
    } mb-4 items-center`}
  >
    {!sender && (
      <img
        src={image}
        className="object-cover h-8 w-8 rounded-full"
        alt="User"
      />
    )}
    <div
      className={`${
        sender ? "bg-blue-400 text-white" : "bg-gray-400 text-white ml-2"
      } py-3 px-4 rounded-3xl max-w-xs`}
    >
      {text}
    </div>
    {sender && (
      <img
        src={image}
        className="object-cover h-8 w-8 rounded-full ml-2"
        alt="User"
      />
    )}
  </div>
);

export default Message;
