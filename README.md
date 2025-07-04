# C-Zentrix Chat_App

A monorepo containing both the **frontend** (React + Vite) and **backend** (Node.js + Express + Socket.io) for a real-time chat application.

---

## Project Structure

```
Chat_App/
  frontend/   # React app (Vite)
  backend/    # Node.js/Express/Socket.io server
  README.md   # This file
  .gitignore
```

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/Belalirshad/C-Zentrix.git
```

### 2. Install dependencies

#### Backend
```sh
cd backend
npm install
```

#### Frontend
```sh
cd ../frontend
npm install
```

---

## Running the App

### Start the backend

```sh
cd backend
npm run dev
```
The backend runs on [http://localhost:3001](http://localhost:3001)

### Start the frontend

```sh
cd frontend
npm run dev
```
The frontend runs on [http://localhost:5173](http://localhost:5173)

---

## Features

- Real-time chat between users and visitors
- Visitor list and individual visitor profiles
- Chat history with timestamps
- Unread message indicators
- Random mock visitors and messages for demo/testing
- Responsive and modern UI

---

## Scripts

- `npm run dev` - Start the development server (frontend or backend)
- `npm run build` - Build the frontend for production
- `npm run preview` - Preview the production frontend build

---

## License

This project is licensed under the MIT License.
