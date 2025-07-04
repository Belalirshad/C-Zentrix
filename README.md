# C-Zentrix Live Chat App

A real-time chat application built with React and Vite. This project demonstrates a simple live chat interface with visitor tracking, chat history, and mock server integration for local development.

## Features

- Real-time chat between users
- Visitor list and individual visitor profiles
- Chat history popup
- Responsive and modern UI
- Mock server for local development and testing

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git
   cd your-repo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the development server with hot module replacement:

```bash
npm run dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Mock Server

A mock server is included for simulating chat messages and visitors. It starts automatically with the app. You can modify `src/mockServer.js` to customize mock data.

## Project Structure

```
my-project/
├── public/                # Static assets
├── src/
│   ├── components/        # React components (ChatWindow, ChatMessage, VisitorList, etc.)
│   ├── store/             # State management (chatStore.js)
│   ├── mockServer.js      # Mock server for local development
│   ├── socket.js          # Socket connection logic
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── package.json           # Project metadata and scripts
├── vite.config.js         # Vite configuration
└── README.md              # Project documentation
```

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the app for production
- `npm run preview` - Preview the production build

## Development

- Edit components in `src/components/` to customize the chat UI.
- Update `src/mockServer.js` to change mock data or simulate different scenarios.
- Use `src/store/chatStore.js` for state management logic.

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License.
