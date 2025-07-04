import useChatStore from './store/chatStore';

// Helper to generate random names and emails
const names = [
  'Rohit Sharma', 'MS Dhoni', 'Yuvraj Singh','Ravindra Jadeja', 'Hardik Pandya', 'Ravichandran Ashwin', 'Jasprit Bumrah', 'Mohammed Shami'
];
const emails = [
  'rohit@example.com', 'msd@example.com', 'yuvi@example.com', 'ravindra@example.com',
  'hardik@example.com', 'ravichandran@example.com', 'jasprit@example.com', 'shami@example.com'
];
const phones = [
  '1234567890', '1234567890', '1234567890', '1234567890', '1234567890',
  '1234567890', '1234567890', '1234567890', '1234567890', '1234567890'
];

function getRandomInt(max) {

  return Math.floor(Math.random() * max);
}

function addRandomVisitor() {

  const _id = getRandomInt(names.length);

  const visitor = {
    id: Date.now().toString(),
    name: names[_id],
    email: emails[_id],
    phone: phones[_id],
    status: 'online',
    unreadCount: 0,
  };
  useChatStore.getState().addVisitor(visitor);
  scheduleDisconnect(visitor.id);
}

function sendRandomMessage() {

  const visitors = useChatStore.getState().visitors;

  if (visitors.length === 0) return;

  const v = visitors[getRandomInt(visitors.length)];

  const msg = {
    id: Date.now().toString(),
    sender: 'visitor',
    content: 'Random message from ' + v.name,
    timestamp: new Date(),
    visitorId: v.id,
    isRead: false,
  };

  useChatStore.getState().addMessage(msg);

  // Optionally increment unread count

  useChatStore.getState().setVisitors(
    visitors.map(visitor =>
      visitor.id === v.id ? { ...visitor, unreadCount: (visitor.unreadCount || 0) + 1 } : visitor
    )
  );
}

function scheduleDisconnect(visitorId) {

  // Randomly pick one of the intervals
  const intervals = [5, 7, 9, 11, 15].map(min => min * 60 * 1000);
  const interval = intervals[getRandomInt(intervals.length)];

  setTimeout(() => {
    
    useChatStore.getState().updateVisitorStatus(visitorId, 'offline');

    // Remove the visitor after a short time
    setTimeout(() => {
      useChatStore.getState().removeVisitor(visitorId);
    }, 2000);
  }, interval);
}

export function startMockServer() {

  // Add a new visitor every 1-2 minutes
  setInterval(addRandomVisitor, 60 * 1000 + getRandomInt(60 * 1000));

  // Send a random message every 20-40 seconds
  setInterval(sendRandomMessage, 20000 + getRandomInt(20000));

  // Disconnect initial mock visitors
  useChatStore.getState().visitors.forEach(v => scheduleDisconnect(v.id));
} 