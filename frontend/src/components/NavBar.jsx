import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar({ onLogout, profileName, avatarUrl }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

const apiBase = import.meta.env.VITE_API_URL?.replace("/api", "");

const avatarSrc = avatarUrl
  ? `${apiBase.replace(/\/$/, "")}/${avatarUrl.replace(/^\//, "")}`
  : null;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Branding */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold text-indigo-600 tracking-tight hover:cursor-pointer hover:text-indigo-800 transition"
        >
          FE Intern App
        </h1>

        {/* Right Section */}
        <div className="relative">
          <button
            className="flex items-center gap-2 focus:outline-none"
            onClick={() => setOpen(!open)}
          >
            {avatarSrc ? (
              <img
                src={avatarSrc}
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border border-gray-200 shadow-sm"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600 shadow-sm">
                U
              </div>
            )}

            <span className="text-gray-800 text-sm font-medium">
              {profileName}
            </span>

            <svg
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-100 py-2 animate-fadeIn">
              <button
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                My Profile
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animation keyframes */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.15s ease-out;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-5px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </nav>
  );
}
