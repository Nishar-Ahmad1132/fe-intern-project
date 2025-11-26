import React, { useState, useEffect } from "react";
import API from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    API.get("/profile")
      .then((r) => setProfile(r.data))
      .catch(() => {});
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    if (!file) return setMsg("Select a file first");
    const form = new FormData();
    form.append("avatar", file);
    try {
      const res = await API.put("/profile/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMsg("Uploaded");
      setProfile((prev) => ({ ...prev, avatarUrl: res.data.avatarUrl }));
    } catch (err) {
      setMsg(err.response?.data?.msg || "Upload failed");
    }
  };

  if (!profile) return <div>Loading...</div>;
  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-3">Profile</h2>
      <div className="flex items-center gap-3 mb-4">
        {profile.avatarUrl ? (
          <img
            src={
              import.meta.env.VITE_API_URL.replace("/api", "") +
              profile.avatarUrl
            }
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
            U
          </div>
        )}
        <div>
          <div className="font-semibold">{profile.name}</div>
          <div className="text-sm text-gray-600">{profile.email}</div>
        </div>
      </div>

      <form onSubmit={upload} className="space-y-2">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button className="px-3 py-1 bg-indigo-600 text-white rounded">
          Upload avatar
        </button>
      </form>
      {msg && <div className="mt-2 text-sm text-gray-600">{msg}</div>}
    </div>
  );
}
