import React, { useEffect, useState } from "react";
import API from "../services/api";
import NavBar from "../components/NavBar";
import NoteItem from "../components/NoteItem";
import NoteForm from "../components/NoteForm";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [notes, setNotes] = useState([]);
  const [q, setQ] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);
  const [totalPages, setTotalPages] = useState(1);

  const loadProfile = async () => {
    try {
      const res = await API.get("/profile");
      setProfile(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadNotes = async (query = "", pageNum = 1) => {
    try {
      const res = await API.get("/notes", {
        params: { q: query, page: pageNum, limit: perPage },
      });
      setNotes(res.data.notes || res.data);
      const p = res.data.pagination || { totalPages: 1 };
      setTotalPages(p.totalPages || 1);
      setPage(p.page || pageNum);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await loadProfile();
      await loadNotes();
      setLoading(false);
    };
    init();
  }, []);

  const submitNote = async (e) => {
    e?.preventDefault();
    if (!title) return alert("Title required");

    try {
      if (editId) {
        await API.put(`/notes/${editId}`, { title, content });
      } else {
        await API.post("/notes", { title, content });
      }

      setTitle("");
      setContent("");
      setEditId(null);
      loadNotes(q);
    } catch (err) {
      console.error(err);
      alert("Error saving note");
    }
  };

  const edit = (n) => {
    setEditId(n._id);
    setTitle(n.title);
    setContent(n.content || "");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id) => {
    if (!confirm("Delete note?")) return;
    await API.delete(`/notes/${id}`);
    loadNotes(q);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar
        onLogout={logout}
        profileName={profile?.name || "..."}
        avatarUrl={profile?.avatarUrl}
      />

      <div className="max-w-7xl mx-auto p-4">
        {/* Search */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes..."
            className="border border-gray-300 p-2 px-4 rounded-md w-full sm:max-w-sm focus:ring-indigo-500 focus:border-indigo-600"
          />
          <button
            onClick={() => loadNotes(q)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Form */}
          <div className="md:col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
              <NoteForm
                title={title}
                content={content}
                setTitle={setTitle}
                setContent={setContent}
                onSubmit={submitNote}
                isEditing={!!editId}
                onCancel={() => {
                  setEditId(null);
                  setTitle("");
                  setContent("");
                }}
              />
            </div>
          </div>

          {/* Notes Section */}
          <div className="md:col-span-2">
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 bg-gray-200 animate-pulse rounded-xl"
                  />
                ))}
              </div>
            )}

            {!loading && notes.length === 0 && (
              <div className="text-center py-10 text-gray-500 animate-fadeIn">
                <p className="text-lg">No notes found</p>
                <p className="text-sm">Create a new note to get started</p>
              </div>
            )}

            {!loading && (
              <div className="grid grid-cols-1 gap-4">
                {notes.map((n) => (
                  <NoteItem
                    key={n._id}
                    note={n}
                    onEdit={edit}
                    onDelete={remove}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 gap-3">
                <button
                  disabled={page === 1}
                  onClick={() => loadNotes(q, page - 1)}
                  className="px-4 py-2 border rounded-md disabled:opacity-40"
                >
                  Prev
                </button>
                <span className="px-3 py-2 bg-gray-100 rounded-md">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => loadNotes(q, page + 1)}
                  className="px-4 py-2 border rounded-md disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        <style>
          {`
            .animate-fadeIn {
              animation: fadeIn 0.25s ease-out;
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(6px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>
    </div>
  );
}
