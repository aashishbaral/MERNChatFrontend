import ChatUser from "./ChatUser";
import Message from "./Message";

const ChatContainer = () => {
  return (
    <div className="container w-full md:w-3/4 lg:w-2/3 py-10 mx-auto shadow-lg rounded-lg bg-white/80 backdrop-blur-sm">
      {/* Header */}
      <div className="px-5 py-5 flex justify-between items-center bg-transparent border-b border-secondary">
        <div className="font-semibold text-2xl text-gray-800">GoingChat</div>
        <div className="w-1/2">
          <input
            type="text"
            placeholder="Search"
            className="rounded-2xl  outline-none py-3 px-5 w-full placeholder:text-gray-500"
          />
        </div>
        <div className="h-12 w-12 p-2 bg-yellow-500 rounded-full text-white font-semibold flex items-center justify-center">
          RA
        </div>
      </div>

      {/* Chatting */}
      <div className="flex flex-row justify-between ">
        {/* Chat list */}
        <div className="flex flex-col w-2/5 border-r overflow-y-auto">
          {/* Search */}
          <div className="border-b border-secondary py-4 px-2">
            <input
              type="text"
              placeholder="Search chatting"
              className="py-2 px-2 border-2 border-secondary rounded-2xl w-full"
            />
          </div>

          {/* User list */}
          <div className="flex flex-col">
            <ChatUser
              image="https://source.unsplash.com/_7LbC5J-jw4/600x600"
              name="Luis1994"
              message="Pick me at 9:00 Am"
            />
            <ChatUser
              image="https://source.unsplash.com/otT2199XwI8/600x600"
              name="Everest Trip 2021"
              message="Hi Sam, Welcome"
            />
            <ChatUser
              image="https://source.unsplash.com/L2cxSuKWbpo/600x600"
              name="MERN Stack"
              message="Lusi: Thanks Everyone"
              isActive
            />
            <ChatUser
              image="https://source.unsplash.com/vpOeXr5wmR4/600x600"
              name="Javascript Indonesia"
              message="Evan: Someone can fix this"
            />
          </div>
        </div>

        {/* Message */}
        <div className="w-full px-5 flex flex-col justify-between ">
          <div className="flex flex-col mt-5 space-y-4">
            <Message
              sender
              text="Welcome to group everyone!"
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
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
