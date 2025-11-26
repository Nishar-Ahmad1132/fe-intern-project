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
      setNotes(res.data.notes || res.data); // old responses might be array
      const pagination = res.data.pagination || { totalPages: 1 };
      setTotalPages(pagination.totalPages || 1);
      setPage(pagination.page || pageNum);
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
    <div>
      <NavBar onLogout={logout} profileName={profile?.name || "..."} />
      <div className="container mx-auto p-4">
        <div className="mb-4 flex items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search notes..."
            className="border p-2 rounded w-full max-w-md"
          />
          <button
            onClick={() => loadNotes(q)}
            className="px-3 py-1 bg-indigo-600 text-white rounded"
          >
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
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

          <div className="md:col-span-2 space-y-3">
            {loading && <div>Loading...</div>}
            {!loading && notes.length === 0 && (
              <div className="text-gray-500">No notes yet.</div>
            )}
            {!loading &&
              notes.map((n) => (
                <NoteItem
                  key={n._id}
                  note={n}
                  onEdit={edit}
                  onDelete={remove}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
