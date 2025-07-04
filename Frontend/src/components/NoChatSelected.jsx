import { BedDouble } from "lucide-react";
import "./chat.css"; // You’ll create this file (see below)

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 min-h-screen rounded-lg custom-gradient">
      <div className="max-w-lg text-center space-y-6 text-white rounded-lg">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="w-16 h-16 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm 
              shadow-lg flex items-center justify-center animate-bounce"
            >
              <BedDouble className="w-8 h-8 text-pink-300" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-3xl font-bold tracking-tight text-white drop-shadow-lg">Welcome to my chat app !</h2>
        <p className="text-zinc-300 text-base">
      
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
