import VisitorList from "./components/VisitorList";
import ChatWindow from "./components/ChatWindow";
import VisitorProfile from "./components/VisitorProfile";
import useChatStore from "./store/chatStore";
import { useEffect } from "react";
import socket from "./socket";

export default function App() {
  const { setVisitors, setSelectedVisitor, resetUnread, addVisitor } = useChatStore();

  useEffect(() => {
    // Full visitor list updates
    socket.on("visitors_update", setVisitors);
    // When new visitor added
    socket.on("visitor_added", addVisitor);
    
    return () => {
      socket.off("visitors_update", setVisitors);
      socket.off("visitor_added", addVisitor);
    };
  }, [setVisitors, addVisitor]);

  const handleSelect = (v) => {
    setSelectedVisitor(v);
    resetUnread(v.id);
  };

  return (
    <div className="h-screen flex">
      <VisitorList onSelect={handleSelect} />
      <ChatWindow />
      <VisitorProfile />
    </div>
  );
}
