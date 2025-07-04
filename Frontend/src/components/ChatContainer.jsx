import { useEffect } from "react";
import { useChatstore } from "../store/useChatstore";
import MessageInput from "./MessageInput";
import Chatheader from "./Chatheader";
import MessageSkeleton from "./MessageSkeleton";

function ChatContainer() {
  const { messages, getMessage, isMessageloading, selectedUser } =
    useChatstore();
  useEffect(() => {
    getMessage(selectedUser._id);
  }, [selectedUser._id, getMessage]);
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
      <p>Messages here </p>
      <MessageInput />
    </div>
  );
}

export default ChatContainer;
