/**
 * Fallback match data for famous football leagues.
 * Used seamlessly when RapidAPI rate-limit / monthly quota (429) is encountered.
 * Dates are generated relative to "now" so they always look fresh.
 */

const now = Date.now();
const DAY = 24 * 60 * 60 * 1000;

function createMatch(id, league, homeTeam, awayTeam, homeId, awayId, dayOffset, hour, status, homeScore, awayScore) {
  const matchDate = new Date(now + dayOffset * DAY);
  matchDate.setHours(hour, 0, 0, 0);
  const isFinished = status === "FINISHED";

  return {
    id: String(id),
    league,
    date: matchDate.toISOString(),
    timeFormatted: `${String(hour).padStart(2, "0")}:00`,
    homeTeam,
    awayTeam,
    status,
    statusText: isFinished ? "Full-Time" : "Scheduled",
    homeScore: homeScore !== undefined ? homeScore : null,
    awayScore: awayScore !== undefined ? awayScore : null,
    scoreStr: homeScore !== undefined && awayScore !== undefined ? `${homeScore} - ${awayScore}` : null,
    homeCrest: `https://images.fotmob.com/image_resources/logo/teamlogo/${homeId}.png`,
    awayCrest: `https://images.fotmob.com/image_resources/logo/teamlogo/${awayId}.png`,
  };
}

const FALLBACK_MATCHES = [
  // ── Premier League (47) ──
  createMatch("pl_1", "Premier League", "Arsenal", "Chelsea", 9825, 8455, -1, 20, "FINISHED", 2, 1),
  createMatch("pl_2", "Premier League", "Liverpool", "Manchester City", 8650, 8456, -1, 17, "FINISHED", 3, 2),
  createMatch("pl_3", "Premier League", "Manchester United", "Tottenham Hotspur", 10260, 8586, 1, 19, "SCHEDULED"),
  createMatch("pl_4", "Premier League", "Aston Villa", "Newcastle United", 10252, 10261, 1, 15, "SCHEDULED"),
  createMatch("pl_5", "Premier League", "Brighton", "West Ham", 10204, 8654, 2, 17, "SCHEDULED"),
  createMatch("pl_6", "Premier League", "Everton", "Fulham", 8668, 9879, 3, 15, "SCHEDULED"),

  // ── LaLiga (87) ──
  createMatch("la_1", "LaLiga", "Real Madrid", "Barcelona", 8633, 8634, -2, 21, "FINISHED", 3, 2),
  createMatch("la_2", "LaLiga", "Atletico Madrid", "Sevilla", 9906, 8302, -1, 19, "FINISHED", 1, 0),
  createMatch("la_3", "LaLiga", "Real Sociedad", "Athletic Club", 8989, 8315, 1, 20, "SCHEDULED"),
  createMatch("la_4", "LaLiga", "Valencia", "Villarreal", 10267, 10205, 2, 18, "SCHEDULED"),
  createMatch("la_5", "LaLiga", "Real Betis", "Girona", 8603, 7732, 3, 21, "SCHEDULED"),

  // ── UEFA Champions League (42) ──
  createMatch("ucl_1", "UEFA Champions League", "Bayern Munich", "Paris Saint-Germain", 9823, 9847, -2, 21, "FINISHED", 2, 0),
  createMatch("ucl_2", "UEFA Champions League", "Inter", "Atletico Madrid", 8636, 9906, -1, 21, "FINISHED", 1, 0),
  createMatch("ucl_3", "UEFA Champions League", "Real Madrid", "Manchester City", 8633, 8456, 2, 21, "SCHEDULED"),
  createMatch("ucl_4", "UEFA Champions League", "Arsenal", "Bayern Munich", 9825, 9823, 3, 21, "SCHEDULED"),
  createMatch("ucl_5", "UEFA Champions League", "Barcelona", "Paris Saint-Germain", 8634, 9847, 4, 21, "SCHEDULED"),

  // ── Serie A (55) ──
  createMatch("sa_1", "Serie A", "Juventus", "AC Milan", 9885, 8564, -2, 20, "FINISHED", 1, 1),
  createMatch("sa_2", "Serie A", "Napoli", "Roma", 9875, 8686, -1, 18, "FINISHED", 2, 1),
  createMatch("sa_3", "Serie A", "Inter", "Lazio", 8636, 8543, 1, 20, "SCHEDULED"),
  createMatch("sa_4", "Serie A", "Atalanta", "Fiorentina", 8524, 8535, 2, 18, "SCHEDULED"),

  // ── Bundesliga (54) ──
  createMatch("bl_1", "Bundesliga", "Bayer Leverkusen", "Bayern Munich", 8178, 9823, -2, 18, "FINISHED", 3, 0),
  createMatch("bl_2", "Bundesliga", "Borussia Dortmund", "RB Leipzig", 9789, 178475, -1, 18, "FINISHED", 2, 2),
  createMatch("bl_3", "Bundesliga", "Eintracht Frankfurt", "VfB Stuttgart", 9810, 10269, 1, 15, "SCHEDULED"),

  // ── Ligue 1 (53) ──
  createMatch("l1_1", "Ligue 1", "Paris Saint-Germain", "Marseille", 9847, 8164, -2, 20, "FINISHED", 3, 1),
  createMatch("l1_2", "Ligue 1", "Monaco", "Lyon", 9829, 9748, 1, 21, "SCHEDULED"),

  // ── UEFA Europa League (73) ──
  createMatch("uel_1", "UEFA Europa League", "Roma", "Bayer Leverkusen", 8686, 8178, -3, 21, "FINISHED", 0, 2),
  createMatch("uel_2", "UEFA Europa League", "Manchester United", "Porto", 10260, 9773, 2, 21, "SCHEDULED"),
  createMatch("uel_3", "UEFA Europa League", "Tottenham Hotspur", "Athletic Club", 8586, 8315, 3, 21, "SCHEDULED"),

  // ── FIFA World Cup (77) ──
  createMatch("wc_1", "FIFA World Cup", "Argentina", "France", 8459, 8460, -30, 20, "FINISHED", 3, 3),
  createMatch("wc_2", "FIFA World Cup", "Brazil", "England", 8461, 8462, 5, 20, "SCHEDULED"),

  // ── UEFA Euro (50) ──
  createMatch("euro_1", "UEFA Euro", "Germany", "Spain", 8472, 8475, -15, 21, "FINISHED", 1, 2),
  createMatch("euro_2", "UEFA Euro", "France", "Portugal", 8460, 8478, 6, 21, "SCHEDULED"),

  // ── Copa America (44) ──
  createMatch("copa_1", "Copa America", "Argentina", "Colombia", 8459, 8480, -20, 20, "FINISHED", 1, 0),
  createMatch("copa_2", "Copa America", "Brazil", "Uruguay", 8461, 8482, 7, 20, "SCHEDULED"),

  // ── Copa Libertadores (45) ──
  createMatch("lib_1", "Copa Libertadores", "Flamengo", "River Plate", 5765, 5765, -5, 21, "FINISHED", 2, 1),
  createMatch("lib_2", "Copa Libertadores", "Boca Juniors", "Palmeiras", 5766, 5984, 4, 21, "SCHEDULED"),

  // ── FIFA Club World Cup (78) ──
  createMatch("cwc_1", "FIFA Club World Cup", "Real Madrid", "Al Hilal", 8633, 6246, -10, 20, "FINISHED", 3, 0),
  createMatch("cwc_2", "FIFA Club World Cup", "Manchester City", "Fluminense", 8456, 7653, 8, 20, "SCHEDULED"),

  // ── UEFA Conference League (10216) ──
  createMatch("ecl_1", "UEFA Conference League", "Olympiacos", "Fiorentina", 9784, 8535, -4, 21, "FINISHED", 1, 0),
  createMatch("ecl_2", "UEFA Conference League", "Aston Villa", "Club Brugge", 10252, 8219, 5, 21, "SCHEDULED"),

  // ── Eredivisie (132) ──
  createMatch("ere_1", "Eredivisie", "PSV Eindhoven", "Ajax", 9001, 8992, -3, 20, "FINISHED", 2, 1),
  createMatch("ere_2", "Eredivisie", "Feyenoord", "AZ Alkmaar", 9003, 8996, 2, 20, "SCHEDULED"),
];

module.exports = { FALLBACK_MATCHES };
