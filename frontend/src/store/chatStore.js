import { create } from "zustand";

// Predefined mock data
const mockVisitors = [
  {
    id: '1',
    name: 'Sachin Tendulkar',
    email: 'sachin@example.com',
    phone: '1234567890',
    status: 'online',
    unreadCount: 0,
  },
  {
    id: '2',
    name: 'Virat Kohli',
    email: 'virat@example.com',
    phone: '1234567890',
    status: 'online',
    unreadCount: 0,
  },
];

const useChatStore = create((set, get) => ({
  visitors: mockVisitors,
  selectedVisitor: null,
  messages: [],

  setVisitors: (visitors) => {
    // Recalculate unreadCount for each visitor based on current messages
    const messages = get().messages;
    const updatedVisitors = visitors.map(visitor => {
      const unreadCount = messages.filter(m => m.visitorId === visitor.id && !m.isRead).length;
      return { ...visitor, unreadCount };
    });
    set({ visitors: updatedVisitors });
  },
  addVisitor: (visitor) =>
    set((state) => ({
      visitors: [...state.visitors, visitor],
    })),    
  setSelectedVisitor: (visitor) => set({ selectedVisitor: visitor }),

  setMessages: (messages) => {
    // Recalculate unreadCount for each visitor
    const visitors = get().visitors;
    const updatedVisitors = visitors.map(visitor => {
      const unreadCount = messages.filter(m => m.visitorId === visitor.id && !m.isRead).length;
      return { ...visitor, unreadCount };
    });
    set({ messages, visitors: updatedVisitors });
  },
  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  setHistory: (history) => set({ history }),

  updateVisitorStatus: (id, status) =>
    set((state) => ({
      visitors: state.visitors.map((v) =>
        v.id === id ? { ...v, status } : v
      ),
    })),

  removeVisitor: (id) =>
    set((state) => ({
      visitors: state.visitors.filter((v) => v.id !== id),
    })),

  incrementUnread: (visitorId) =>
    set((state) => ({
      visitors: state.visitors.map((v) =>
        v.id === visitorId ? { ...v, unreadCount: (v.unreadCount || 0) + 1 } : v
      ),
    })),

  resetUnread: (visitorId) =>
    set((state) => ({
      visitors: state.visitors.map((v) =>
        v.id === visitorId ? { ...v, unreadCount: 0 } : v
      ),
    })),
}));

export default useChatStore;
