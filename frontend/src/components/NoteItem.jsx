import React from "react";

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="flex justify-between">
        <div>
          <div className="font-semibold">{note.title}</div>
          <div className="text-sm text-gray-600 mt-1">{note.content}</div>
          {note.tags?.length > 0 && (
            <div className="mt-2 text-xs text-indigo-600">
              {note.tags.join(", ")}
            </div>
          )}
        </div>
        <div className="flex flex-col justify-start space-y-2">
          <button onClick={() => onEdit(note)} className="text-blue-600">
            Edit
          </button>
          <button onClick={() => onDelete(note._id)} className="text-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
