import { useEffect } from "react";
import { useChatstore } from "../store/useChatstore";
import MessageInput from "./MessageInput";
import Chatheader from "./Chatheader";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthstore } from "../store/useAuthstore";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { withCredentials: true });

function ChatContainer() {
  const { messages, getMessage, isMessageloading, selectedUser, setMessage } =
    useChatstore();
  const { authUser } = useAuthstore();

  useEffect(() => {
    getMessage(selectedUser._id);
    if (authUser?._id) {
      socket.emit("join", authUser._id);
    }
    socket.off("newMessage").on("newMessage", (message) => {
      // Only add message if it's for the selected user
      if (
        (message.senderId === selectedUser._id && message.receverId === authUser._id) ||
        (message.senderId === authUser._id && message.receverId === selectedUser._id)
      ) {
        setMessage(message);
      }
    });
    return () => {
      socket.off("newMessage");
    };
  }, [selectedUser._id, getMessage, authUser?._id, setMessage]);

  if (isMessageloading) 
        return (
      <div className="flex-1 flex flex-col overflow-auto">
        <Chatheader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <Chatheader />
      <div className="flex-1 overflow-y-auto p-4">
        {messages && messages.length > 0 ? (
          messages.map((msg, idx) => (
            <div key={msg._id || idx} className={`mb-2 ${msg.senderId === authUser?._id ? 'text-right' : 'text-left'}`}> 
              <span className="inline-block px-3 py-2 rounded bg-gray-200 dark:bg-gray-700">
                {msg.text}
              </span>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">No messages yet.</p>
        )}
      </div>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
