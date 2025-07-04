// Mock data and helpers for chat backend

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

const initialVisitors = [
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

function addRandomVisitor(visitors, io, scheduleDisconnect) {
  const _id = getRandomInt(names.length);
  const visitor = {
    id: Date.now().toString(),
    name: names[_id],
    email: emails[_id],
    phone: phones[_id],
    status: 'online',
    unreadCount: 0,
  };
  visitors.push(visitor);
  io.emit('visitor_added', visitor);
  scheduleDisconnect(visitor.id);
}

function sendRandomMessage(visitors, messages, io) {
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
  messages.push(msg);
  io.emit('message', msg);

  // Increment unread count
  for (let i = 0; i < visitors.length; i++) {
    if (visitors[i].id === v.id) {
      visitors[i].unreadCount = (visitors[i].unreadCount || 0) + 1;
    }
  }
  io.emit('visitors_update', visitors);
}

function scheduleDisconnect(visitors, io, visitorId) {
  const intervals = [5, 7, 9, 11, 15].map(min => min * 60 * 1000);
  const interval = intervals[getRandomInt(intervals.length)];
  setTimeout(() => {
    for (let i = 0; i < visitors.length; i++) {
      if (visitors[i].id === visitorId) {
        visitors[i].status = 'offline';
      }
    }
    
    io.emit('visitors_update', visitors);
    setTimeout(() => {
      const idx = visitors.findIndex(v => v.id === visitorId);
      if (idx !== -1) {
        visitors.splice(idx, 1);
        io.emit('visitors_update', visitors);
      }
    }, 2000);
  }, interval);
}

module.exports = {
  names,
  emails,
  phones,
  getRandomInt,
  initialVisitors,
  addRandomVisitor,
  sendRandomMessage,
  scheduleDisconnect,
}; 