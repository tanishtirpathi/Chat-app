import React, { useState } from 'react';
import { Camera, Mail, User } from 'lucide-react';
import { useAuthstore } from '../store/useAuthstore';
import { BorderBeam } from "../components/magicui/border-beam";

function Profile() {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthstore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageupload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("File too large (max 2MB)");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex items-center justify-center p-4">
      <div className=" mt-10 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl rounded-2xl border border-pink-500/20 shadow-2xl shadow-pink-500/10 max-w-md w-full overflow-hidden">
        <BorderBeam />

        {/* Header */}
        <div className="relative bg-gradient-to-rb from-pink-600/20 to-pink-100/20 p-4 border-b border-pink-500/20 text-center">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative">
            <h1 className="text-2xl font-bold text-[#FFE7EE]">Profile</h1>
            <p className="mt-1 text-sm text-pink-200/80">Manage your profile information</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1  rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <img
                  src={selectedImg || authUser?.profilePic || "/user.png"}
                  alt="Profile"
                  className="size-24 rounded-full object-cover border-2 border-[#F2D2BD] shadow-lg"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`absolute -bottom-2 -right-2 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700
                    p-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110
                    shadow-lg shadow-pink-500/30 border-2 border-black
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-50" : ""}`}
                >
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageupload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
            </div>
            <p className="text-pink-300/80 text-xs text-center">
              {isUpdatingProfile ? (
                <span className="flex items-center gap-2 justify-center">
                  <div className="w-3 h-3 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                  Uploading...
                </span>
              ) : (
                "Click the camera icon to update your photo"
              )}
            </p>
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FFE7EE]">
              <User className="w-4 h-4" />
              <span className="text-xs font-medium">Full Name</span>
            </div>
            <div className="bg-gray-800/50 border border-pink-500/20 rounded-lg p-3">
              <p className="text-sm text-white font-medium">{authUser?.fullName}</p>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#FFE7EE]">
              <Mail className="w-4 h-4" />
              <span className="text-xs font-medium">Email Address</span>
            </div>
            <div className="bg-gray-800/50 border border-pink-500/20 rounded-lg p-3">
              <p className="text-sm text-white font-medium">{authUser?.email}</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-900/30 border border-pink-500/20 rounded-xl p-4">
            <h2 className="text-base font-semibold mb-3 text-pink-400 flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              Account Information
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-2 border-b border-pink-500/10">
                <span className="text-pink-200/80">Member Since</span>
                <span className="text-white bg-pink-500/10 px-2 py-0.5 rounded-md">
                  {authUser?.createdAt?.split("T")[0]}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-pink-200/80">Account Status</span>
                <span className="flex items-center gap-1 text-green-400 bg-green-500/10 px-2 py-0.5 rounded-md">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Active
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;
