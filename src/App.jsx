import VisitorList from "./components/VisitorList";
import ChatWindow from "./components/ChatWindow";
import VisitorProfile from "./components/VisitorProfile";
import useChatStore from "./store/chatStore";
import { useEffect } from "react";
import socket from "./socket";

export default function App() {
  const { setVisitors, setSelectedVisitor, resetUnread } = useChatStore();

  useEffect(() => {
    fetch("/api/visitors")
      .then((res) => res.json())
      .then(setVisitors);

    socket.on("new_visitor", (v) => {
      setVisitors((prev) => [...prev, v]);
    });

    return () => socket.off("new_visitor");
  }, []);

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
