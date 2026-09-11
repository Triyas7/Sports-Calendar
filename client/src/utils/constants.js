// ── League Configuration ──
// IDs & logos verified via /football-get-all-leagues API endpoint
// Logos served directly from Fotmob CDN (same source the API uses)

const FOTMOB_LOGO = (id) =>
  `https://images.fotmob.com/image_resources/logo/leaguelogo/dark/${id}.png`;

export const LEAGUE_CONFIG = {
  // ── "All" sentinel ────────────────────────────────────────────────────
  "All Leagues": {
    code: "ALL",
    name: "All Leagues",
    icon: "/logos/all-leagues.svg",
  },

  // ── Top 5 Domestic Leagues ─────────────────────────────────────────────
  "Premier League": {
    code: 47,
    name: "Premier League",
    icon: "/logos/premier-league.png",
  },
  LaLiga: {
    code: 87,
    name: "LaLiga",
    icon: "/logos/laliga.png",
  },
  "Serie A": {
    code: 55,
    name: "Serie A",
    icon: "/logos/serie-a.png",
  },
  Bundesliga: {
    code: 54,
    name: "Bundesliga",
    icon: "/logos/bundesliga.png",
  },
  "Ligue 1": {
    code: 53,
    name: "Ligue 1",
    icon: "/logos/ligue-1.png",
  },
  Eredivisie: {
    code: 132,
    name: "Eredivisie",
    icon: FOTMOB_LOGO(132),
  },

  // ── European Club Competitions ─────────────────────────────────────────
  "UEFA Champions League": {
    code: 42,
    name: "UEFA Champions League",
    icon: "/logos/ucl.png",
  },
  "UEFA Europa League": {
    code: 73,
    name: "UEFA Europa League",
    icon: FOTMOB_LOGO(73),
  },
  "UEFA Conference League": {
    code: 10216,
    name: "UEFA Conference League",
    icon: FOTMOB_LOGO(10216),
  },

  // ── International Competitions ─────────────────────────────────────────
  "FIFA World Cup": {
    code: 77,
    name: "FIFA World Cup",
    icon: "/logos/fifa-world-cup.png",
  },
  "UEFA Euro": {
    code: 50,
    name: "UEFA Euro",
    icon: FOTMOB_LOGO(50),
  },
  "Copa America": {
    code: 44,
    name: "Copa America",
    icon: FOTMOB_LOGO(44),
  },
  "FIFA Club World Cup": {
    code: 78,
    name: "FIFA Club World Cup",
    icon: FOTMOB_LOGO(78),
  },
  "Copa Libertadores": {
    code: 45,
    name: "Copa Libertadores",
    icon: FOTMOB_LOGO(45),
  },
};

// All league names in display order
export const LEAGUE_NAMES = Object.keys(LEAGUE_CONFIG);

// Express API proxy base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
