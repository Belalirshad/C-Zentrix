import { motion } from "framer-motion";

export default function ChatMessage({ message, isNew }) {
  const align = message.sender === "user" ? "justify-end" : "justify-start";
  const bg =
    message.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200";

  // Formatting the timestamp
  let time = '';
  if (message.timestamp) {
    const date = new Date(message.timestamp);
    time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isNew ? 1 : 0.5 }}
      transition={{ duration: 3 }}
      className={`flex ${align} mb-2`}
    >
      <div className={`px-4 py-2 rounded ${bg} max-w-xs`}>
        {message.content}
        {time && (
          <div className="text-xs text-gray-900 mt-1 text-right">{time}</div>
        )}
      </div>
    </motion.div>
  );
}
