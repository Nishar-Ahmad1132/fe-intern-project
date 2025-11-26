import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import API from "../services/api";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  // helper to fetch profile (used on mount and on error fallback)
  const fetchProfile = async () => {
    try {
      const r = await API.get("/profile");
      setProfile(r.data);
      setEditName(r.data.name || "");
      setEditEmail(r.data.email || "");
    } catch (err) {
      console.error("Failed to load profile", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!file) return setMsg("Select a file first");

    const form = new FormData();
    form.append("avatar", file);

    try {
      const res = await API.put("/profile/avatar", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // backend returns { avatarUrl: "/uploads/..." } — merge it
      const avatarUrl = res.data?.avatarUrl ?? null;
      setProfile((prev) => (prev ? { ...prev, avatarUrl } : prev));
      setMsg("Avatar updated successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.msg || "Upload failed");
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setMsg("");
    // optimistic update: keep UI responsive while request is in-flight
    const previous = profile;
    setProfile((p) => (p ? { ...p, name: editName, email: editEmail } : p));
    setIsEditing(false);

    try {
      const res = await API.put("/profile", {
        name: editName,
        email: editEmail,
      });

      // backend might return:
      // 1) user object directly -> res.data = { ...user }
      // 2) wrapper -> res.data = { msg: '...', user: { ... } }
      // 3) only msg -> res.data = { msg: 'Profile updated' }
      const returnedUser =
        res.data?.user ??
        (res.data && typeof res.data.name === "string" ? res.data : null);

      if (returnedUser) {
        // merge returned fields and preserve avatarUrl if backend didn't include it
        setProfile((prev) => ({
          ...prev,
          ...returnedUser,
          avatarUrl: returnedUser.avatarUrl ?? prev?.avatarUrl ?? null,
        }));
        setEditName(returnedUser.name ?? editName);
        setEditEmail(returnedUser.email ?? editEmail);
      } else {
        // backend didn't return user object, keep optimistic update (already applied)
        // but to be safe, re-fetch profile to get canonical state
        await fetchProfile();
      }

      setMsg("Profile updated successfully!");
    } catch (err) {
      console.error("Update profile failed:", err);
      // revert optimistic update
      setProfile(previous);
      setMsg(err.response?.data?.msg || "Update failed");
    }
  };

  if (!profile) return <div className="text-center mt-10">Loading...</div>;

  const apiBase = (import.meta.env.VITE_API_URL || "").replace("/api", "");
  const avatarSrc =
    profile.avatarUrl &&
    `${apiBase.replace(/\/$/, "")}/${profile.avatarUrl.replace(/^\//, "")}`;

  return (
    <>
    {/* <NavBar
        onLogout={logout}
        profileName={profile?.name || "..."}
        avatarUrl={profile?.avatarUrl}
      /> */}
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl border border-gray-100 animate-fadeIn">
      

      <h2 className="text-2xl font-semibold text-indigo-600 mb-5">
        My Profile
      </h2>

      {/* Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-6">
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt="avatar"
            className="w-20 h-20 rounded-full object-cover shadow-md border"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-xl text-gray-600 shadow-inner">
            U
          </div>
        )}

        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold text-gray-800">
            {profile.name}
          </h3>
          <p className="text-sm text-gray-500">{profile.email}</p>

          <button
            onClick={() => {
              setIsEditing((v) => !v);
              // reset edit fields if opening the editor
              if (!isEditing) {
                setEditName(profile.name || "");
                setEditEmail(profile.email || "");
              }
            }}
            className="mt-2 text-sm text-indigo-600 hover:underline"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>
      </div>

      {/* Edit Profile Section */}
      {isEditing && (
        <form
          onSubmit={saveProfile}
          className="space-y-4 p-4 border rounded-lg bg-gray-50 mb-6 animate-slideDown"
        >
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Name
            </label>
            <input
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setEditName(profile.name || "");
                setEditEmail(profile.email || "");
              }}
              className="py-2 px-4 bg-gray-100 rounded-md hover:bg-gray-200 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Avatar Upload */}
      <form onSubmit={upload} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Update Avatar
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 transition"
        >
          Upload Avatar
        </button>
      </form>

      {/* Message */}
      {msg && (
        <div
          className={`mt-4 text-sm px-3 py-2 rounded-md ${
            msg.toLowerCase().includes("success")
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {msg}
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          .animate-fadeIn { animation: fadeIn 0.3s ease-in-out; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

          .animate-slideDown { animation: slideDown 0.25s ease-out; }
          @keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        `}
      </style>
    </div>
    </>
  );
}
