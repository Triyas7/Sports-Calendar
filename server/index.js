/**
 * Sports Calendar — Express API Proxy Server
 * Proxies requests to API-Football (v3) so the RapidAPI key stays server-side.
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3001;

// ── RapidAPI Key (server-side only — never sent to the browser) ──
const API_FOOTBALL_KEY = "1a28f6eb0amsh06b01bed4fa4d07p1dbc90jsn79e4a1700750";
const API_HOST = "v3.football.api-sports.io";

// ── In-memory cache (15-minute TTL) ──
const cache = new Map();
const CACHE_DURATION = 15 * 60 * 1000;

function getCached(key) {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}

function setCache(key, data) {
  cache.set(key, { data, timestamp: Date.now() });
}

// ── Middleware ──
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

// ── Routes ──

// GET /api/matches?league=ALL  or  /api/matches?league=39
app.get("/api/matches", async (req, res) => {
  const leagueCode = req.query.league || "ALL";
  const cacheKey = `matches_${leagueCode}`;

  // Check cache
  const cached = getCached(cacheKey);
  if (cached) {
    return res.json({ success: true, data: cached, cached: true });
  }

  try {
    const headers = {
      "x-rapidapi-key": API_FOOTBALL_KEY,
      "x-rapidapi-host": API_HOST,
      "x-apisports-key": API_FOOTBALL_KEY,
    };

    let allFetched = [];

    if (leagueCode === "ALL") {
      // Fetch upcoming matches for top leagues in parallel
      const topLeagues = [39, 140, 135, 78, 61, 2];
      const results = await Promise.all(
        topLeagues.map((id) =>
          fetch(
            `https://${API_HOST}/fixtures?league=${id}&next=8`,
            { headers }
          )
            .then((r) => r.json())
            .then((d) => d.response || [])
            .catch((err) => {
              console.warn(`Failed fetching league ${id}:`, err.message);
              return [];
            })
        )
      );
      results.forEach((fixtures) => allFetched.push(...fixtures));
    } else {
      const response = await fetch(
        `https://${API_HOST}/fixtures?league=${leagueCode}&next=20`,
        { headers }
      );
      if (!response.ok) throw new Error(`API error: ${response.status}`);
      const data = await response.json();

      if (data.errors && Object.keys(data.errors).length > 0) {
        const errorMsg = Object.values(data.errors).join(", ");
        throw new Error(errorMsg || "RapidAPI request error");
      }
      allFetched = data.response || [];
    }

    // Normalize response shape
    const matches = allFetched.map((m) => ({
      id: m.fixture.id.toString(),
      league: m.league ? m.league.name : "Football",
      date: m.fixture.date,
      homeTeam: m.teams.home.name,
      awayTeam: m.teams.away.name,
      status: mapStatus(m.fixture.status.short),
      homeCrest: m.teams.home.logo,
      awayCrest: m.teams.away.logo,
      homeScore: m.goals ? m.goals.home : null,
      awayScore: m.goals ? m.goals.away : null,
    }));

    // Sort chronologically
    matches.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Cache result
    setCache(cacheKey, matches);

    return res.json({ success: true, data: matches, cached: false });
  } catch (err) {
    console.error("API-Football fetch failed:", err.message);
    return res.status(502).json({ success: false, error: err.message });
  }
});

// ── Status mapper ──
function mapStatus(shortStatus) {
  const statusMap = {
    NS: "SCHEDULED", "1H": "LIVE", HT: "LIVE", "2H": "LIVE",
    ET: "LIVE", P: "LIVE", FT: "FINISHED", AET: "FINISHED",
    PEN: "FINISHED", BT: "LIVE", SUSP: "SUSPENDED",
    INT: "INTERRUPTED", PST: "POSTPONED", CANC: "CANCELLED",
    ABD: "ABANDONED", AWD: "FINISHED", WO: "FINISHED",
    LIVE: "LIVE", TBD: "SCHEDULED",
  };
  return statusMap[shortStatus] || "SCHEDULED";
}

// ── Start server ──
app.listen(PORT, () => {
  console.log(`⚽ Sports Calendar API server running on http://localhost:${PORT}`);
});
