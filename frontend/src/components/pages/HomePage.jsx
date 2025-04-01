import React from "react";
import { useChatStore } from "../../store/useChatStore.js";
import SideBar from "../HomePage/SideBar.jsx";
import NoChatSelected from "../HomePage/NoChatSelected.jsx";
import ChatContainer from "../HomePage/ChatContainer.jsx";
// import ChatContainer from "../HomePage/ChatContainer.jsx";

export default function HomePage() {
  const { selectedUser } = useChatStore();

  return (
    <div className="w-full bg-base-300 min-h-screen flex justify-center">
      <div className="flex items-center pt-20 px-4 w-full max-w-7xl">
        <div className="bg-base-100 rounded-lg shadow-lg w-full h-[calc(100vh-8rem)] flex">
          <SideBar />
          <div className="flex flex-grow overflow-hidden">
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
}
