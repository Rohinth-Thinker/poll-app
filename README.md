<div align="center">

# 🗳️ PollCast

**Create interactive polls. Share a link. Get real-time results.**

A Mentimeter-inspired live polling platform built with the MERN stack and Socket.IO — enabling real-time audience engagement through shareable, interactive polls.

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-poll--app-00C853?style=for-the-badge)](https://poll-app-jp9w.onrender.com/)
![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Express](https://img.shields.io/badge/Express_5-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![Redux](https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

</div>

---

## 🌟 Key Highlights

- ⚡ **Real-time voting** — votes reflect instantly across all connected clients via WebSockets
- 🔗 **One-link participation** — share a unique URL; voters don't need an account
- 📊 **Live bar-chart visualization** — dynamic vote bars update as responses come in
- 🧩 **Slide-based system** — create and manage multiple poll slides in a single presentation
- 🔐 **JWT authentication** — secure, cookie-based sessions for poll creators
- ✏️ **Live editing sync** — question and option changes broadcast to participants in real time

---

## 🧠 Problem & Solution

**The Problem:** Gathering instant, structured feedback from an audience — whether in classrooms, team standups, or live events — typically requires expensive SaaS tools or clunky form builders with no real-time capability.

**The Solution:** PollCast delivers a lightweight, self-hostable polling platform where creators build polls in a presentation-style editor and participants vote via a simple shared link — with every vote reflected live, powered by WebSockets.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite 6, Redux Toolkit, React Router v7 |
| **Backend** | Node.js, Express 5 |
| **Real-time** | Socket.IO (bidirectional WebSocket rooms) |
| **Database** | MongoDB with Mongoose ODM |
| **Auth** | JWT with HTTP-only cookies |
| **Deployment** | Render |

---

## ⚡ Features

### 🎨 Poll Creator Dashboard
- Slide-based editor inspired by Mentimeter's UX
- Add multiple-choice questions with dynamic options
- Real-time bar-chart preview with vote counts
- Visualization type selectors (Bars, Donut, Pie, Dots)
- Background color picker and image upload placeholders
- Debounced auto-save on question and option edits

### 🗳️ Participant Voting
- No-auth, link-based access — `/participate/:participationId`
- Clean voting interface with checkbox-style selection
- Changes to questions/options sync live while participants are on the page

### 🔄 Real-Time Engine
- Socket.IO rooms scoped per poll slide via unique participation IDs
- Events: `vote_incremented`, `changed_optionName`, `changed_questionLabel`, `added_newOption`
- Bidirectional sync — creators see votes live; participants see edits live

### 🔒 Authentication
- Signup & Login with form validation (client + server)
- JWT tokens stored in cookies with 15-day expiry
- Protected API routes with middleware-based token validation

---

## 🧪 How to Run Locally

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or Atlas URI)

### 1. Clone the repository

```bash
git clone https://github.com/Rohinth-Thinker/poll-app.git
cd poll-app
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```env
PORT_NUMBER=3000
DB_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
```

### 3. Install dependencies

```bash
# Root dependencies (backend)
npm install

# Frontend dependencies
cd frontend && npm install && cd ..
```

### 4. Build the frontend

```bash
npm run build
```

### 5. Start the server

```bash
npm start
```

The app will be live at `http://localhost:3000` 🚀

---

## 📁 Project Structure

```
poll-app/
├── backend/
│   ├── controllers/       # Auth & slides business logic
│   ├── database/          # MongoDB connection & query functions
│   ├── models/            # Mongoose schemas (User, Slides)
│   ├── routes/            # Express route definitions
│   ├── socket/            # Socket.IO server setup & room events
│   ├── utils/             # JWT, validation, cookie helpers
│   └── server.js          # Express + Socket.IO entry point
├── frontend/
│   └── src/
│       ├── app/           # Redux store configuration
│       ├── components/    # Shared UI components (Header, etc.)
│       ├── context/       # Auth & Socket context providers
│       ├── features/      # Redux slices (slidesArray)
│       ├── hooks/         # Custom hooks (useAuth, useAddSlide, etc.)
│       ├── icons/         # SVG icon components
│       └── pages/         # Route-level page components
└── package.json
```

---

## 📈 What This Demonstrates

- **Full-stack architecture** — React SPA served from an Express backend with API routing
- **Real-time systems** — Socket.IO room-based event broadcasting for live data sync
- **State management** — Redux Toolkit for complex, normalized slide/option state with optimistic updates
- **Debounced persistence** — Client-side debouncing to reduce API calls during rapid edits
- **Auth flow** — End-to-end JWT authentication with protected routes and cookie handling
- **Component architecture** — Modular, reusable React components with custom hooks for data fetching

---

## 🔮 Future Improvements

- 📊 Donut, Pie, and Dot chart visualizations (UI selectors exist, rendering TBD)
- 🖼️ Image upload support for options and slide backgrounds
- 👥 Live participant count per poll room
- 📱 Fully responsive mobile-first redesign
- 🗑️ Slide and option deletion with confirmation modals

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

```bash
# Fork → Clone → Branch → Commit → PR
git checkout -b feature/your-feature
```

---

<div align="center">

**Built with 💻 by [Rohinth](https://github.com/Rohinth-Thinker)**

⭐ Star this repo if you found it useful!

[Live Demo](https://poll-app-jp9w.onrender.com/) · [Report Bug](https://github.com/Rohinth-Thinker/poll-app/issues) · [Request Feature](https://github.com/Rohinth-Thinker/poll-app/issues)

</div>
