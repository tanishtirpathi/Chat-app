import { X } from "lucide-react";
import { useAuthstore } from "../store/useAuthStore";
import { useChatstore } from "../store/useChatstore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatstore();
  const { onlineUsers } = useAuthstore();

  const isOnline =
    Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-4 py-3 border-b border-[#1f1f1f] bg-gradient-to-r from-[#1a1a1a] via-[#0e0e0e] to-[#1a1a1a] shadow-sm">
      <div className="flex items-center justify-between">
        {/* User Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 md:size-11 rounded-full border-2 border-[#ffffff20] shadow-md object-cover"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 block size-3 rounded-full bg-green-500 ring-2 ring-[#0e0e0e] animate-pulse" />
            )}
          </div>

          <div className="text-white">
            <h3 className="font-semibold text-base md:text-lg tracking-wide">
              {selectedUser.fullName}
            </h3>
            <p
              className={`text-sm ${
                isOnline ? "text-green-400" : "text-gray-500"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-white"
          title="Close Chat"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
