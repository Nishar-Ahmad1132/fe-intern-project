import React from "react";

export default function NavBar({ onLogout, profileName, avatarUrl }) {
  return (
    <nav className="bg-white shadow p-3 mb-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold">FE Intern App</div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {avatarUrl ? (
              <img
                src={
                  import.meta.env.VITE_API_URL?.replace("/api", "") + avatarUrl
                }
                alt="avatar"
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                U
              </div>
            )}
            <div className="text-sm text-gray-600">{profileName}</div>
          </div>
          <button
            onClick={onLogout}
            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
