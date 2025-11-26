import React from "react";

export default function NoteForm({
  title,
  content,
  setTitle,
  setContent,
  onSubmit,
  isEditing,
  onCancel,
}) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">
        {isEditing ? "Edit Note" : "New Note"}
      </h3>
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border p-2 rounded"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          className="w-full border p-2 rounded"
          rows={5}
        />
        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            {isEditing ? "Update" : "Create"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
