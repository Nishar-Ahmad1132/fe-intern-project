import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function NoteItem({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow hover:shadow-md transition border border-gray-100">
      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-800">{note.title}</h3>

      {/* Content */}
      <p className="text-sm text-gray-600 mt-1 whitespace-pre-line">
        {note.content || "No content"}
      </p>

      {/* Tags */}
      {note.tags?.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Buttons */}
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onEdit(note)}
          className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition"
        >
          <PencilSquareIcon className="w-4 h-4" /> Edit
        </button>

        <button
          onClick={() => onDelete(note._id)}
          className="flex items-center gap-1 text-red-600 hover:text-red-800 transition"
        >
          <TrashIcon className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}
