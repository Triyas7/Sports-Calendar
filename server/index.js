/**
 * Sports Calendar — Express API Proxy Server
 * Uses free-api-live-football-data.p.rapidapi.com to provide:
 * 1. Recent match details (scores, dates, times)
 * 2. Future 20 matches (scheduled fixtures with kickoff date/time)
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3001;

// ── RapidAPI Configuration (Loaded from private .env) ──
const API_FOOTBALL_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = "free-api-live-football-data.p.rapidapi.com";

if (!API_FOOTBALL_KEY) {
  console.warn("⚠️ Warning: RAPIDAPI_KEY is not defined in server/.env!");
}

// League IDs for free-api-live-football-data
const LEAGUE_MAP = {
  "ALL": "All Leagues",
  "47": "Premier League",
  "87": "LaLiga",
  "55": "Serie A",
  "54": "Bundesliga",
  "53": "Ligue 1",
  "42": "UEFA Champions League",
  "77": "FIFA World Cup"
};

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

// ── Helpers ──
function formatDateToYYYYMMDD(d) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}${month}${day}`;
}

function formatApiDateMatch(m, defaultLeague = "Football") {
  const isFinished = !!m.status?.finished;
  const isStarted = !!m.status?.started;
  const isLive = isStarted && !isFinished;

  let status = "SCHEDULED";
  if (isFinished) status = "FINISHED";
  else if (isLive) status = "LIVE";

  const leagueName = LEAGUE_MAP[String(m.leagueId)] || defaultLeague;
  const utcTime = m.status?.utcTime || (m.timeTS ? new Date(m.timeTS).toISOString() : new Date().toISOString());

  return {
    id: String(m.id),
    league: leagueName,
    date: utcTime,
    timeFormatted: m.time || "",
    homeTeam: m.home?.name || m.home?.longName || "Home",
    awayTeam: m.away?.name || m.away?.longName || "Away",
    status,
    statusText: isFinished ? (m.status?.reason?.long || "Full-Time") : (isLive ? "LIVE" : "Scheduled"),
    homeScore: m.home?.score !== undefined ? m.home.score : null,
    awayScore: m.away?.score !== undefined ? m.away.score : null,
    scoreStr: m.status?.scoreStr || (m.home?.score !== undefined && m.away?.score !== undefined ? `${m.home.score} - ${m.away.score}` : null),
    homeCrest: m.home?.id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${m.home.id}.png` : null,
    awayCrest: m.away?.id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${m.away.id}.png` : null,
  };
}

function formatLeagueMatch(m, leagueName) {
  const isFinished = !!m.status?.finished;
  const isStarted = !!m.status?.started;
  const isLive = isStarted && !isFinished;

  let status = "SCHEDULED";
  if (isFinished) status = "FINISHED";
  else if (isLive) status = "LIVE";

  const utcTime = m.status?.utcTime || new Date().toISOString();

  return {
    id: String(m.id),
    league: leagueName,
    date: utcTime,
    timeFormatted: "",
    homeTeam: m.home?.name || "Home",
    awayTeam: m.away?.name || "Away",
    status,
    statusText: isFinished ? (m.status?.reason?.long || "Full-Time") : (isLive ? "LIVE" : "Scheduled"),
    homeScore: m.home?.score !== undefined ? m.home.score : null,
    awayScore: m.away?.score !== undefined ? m.away.score : null,
    scoreStr: m.status?.scoreStr || (m.home?.score !== undefined && m.away?.score !== undefined ? `${m.home.score} - ${m.away.score}` : null),
    homeCrest: m.home?.id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${m.home.id}.png` : null,
    awayCrest: m.away?.id ? `https://images.fotmob.com/image_resources/logo/teamlogo/${m.away.id}.png` : null,
  };
}

// ── Middleware ──
app.use(cors({ origin: ["http://localhost:5173", "http://127.0.0.1:5173"] }));
app.use(express.json());

// ── Routes ──

/**
 * GET /api/matches?league=ALL|47|87...&filter=all|upcoming|recent
 */
app.get("/api/matches", async (req, res) => {
  const leagueCode = req.query.league || "ALL";
  const filter = req.query.filter || "all"; // "all" | "upcoming" | "recent"
  const cacheKey = `matches_${leagueCode}_${filter}`;

  const cached = getCached(cacheKey);
  if (cached) {
    return res.json({ success: true, data: cached, cached: true });
  }

  const headers = {
    "x-rapidapi-key": API_FOOTBALL_KEY,
    "x-rapidapi-host": API_HOST,
  };

  try {
    let recentMatches = [];
    let upcomingMatches = [];

    if (leagueCode === "ALL") {
      // 1. Fetch recent matches from yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = formatDateToYYYYMMDD(yesterday);

      const yesterdayRes = await fetch(
        `https://${API_HOST}/football-get-matches-by-date?date=${yesterdayStr}`,
        { headers }
      );
      const yesterdayData = await yesterdayRes.json();
      const rawYesterday = yesterdayData.response?.matches || [];
      
      recentMatches = rawYesterday
        .filter((m) => m.status?.finished)
        .map((m) => formatApiDateMatch(m))
        .slice(0, 15);

      // 2. Fetch today & upcoming future matches (next 20 matches)
      const topLeagueIds = [47, 87, 55, 54, 53, 42];
      const today = new Date();

      for (let i = 0; i < 4 && upcomingMatches.length < 25; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dStr = formatDateToYYYYMMDD(d);

        const dRes = await fetch(
          `https://${API_HOST}/football-get-matches-by-date?date=${dStr}`,
          { headers }
        );
        const dData = await dRes.json();
        const matchesOnDate = dData.response?.matches || [];

        // Priority to top leagues, then general upcoming
        const filtered = matchesOnDate.filter(
          (m) => !m.status?.finished && !m.status?.cancelled
        );

        // Sort so top leagues appear first
        filtered.sort((a, b) => {
          const aTop = topLeagueIds.includes(a.leagueId) ? 1 : 0;
          const bTop = topLeagueIds.includes(b.leagueId) ? 1 : 0;
          return bTop - aTop;
        });

        const formatted = filtered.map((m) => formatApiDateMatch(m));
        upcomingMatches.push(...formatted);
      }

      upcomingMatches = upcomingMatches.slice(0, 20);
    } else {
      // Fetch specific league by league ID
      const leagueName = LEAGUE_MAP[leagueCode] || "Football";
      const leagueRes = await fetch(
        `https://${API_HOST}/football-get-all-matches-by-league?leagueid=${leagueCode}`,
        { headers }
      );
      const leagueData = await leagueRes.json();
      const rawMatches = leagueData.response?.matches || [];

      const finished = rawMatches
        .filter((m) => m.status?.finished)
        .map((m) => formatLeagueMatch(m, leagueName));

      // Last 15-20 completed matches with scores, reverse so newest is on top
      recentMatches = finished.slice(-20).reverse();

      const upcoming = rawMatches
        .filter((m) => !m.status?.finished && !m.status?.cancelled)
        .map((m) => formatLeagueMatch(m, leagueName));

      upcomingMatches = upcoming.slice(0, 20);

      // If season has no upcoming left in the league archive, also check upcoming dates
      if (upcomingMatches.length === 0) {
        const today = new Date();
        for (let i = 0; i < 4 && upcomingMatches.length < 20; i++) {
          const d = new Date(today);
          d.setDate(today.getDate() + i);
          const dStr = formatDateToYYYYMMDD(d);

          const dRes = await fetch(
            `https://${API_HOST}/football-get-matches-by-date?date=${dStr}`,
            { headers }
          );
          const dData = await dRes.json();
          const matches = (dData.response?.matches || [])
            .filter((m) => String(m.leagueId) === String(leagueCode) && !m.status?.finished)
            .map((m) => formatApiDateMatch(m, leagueName));

          upcomingMatches.push(...matches);
        }
      }
    }

    // Combine or filter according to query
    let result = [];
    if (filter === "recent") {
      result = recentMatches;
    } else if (filter === "upcoming") {
      result = upcomingMatches;
    } else {
      // "all": Future 20 matches first, followed by recent matches
      result = [...upcomingMatches, ...recentMatches];
    }

    setCache(cacheKey, result);
    return res.json({
      success: true,
      data: result,
      counts: {
        upcoming: upcomingMatches.length,
        recent: recentMatches.length,
        total: result.length,
      },
      cached: false,
    });
  } catch (err) {
    console.error("API error:", err.message);
    return res.status(502).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`⚽ Sports Calendar API server running on http://localhost:${PORT}`);
});

