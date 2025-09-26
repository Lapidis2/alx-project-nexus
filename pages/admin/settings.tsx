"use client";

import React, { useState } from "react";
import Image from "next/image";

interface UserProfileProps {
  profileImage?: string | null;
  name?: string;
}

const SettingsPage: React.FC<UserProfileProps> = ({ profileImage}) => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  const initialProfile = {
    email: "jean@gmail.com",
    name: "Jean Pierre Hitayezu",
  };

  const [profile, setProfile] = useState(initialProfile);

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const resetProfile = () => setProfile(initialProfile);
  const resetPasswords = () =>
    setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });

  
  const getInitials = (fullName?: string) => {
    if (!fullName) return "U";
    return fullName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow mt-20">
      {/* Tabs */}
      <div className="flex gap-8 border-b">
        <button
          className={`py-2 px-4 -mb-px ${
            activeTab === "profile"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`py-2 px-4 -mb-px ${
            activeTab === "password"
              ? "border-b-2 border-blue-600 text-blue-600 font-medium"
              : "text-gray-700"
          }`}
          onClick={() => setActiveTab("password")}
        >
          Change password
        </button>
      </div>

      <div className="mt-8">
        {activeTab === "profile" ? (
         
          <div className="flex flex-col md:flex-row gap-12">
            
            <div className="flex flex-col items-center md:w-1/3">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt="profile"
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full object-cover"
                />
              ) : (
                <Image
                  src="/assets/images/profile.png"
                  alt="profile placeholder"
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full object-cover"
                  onError={(e) => {
               
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = document.getElementById("fallback-initials");
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              )}

              {/* Initials fallback */}
              <div
                id="fallback-initials"
                style={{ display: "none" }}
                className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-400 text-white text-2xl font-bold"
              >
                {getInitials(profile.name)}
              </div>

              <button className="mt-4 px-4 py-2 border rounded text-sm hover:bg-gray-50">
                Upload picture
              </button>
              <p className="text-xs text-gray-400 mt-2">PNG or JPG file</p>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col gap-6 flex-1">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile({ ...profile, email: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={resetProfile}
                  className="px-4 py-2 text-gray-600 hover:underline"
                >
                  Discard
                </button>
                <button className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Password Tab
          <div className="flex flex-col gap-6 max-w-lg">
            <div>
              <label className="block text-sm font-medium mb-1">
                Old Password
              </label>
              <input
                type="password"
                value={passwords.oldPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, oldPassword: e.target.value })
                }
                placeholder="Enter Old Password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                New Password
              </label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, newPassword: e.target.value })
                }
                placeholder="Enter New Password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Re-Type New Password
              </label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) =>
                  setPasswords({
                    ...passwords,
                    confirmPassword: e.target.value,
                  })
                }
                placeholder="Re-Type New Password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={resetPasswords}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                Discard
              </button>
              <button className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
                Save changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
