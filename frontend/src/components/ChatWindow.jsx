import useChatStore from "../store/chatStore";
import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import socket from "../socket";

export default function ChatWindow() {
  const { selectedVisitor, messages, addMessage, setMessages, resetUnread } = useChatStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("messages_init", setMessages);

    socket.on("message", (msg) => {
      if (msg.visitorId === selectedVisitor?.id) {
        msg.isRead = true;
        addMessage(msg);
        resetUnread(msg.visitorId);
      } else {
        addMessage({ ...msg, isRead: false });
        if (window && window.dispatchEvent) {
          window.dispatchEvent(new CustomEvent('incrementUnread', { detail: msg.visitorId }));
        }
      }
    });
    return () => {
      socket.off("messages_init", setMessages);
      socket.off("message");
    };
  }, [selectedVisitor, addMessage, resetUnread, setMessages]);

  // Mark read when a visitor is selected
  useEffect(() => {
    if (selectedVisitor) {
      socket.emit('read_messages', selectedVisitor.id);
    }
  }, [selectedVisitor]);

  const handleSend = () => {
    const msg = {
      id: Date.now().toString(),
      sender: "user",
      content: input,
      timestamp: new Date(),
      visitorId: selectedVisitor.id,
      isRead: true,
    };
    socket.emit("send_message", msg);
    resetUnread(selectedVisitor.id);
    setInput("");
  };

  // Only show messages for the selected visitor
  const filteredMessages = selectedVisitor
    ? messages.filter((msg) => msg.visitorId === selectedVisitor.id)
    : [];

  const lastUserMsgIdx = [...filteredMessages].reverse().findIndex(m => m.sender === 'user');
  const lastUserMsgAbsIdx = lastUserMsgIdx === -1 ? -1 : filteredMessages.length - 1 - lastUserMsgIdx;

  return (
    <div className="w-2/4 p-4 flex flex-col justify-between border-r">
      <div className="overflow-y-auto mb-4">
        {filteredMessages.map((msg, idx) => (
          <ChatMessage
            key={idx}
            message={msg}
            isNew={
              msg.sender === 'visitor' &&
              !msg.isRead &&
              (lastUserMsgAbsIdx === -1 || idx > lastUserMsgAbsIdx)
            }
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="border rounded flex-1 p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
