import React, { useState } from "react";
import { Camera, Mail, User } from "lucide-react";

import useAuthStore from "../../store/useAuthStore.js";
export default function ProfilePage() {
  const { authUser, isUpdateProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);

      console.log("Sending profile update:", { profilePic: base64Image }); // Debugging

      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="w-full  ">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl text-white font-semibold">Profile</h1>
            <p className="mt-2 text-white">Your profile information </p>
          </div>

          {/*  Avatar Image profile pic upload  */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-white"
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200
              ${isUpdateProfile ? "animate-pulse pointer-events-none" : ""} `}
              >
                <Camera className="w-5 h-5 text-base-200 hover:text-white transition-all" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdateProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdateProfile
                ? "Uploading..."
                : "Click the Camera icon to update your photo "}
            </p>
          </div>
          <div className="space-y-6 text-white">
            <div className="space-y-1.5">
              <div className="text-sm text-white flex items-center gap-2">
                <User className="w-4 h-4  text-white" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.fullname}
              </p>
            </div>
            <div className="space-y-1.5">
              <div className="text-sm  flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {authUser?.email}
              </p>
            </div>

            <div className="mt-6 bg-base-300 rounded-xl p-6 text-white">
              <h2 className="text-lg font-medium mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>
                    {authUser?.createdAt
                      ? authUser.createdAt.split("T")[0]
                      : "N/A"}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 ">
                  <span>Account Status </span>
                  <span className="text-green-500 ">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
