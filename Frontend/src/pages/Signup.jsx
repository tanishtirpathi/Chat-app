import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthstore } from "../store/useAuthstore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Meteors } from "../components/magicui/meteors";
import { RainbowButton } from "../components/magicui/rainbow-button";
import { BorderBeam } from "../components/magicui/border-beam";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signup, isSigninup } = useAuthstore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen w-screen relative flex items-center justify-center bg-[black]">
      <Meteors />
      <div className="absolute inset-0 bg-[url('/bg-pattern.jpg')] bg-cover bg-center opacity-10 blur-sm" />

      <div className="z-10 w-full max-w-md px-8 py-5 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl text-white">
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-8">
          {" "}
          <BorderBeam />
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-primary/30">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl font-semibold">Create Account</h2>
          <p className="text-sm text-white/60">Start your journey with us</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-white/40">
                <User className="w-5 h-5" />
              </span>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:outline-none"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

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
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:outline-none"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                type={"password"}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-2 focus:ring-primary focus:outline-none"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <RainbowButton
            type="submit"
            className="w-full py-2 rounded-lg bg-primary hover:bg-primary/90 transition-all text-white font-medium flex justify-center items-center gap-2"
            disabled={isSigninup}
          >
            {isSigninup ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </RainbowButton>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-white/60 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white  hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
