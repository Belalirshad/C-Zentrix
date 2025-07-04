import useChatStore from "../store/chatStore";
import ChatHistoryPopup from "./ChatHistoryPopup";
import { useState } from "react";

export default function VisitorProfile() {
  const { selectedVisitor, messages } = useChatStore();
  const [popup, setPopup] = useState({ open: false, type: null, session: null });

  if (!selectedVisitor)
    return <div className="w-1/4 p-4">Select a visitor</div>;

  // Get last 5 messages for the selected visitor
  const visitorMessages = messages
    .filter((msg) => msg.visitorId === selectedVisitor.id)
    .slice(-5)
    .reverse();

  return (
    <div className="w-1/4 p-4">
      <h2 className="font-bold text-lg mb-2">{selectedVisitor.name}</h2>
      <p>{selectedVisitor.email}</p>
      <p>{selectedVisitor.phone}</p>
      <div className="mt-9">
        <h3 className="font-semibold">Chat History</h3>
        {visitorMessages.map((msg) => (
          <div
            key={msg.id}
            className={`group p-2 mt-2 rounded hover:bg-gray-200 flex justify-between items-center ${
              msg.sender === 'user'
                ? 'bg-yellow-700 text-white'
                : 'bg-gray-400 text-gray-900'
            }`}
          >
            <div className="flex flex-col flex-1">
              <span className="text-xs opacity-80">{new Date(msg.timestamp).toLocaleString()}</span>
              <span className="mt-1 break-words">{msg.content}</span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition ml-2">
              <button title="Details" onClick={() => setPopup({ open: true, type: 'details', session: msg })}>ℹ️</button>
              <button title="Summary" onClick={() => setPopup({ open: true, type: 'summary', session: msg })}>📝</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for chat details and summary */}
      <ChatHistoryPopup
        open={popup.open}
        onClose={() => setPopup({ open: false, type: null, session: null })}
        title={popup.type === 'details' ? 'Message Details' : popup.type === 'summary' ? 'Message Summary' : ''}
      >
        {popup.type === 'details' && popup.session && (
          <div>
            <div><b>Message ID:</b> {popup.session.id}</div>
            <div><b>Date:</b> {new Date(popup.session.timestamp).toLocaleString()}</div>
            <div><b>Sender:</b> {popup.session.sender === 'user' ? 'You' : selectedVisitor.name}</div>
            <div><b>Content:</b> {popup.session.content}</div>
          </div>
        )}
        {popup.type === 'summary' && popup.session && (
          <div>
            <div><b>Summary:</b> {popup.session.content}</div>
          </div>
        )}
      </ChatHistoryPopup>
    </div>
  );
}
