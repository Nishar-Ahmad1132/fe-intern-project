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
    <div className="bg-white p-5 rounded-xl shadow border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {isEditing ? "Edit Note" : "Create New Note"}
      </h3>

      <form onSubmit={onSubmit} className="space-y-4">
        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title..."
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-600 transition"
        />

        {/* Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note..."
          rows={5}
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-600 transition"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            {isEditing ? "Update Note" : "Add Note"}
          </button>

          {isEditing && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
