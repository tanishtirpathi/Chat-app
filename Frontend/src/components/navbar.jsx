import { Link } from "react-router-dom";
import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { useAuthstore } from "../store/useAuthstore";
import { RippleButton } from "../components/magicui/ripple-button";

const Navbar = () => {
  const { logout, authUser } = useAuthstore();

  return (
    <header className="fixed top-0 z-40 w-full bg-black/80 backdrop-blur border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-1.5 rounded-md bg-white/10 backdrop-blur-sm group-hover:bg-white/20 transition">
            <MessageSquare className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-200" />
          </div>
          <h2 className="text-white text-lg font-bold tracking-wide group-hover:text-pink-400 transition-all">
            Zinc
          </h2>
        </Link>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-3">
          {/* Settings */}
       

          {/* Profile */}
          {authUser && (
            <>
              <RippleButton className="flex aligh-center items-center gap-2 px-4 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium backdrop-blur-md transition-all duration-200">
                <User className="w-5 h-5" />
                <Link to="/profile" className="hidden sm:inline px-2">
                  Profile
                </Link>
              </RippleButton>

              {/* Logout with rainbow animation */}
              <RippleButton
                onClick={logout}
                className="flex aligh-center items-center gap-2 px-4 h-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-medium backdrop-blur-md transition-all duration-300"
              >
                <LogOut className="w-5 h-5 text-white" />
                <span
                  className="hidden sm:inline bg-gradient-to-r from-pink-500 via-yellow-400 via-green-400 via-blue-400 to-purple-500 
                    bg-[length:200%_auto] text-transparent bg-clip-text 
                    animate-gradient font-bold tracking-wide px-2"
                >
                  Logout
                </span>
              </RippleButton>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
