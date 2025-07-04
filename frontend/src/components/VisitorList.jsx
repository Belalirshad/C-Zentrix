import useChatStore from "../store/chatStore";

export default function VisitorList({ onSelect }) {
  const { visitors, selectedVisitor } = useChatStore();

  return (
    <div className="w-1/4 p-4 bg-gray-100 border-r overflow-y-auto">
      <h2 className="font-bold text-lg mb-4">Visitors</h2>
      {visitors.map((visitor) => (
        <div
          key={visitor.id}
          onClick={() => onSelect(visitor)}
          className={`p-2 mb-2 cursor-pointer rounded ${
            selectedVisitor?.id === visitor.id
              ? "bg-blue-100"
              : visitor.unreadCount > 0
              ? "bg-yellow-100 border-l-4 border-yellow-500"
              : "hover:bg-gray-200"
          }`}
        >
          <div className="flex justify-between">
            <span>{visitor.name}</span>
            {visitor.unreadCount > 0 && (
              <span className="bg-red-500 text-white rounded-full px-2 text-xs">
                {visitor.unreadCount}
              </span>
            )}
          </div>
          <div className="text-xs text-gray-500">{visitor.status}</div>
        </div>
      ))}
    </div>
  );
}
