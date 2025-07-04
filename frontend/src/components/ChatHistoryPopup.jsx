import React from "react";

export default function ChatHistoryPopup({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px] relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✖️
        </button>
        <h2 className="text-lg font-bold mb-2">{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
}
