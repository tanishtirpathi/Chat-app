import React from 'react'
import { useChatstore } from "../store/useChatstore";
import NoChatSelected from "../components/NoChatSelected"
import Sidebar from "../components/Sidebar"
import { Meteors } from "../components/magicui/meteors";
import ChatContainer from "../components/ChatContainer"


const Homepage=()=>{
  const { selectedUser } = useChatstore();
  return (
<div className="h-screen w-screen bg-black">        <Meteors />
      <div className="flex items-center justify-center pt-15 px-4 rounded-lg">
        <div className="bg-[#440133] rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage;