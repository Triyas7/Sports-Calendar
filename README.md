# ⚽ Sports Calendar & Match Creator

A modern, full-stack football fixture scheduling and calendar tracking web application. Built with React (Vite) on the frontend and Express on the backend, featuring official team crests, dynamic league-to-team filtering, live fixtures, custom match creation, and Google Calendar (.ics) synchronization.

---

## 📸 Core Features

### 1. Match Creator (Custom Fixture Scheduler)
- **Dynamic League Filtering**: Select any major league (Premier League, LaLiga, Serie A, Bundesliga, Ligue 1, UEFA Champions League, Europa League, World Cup, Euro, Copa America) to dynamically update the available teams.
- **Official Team Logos**: High-resolution official crests for every club and national team, sourced directly from verified FotMob CDN resources.
- **Interactive Team Dropdowns**: Searchable team selection with instant crest preview and duplicate-team prevention (Home vs Away validation).
- **Date & Time Picker**: Choose the exact kickoff date and time for any fixture.
- **Live Match Preview Card**: Dynamic visual preview of the match card being created in real time.
- **Add to Collection**: One-click action to save the scheduled fixture into your personal collection.

### 2. Your Collection & Google Calendar Export
- **Personal Match Tracking**: View all your scheduled and saved matches in a dedicated collection view.
- **Google Calendar (.ics) Export**: Export any individual match or your entire collection as an `.ics` calendar file to import directly into Google Calendar, Apple Calendar, or Outlook.
- **Persistent Storage**: Saved matches persist across sessions using browser `localStorage`.

### 3. Live Fixtures & Express API Proxy
- **Real-Time Data**: Live, upcoming, and recent match details fetched via Express proxy from RapidAPI (`free-api-live-football-data`).
- **Resilient Fallback Dataset**: If RapidAPI quota limits (429) or network interruptions occur, the backend automatically switches to a comprehensive built-in fallback dataset with relative dates, ensuring 100% uptime.

---

## 🚀 How to Run Frontend & Backend

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` (comes with Node.js)

### Step 1: Start the Backend Server (Express API Proxy)
Open a terminal in the project root:
```powershell
# Navigate to the server folder
cd server

# Install dependencies (if not already installed)
npm install

# Start the server
node index.js
```
The server will run on `http://localhost:3001`.

### Step 2: Start the Frontend App (Vite + React)
Open a second terminal in the project root:
```powershell
# Navigate to the client folder
cd client

# Install dependencies (if not already installed)
npm install

# Start the Vite development server
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173/
```

---

## 📖 How to Use the Match Creator

1. **Open the App**: By default, the app opens to the **Match Creator** tab.
2. **Select a League**: Click the **league** dropdown (e.g., *Premier League*, *LaLiga*, *UEFA Champions League*). The team lists below will instantly adapt to that league.
3. **Choose Home Team**: Click the left **choose a team** dropdown, search or scroll, and select your home team. The official logo will display immediately.
4. **Choose Away Team**: Click the right **choose a team** dropdown and select the opponent. (The app prevents choosing the same team for both slots).
5. **Set Date & Kickoff Time**: Pick your match date and time in the `date:` and `time:` fields.
6. **Preview**: View the live card preview to confirm team crests, matchup, and kickoff time.
7. **Add to Collection**: Click **add to collection**. A confirmation toast will appear, and the badge in the sidebar will increment.
8. **View & Export**: Switch to **Your Collection** in the sidebar to review all saved matches and download the `.ics` calendar file.

---

## 🧭 Navigation & Modes

Use the left sidebar (or mobile menu) to switch between modes:
- **Match Creator** (`/`): Wireframe-inspired fixture builder with dynamic team filtering and official logos.
- **Your Collection**: Your saved custom matches and favorited games, with bulk Google Calendar export.
- **Live Fixtures**: The full live fixture browser powered by the Express API proxy and fallback system.

---

## 🔒 Production Code & Git Backups

All previous iterations, API proxy configurations, and production components are fully committed and preserved.

### Available Git Branches
- **`main`**: Current branch containing the Match Creator, team datasets, and updated UI.
- **`backup/sports-calendar-v1`**: Full snapshot of the initial Sports Calendar implementation (API proxy, match cards, filter bar, fallback dataset) prior to the wireframe layout change.

### How to Access the Backup Branch
To view or work on the original v1 code:
```powershell
git checkout backup/sports-calendar-v1
```

To switch back to the latest code:
```powershell
git checkout main
```

---

## 📁 Project Structure

```
Sports-Calendar/
├── client/
│   ├── public/
│   │   └── logos/               # Local league logos (Premier League, LaLiga, etc.)
│   ├── src/
│   │   ├── components/
│   │   │   ├── MatchCreator.jsx # Wireframe Match Creator component
│   │   │   ├── MatchCard.jsx    # Individual match card view
│   │   │   ├── MatchList.jsx    # Match list and container
│   │   │   ├── FilterBar.jsx    # League & fixture filter controls
│   │   │   ├── CollectionBar.jsx# Google Calendar .ics export button
│   │   │   └── Sidebar.jsx      # Navigation sidebar with tabs
│   │   ├── hooks/
│   │   │   └── useCollection.js # LocalStorage collection hook
│   │   ├── utils/
│   │   │   ├── teamsData.js     # Curated teams with official FotMob logos
│   │   │   ├── constants.js     # League configurations & proxy URL
│   │   │   └── calendar.js      # .ics calendar generation utilities
│   │   ├── App.jsx              # Main application root
│   │   ├── App.css              # Glassmorphic dark styling & responsive design
│   │   └── main.jsx             # React entry point
│   └── package.json
├── server/
│   ├── index.js                 # Express API proxy server & 429 quota handling
│   ├── mockData.js              # Fallback match dataset for offline/quota resilience
│   ├── .env                     # RapidAPI secret key configuration
│   └── package.json
└── README.md                    # Project documentation & user guide
```

---

## 🛠️ Production Build Verification

To create an optimized production build of the frontend:
```powershell
cd client
npm run build
```
The compiled bundle will be output to `client/dist/`.
