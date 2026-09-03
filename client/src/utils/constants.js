// ── League Configuration ──
// Maps league display names → API-Football league IDs & logo paths
export const LEAGUE_CONFIG = {
  "All Leagues":           { code: "ALL", name: "All Leagues",           icon: "/logos/all-leagues.png" },
  "FIFA World Cup":        { code: 1,     name: "FIFA World Cup",        icon: "/logos/fifa-world-cup.png" },
  "UEFA Champions League": { code: 2,     name: "UEFA Champions League", icon: "/logos/ucl.png" },
  "Premier League":        { code: 39,    name: "Premier League",        icon: "/logos/premier-league.png" },
  "LaLiga":                { code: 140,   name: "LaLiga",                icon: "/logos/laliga.png" },
  "Serie A":               { code: 135,   name: "Serie A",               icon: "/logos/serie-a.png" },
  "Bundesliga":            { code: 78,    name: "Bundesliga",            icon: "/logos/bundesliga.png" },
  "Ligue 1":               { code: 61,    name: "Ligue 1",               icon: "/logos/ligue-1.png" },
};

// All league names in display order
export const LEAGUE_NAMES = Object.keys(LEAGUE_CONFIG);

// Express API proxy base URL
export const API_BASE_URL = "http://localhost:3001";
