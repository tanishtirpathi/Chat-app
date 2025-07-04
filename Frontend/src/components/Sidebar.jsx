import React, { useEffect } from "react";
import { useChatstore } from "../store/useChatstore";
import { useAuthstore } from "../store/useAuthstore";
import SidebarSkeleton from "./skelton";
import { Users } from "lucide-react";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser, isUserloading } =
    useChatstore();

  const { onlineUsers } = useAuthstore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserloading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 md:w-24 lg:w-72 border-r border-[#1f1f1f] bg-[#0e0e0e] flex flex-col transition-all duration-300 ease-in-out">
      {/* Header */}
      <div className="w-full px-4 py-4 lg:py-6 border-b border-[#1f1f1f] bg-gradient-to-r from-[#ca0883] to-[#280020] shadow-sm rounded-tr-xl">
        <div className="flex items-center gap-3 text-white">
          <Users className="size-5 lg:size-6" />
          <span className="text-base lg:text-lg font-semibold hidden lg:inline tracking-wide">
            Insaan Log
          </span>
        </div>
      </div>

      {/* User List */}
      <div className="overflow-y-auto w-full py-4 px-2 space-y-2 flex-1 scrollbar-thin scrollbar-thumb-[#410131] scrollbar-track-[#410131]">
        {Array.isArray(users) &&
          users.map((user) => (
            <button
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`w-full flex items-center gap-3 p-2 md:p-3 rounded-xl transition-all duration-200 group ${
                selectedUser?._id === user._id
                  ? "bg-[#ca0883]/30 ring-1 ring-[#ca0883]"
                  : "hover:bg-[#ffffff08]"
              }`}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.profilePic || "/user.png"}
                  alt={user.fullName || "User"}
                  className="size-8 md:size-9 lg:size-10 object-cover rounded-full border border-[#ffffff20] shadow-md"
                />
                {Array.isArray(onlineUsers) &&
                  onlineUsers.includes(user._id) && (
                    <span className="absolute bottom-0 right-0 size-2 md:size-3 bg-green-500 rounded-full ring-2 ring-[#0e0e0e]" />
                  )}
              </div>
              <div className="hidden lg:flex flex-col justify-center text-white truncate">
                <span className="font-medium text-sm truncate">
                  {user.fullName || "Unknown"}
                </span>
              </div>
            </button>
          ))}
      </div>
    </aside>
  );
}

export default Sidebar;
