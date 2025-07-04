import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuthstore } from "../store/useAuthstore";
import { Meteors } from "../components/magicui/meteors";
import { RainbowButton } from "../components/magicui/rainbow-button";
import { BorderBeam } from "../components/magicui/border-beam";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingin } = useAuthstore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen w-screen relative flex items-center justify-center bg-black">
      {/* Background overlay */}
        <Meteors />
      <div className="absolute inset-0  bg-cover bg-center opacity-10 blur-sm" />

      {/* Glass card */}

<div
  className="z-10 w-full max-w-md px-8 py-10 
  bg-gradient-to-br from-pink-100/10 via-pink-900/30 to-pink-990/40 
  backdrop-blur-lg border border-white/10 
  rounded-2xl shadow-2xl text-white  font-[syne]"
>

          {/* Logo */}
          <div className="flex flex-col items-center gap-3 mb-8">
            <BorderBeam />
            <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-primary/30">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-3xl font-semibold font-[syne]">Welcome Back</h2>
            <p className="text-sm text-white/60">Login to your account</p>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Email
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                  <Lock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-white/40 "
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <RainbowButton
              type="submit"
              className="w-full py-2 rounded-lg bg-primary hover:bg-primary/90 transition-all text-white font-medium flex justify-center items-center gap-2"
              disabled={isLoggingin}
            >
              {isLoggingin ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </RainbowButton>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 text-white/60 text-sm">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-red hover:underline">
              Create one
            </Link>
          </div>
        </div>
      
    </div>
  );
};

export default Login;
