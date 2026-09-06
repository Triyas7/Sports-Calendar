/**
 * Curated teams dataset with official crests / logos from FotMob CDN.
 * Formatted by league for dynamic filtering in the Match Creator.
 */

const FOTMOB_LOGO = (id) =>
  `https://images.fotmob.com/image_resources/logo/teamlogo/${id}.png`;

export const LEAGUES_LIST = [
  { name: "All Leagues", code: "ALL", icon: "/logos/all-leagues.svg" },
  { name: "Premier League", code: 47, icon: "/logos/premier-league.png" },
  { name: "LaLiga", code: 87, icon: "/logos/laliga.png" },
  { name: "Serie A", code: 55, icon: "/logos/serie-a.png" },
  { name: "Bundesliga", code: 54, icon: "/logos/bundesliga.png" },
  { name: "Ligue 1", code: 53, icon: "/logos/ligue-1.png" },
  { name: "UEFA Champions League", code: 42, icon: "/logos/ucl.png" },
  { name: "UEFA Europa League", code: 73, icon: "/logos/europa-league.png" },
  { name: "FIFA World Cup", code: 77, icon: "/logos/fifa-world-cup.png" },
  { name: "UEFA Euro", code: 50, icon: "/logos/uefa-euro.png" },
  { name: "Copa America", code: 44, icon: "/logos/copa-america.png" },
];

export const TEAMS_BY_LEAGUE = {
  "Premier League": [
    { id: 9825, name: "Arsenal", shortName: "ARS", logo: FOTMOB_LOGO(9825) },
    { id: 10252, name: "Aston Villa", shortName: "AVL", logo: FOTMOB_LOGO(10252) },
    { id: 8678, name: "AFC Bournemouth", shortName: "BOU", logo: FOTMOB_LOGO(8678) },
    { id: 9937, name: "Brentford", shortName: "BRE", logo: FOTMOB_LOGO(9937) },
    { id: 10204, name: "Brighton & Hove Albion", shortName: "BHA", logo: FOTMOB_LOGO(10204) },
    { id: 8455, name: "Chelsea", shortName: "CHE", logo: FOTMOB_LOGO(8455) },
    { id: 9826, name: "Crystal Palace", shortName: "CRY", logo: FOTMOB_LOGO(9826) },
    { id: 8668, name: "Everton", shortName: "EVE", logo: FOTMOB_LOGO(8668) },
    { id: 9879, name: "Fulham", shortName: "FUL", logo: FOTMOB_LOGO(9879) },
    { id: 9788, name: "Ipswich Town", shortName: "IPS", logo: FOTMOB_LOGO(9788) },
    { id: 8197, name: "Leicester City", shortName: "LEI", logo: FOTMOB_LOGO(8197) },
    { id: 8650, name: "Liverpool", shortName: "LIV", logo: FOTMOB_LOGO(8650) },
    { id: 8456, name: "Manchester City", shortName: "MCI", logo: FOTMOB_LOGO(8456) },
    { id: 10260, name: "Manchester United", shortName: "MUN", logo: FOTMOB_LOGO(10260) },
    { id: 10261, name: "Newcastle United", shortName: "NEW", logo: FOTMOB_LOGO(10261) },
    { id: 10203, name: "Nottingham Forest", shortName: "NFO", logo: FOTMOB_LOGO(10203) },
    { id: 8466, name: "Southampton", shortName: "SOU", logo: FOTMOB_LOGO(8466) },
    { id: 8586, name: "Tottenham Hotspur", shortName: "TOT", logo: FOTMOB_LOGO(8586) },
    { id: 8654, name: "West Ham United", shortName: "WHU", logo: FOTMOB_LOGO(8654) },
    { id: 8602, name: "Wolverhampton Wanderers", shortName: "WOL", logo: FOTMOB_LOGO(8602) },
  ],

  LaLiga: [
    { id: 8315, name: "Athletic Club", shortName: "ATH", logo: FOTMOB_LOGO(8315) },
    { id: 9906, name: "Atletico Madrid", shortName: "ATM", logo: FOTMOB_LOGO(9906) },
    { id: 8634, name: "Barcelona", shortName: "BAR", logo: FOTMOB_LOGO(8634) },
    { id: 8558, name: "Celta Vigo", shortName: "CEL", logo: FOTMOB_LOGO(8558) },
    { id: 9864, name: "Deportivo Alaves", shortName: "ALA", logo: FOTMOB_LOGO(9864) },
    { id: 8584, name: "Espanyol", shortName: "ESP", logo: FOTMOB_LOGO(8584) },
    { id: 8305, name: "Getafe", shortName: "GET", logo: FOTMOB_LOGO(8305) },
    { id: 7732, name: "Girona", shortName: "GIR", logo: FOTMOB_LOGO(7732) },
    { id: 8306, name: "Las Palmas", shortName: "LPA", logo: FOTMOB_LOGO(8306) },
    { id: 9869, name: "Leganes", shortName: "LEG", logo: FOTMOB_LOGO(9869) },
    { id: 8429, name: "Mallorca", shortName: "MLL", logo: FOTMOB_LOGO(8429) },
    { id: 8371, name: "Osasuna", shortName: "OSA", logo: FOTMOB_LOGO(8371) },
    { id: 10141, name: "Rayo Vallecano", shortName: "RAY", logo: FOTMOB_LOGO(10141) },
    { id: 8603, name: "Real Betis", shortName: "BET", logo: FOTMOB_LOGO(8603) },
    { id: 8633, name: "Real Madrid", shortName: "RMA", logo: FOTMOB_LOGO(8633) },
    { id: 8989, name: "Real Sociedad", shortName: "RSO", logo: FOTMOB_LOGO(8989) },
    { id: 10281, name: "Real Valladolid", shortName: "VLL", logo: FOTMOB_LOGO(10281) },
    { id: 8302, name: "Sevilla", shortName: "SEV", logo: FOTMOB_LOGO(8302) },
    { id: 10267, name: "Valencia", shortName: "VAL", logo: FOTMOB_LOGO(10267) },
    { id: 10205, name: "Villarreal", shortName: "VIL", logo: FOTMOB_LOGO(10205) },
  ],

  "Serie A": [
    { id: 8564, name: "AC Milan", shortName: "MIL", logo: FOTMOB_LOGO(8564) },
    { id: 8524, name: "Atalanta", shortName: "ATA", logo: FOTMOB_LOGO(8524) },
    { id: 9857, name: "Bologna", shortName: "BOL", logo: FOTMOB_LOGO(9857) },
    { id: 8529, name: "Cagliari", shortName: "CAG", logo: FOTMOB_LOGO(8529) },
    { id: 9891, name: "Como", shortName: "COM", logo: FOTMOB_LOGO(9891) },
    { id: 8534, name: "Empoli", shortName: "EMP", logo: FOTMOB_LOGO(8534) },
    { id: 8535, name: "Fiorentina", shortName: "FIO", logo: FOTMOB_LOGO(8535) },
    { id: 10233, name: "Genoa", shortName: "GEN", logo: FOTMOB_LOGO(10233) },
    { id: 9876, name: "Hellas Verona", shortName: "VER", logo: FOTMOB_LOGO(9876) },
    { id: 8636, name: "Inter", shortName: "INT", logo: FOTMOB_LOGO(8636) },
    { id: 9885, name: "Juventus", shortName: "JUV", logo: FOTMOB_LOGO(9885) },
    { id: 8543, name: "Lazio", shortName: "LAZ", logo: FOTMOB_LOGO(8543) },
    { id: 9888, name: "Lecce", shortName: "LEC", logo: FOTMOB_LOGO(9888) },
    { id: 6504, name: "Monza", shortName: "MON", logo: FOTMOB_LOGO(6504) },
    { id: 9875, name: "Napoli", shortName: "NAP", logo: FOTMOB_LOGO(9875) },
    { id: 10167, name: "Parma", shortName: "PAR", logo: FOTMOB_LOGO(10167) },
    { id: 8686, name: "Roma", shortName: "ROM", logo: FOTMOB_LOGO(8686) },
    { id: 9804, name: "Torino", shortName: "TOR", logo: FOTMOB_LOGO(9804) },
    { id: 8600, name: "Udinese", shortName: "UDI", logo: FOTMOB_LOGO(8600) },
    { id: 8464, name: "Venezia", shortName: "VEN", logo: FOTMOB_LOGO(8464) },
  ],

  Bundesliga: [
    { id: 8406, name: "FC Augsburg", shortName: "FCA", logo: FOTMOB_LOGO(8406) },
    { id: 8178, name: "Bayer Leverkusen", shortName: "B04", logo: FOTMOB_LOGO(8178) },
    { id: 9823, name: "Bayern Munich", shortName: "BAY", logo: FOTMOB_LOGO(9823) },
    { id: 9911, name: "VfL Bochum", shortName: "BOC", logo: FOTMOB_LOGO(9911) },
    { id: 9789, name: "Borussia Dortmund", shortName: "BVB", logo: FOTMOB_LOGO(9789) },
    { id: 9790, name: "Borussia M'gladbach", shortName: "BMG", logo: FOTMOB_LOGO(9790) },
    { id: 9810, name: "Eintracht Frankfurt", shortName: "SGE", logo: FOTMOB_LOGO(9810) },
    { id: 8358, name: "SC Freiburg", shortName: "SCF", logo: FOTMOB_LOGO(8358) },
    { id: 9761, name: "FC Heidenheim", shortName: "FCH", logo: FOTMOB_LOGO(9761) },
    { id: 8226, name: "TSG Hoffenheim", shortName: "TSG", logo: FOTMOB_LOGO(8226) },
    { id: 9776, name: "Holstein Kiel", shortName: "KSV", logo: FOTMOB_LOGO(9776) },
    { id: 9905, name: "Mainz 05", shortName: "M05", logo: FOTMOB_LOGO(9905) },
    { id: 178475, name: "RB Leipzig", shortName: "RBL", logo: FOTMOB_LOGO(178475) },
    { id: 9779, name: "FC St. Pauli", shortName: "STP", logo: FOTMOB_LOGO(9779) },
    { id: 10269, name: "VfB Stuttgart", shortName: "VFB", logo: FOTMOB_LOGO(10269) },
    { id: 8593, name: "Union Berlin", shortName: "FCU", logo: FOTMOB_LOGO(8593) },
    { id: 8697, name: "Werder Bremen", shortName: "SVW", logo: FOTMOB_LOGO(8697) },
    { id: 8721, name: "VfL Wolfsburg", shortName: "WOB", logo: FOTMOB_LOGO(8721) },
  ],

  "Ligue 1": [
    { id: 8121, name: "Angers", shortName: "ANG", logo: FOTMOB_LOGO(8121) },
    { id: 8550, name: "Auxerre", shortName: "AUX", logo: FOTMOB_LOGO(8550) },
    { id: 9830, name: "Brest", shortName: "SB29", logo: FOTMOB_LOGO(9830) },
    { id: 9747, name: "Le Havre", shortName: "HAC", logo: FOTMOB_LOGO(9747) },
    { id: 8588, name: "Lens", shortName: "RCL", logo: FOTMOB_LOGO(8588) },
    { id: 8639, name: "Lille", shortName: "LOSC", logo: FOTMOB_LOGO(8639) },
    { id: 9748, name: "Lyon", shortName: "OL", logo: FOTMOB_LOGO(9748) },
    { id: 8164, name: "Marseille", shortName: "OM", logo: FOTMOB_LOGO(8164) },
    { id: 9829, name: "Monaco", shortName: "ASM", logo: FOTMOB_LOGO(9829) },
    { id: 10249, name: "Montpellier", shortName: "MHSC", logo: FOTMOB_LOGO(10249) },
    { id: 9831, name: "Nantes", shortName: "FCN", logo: FOTMOB_LOGO(9831) },
    { id: 9827, name: "Nice", shortName: "OGCN", logo: FOTMOB_LOGO(9827) },
    { id: 9847, name: "Paris Saint-Germain", shortName: "PSG", logo: FOTMOB_LOGO(9847) },
    { id: 9837, name: "Reims", shortName: "SDR", logo: FOTMOB_LOGO(9837) },
    { id: 9851, name: "Rennes", shortName: "SRFC", logo: FOTMOB_LOGO(9851) },
    { id: 8682, name: "Saint-Etienne", shortName: "ASSE", logo: FOTMOB_LOGO(8682) },
    { id: 9848, name: "Strasbourg", shortName: "RCSA", logo: FOTMOB_LOGO(9848) },
    { id: 9941, name: "Toulouse", shortName: "TFC", logo: FOTMOB_LOGO(9941) },
  ],

  "UEFA Champions League": [
    { id: 9825, name: "Arsenal", shortName: "ARS", logo: FOTMOB_LOGO(9825) },
    { id: 10252, name: "Aston Villa", shortName: "AVL", logo: FOTMOB_LOGO(10252) },
    { id: 8524, name: "Atalanta", shortName: "ATA", logo: FOTMOB_LOGO(8524) },
    { id: 9906, name: "Atletico Madrid", shortName: "ATM", logo: FOTMOB_LOGO(9906) },
    { id: 8634, name: "Barcelona", shortName: "BAR", logo: FOTMOB_LOGO(8634) },
    { id: 8178, name: "Bayer Leverkusen", shortName: "B04", logo: FOTMOB_LOGO(8178) },
    { id: 9823, name: "Bayern Munich", shortName: "BAY", logo: FOTMOB_LOGO(9823) },
    { id: 9789, name: "Borussia Dortmund", shortName: "BVB", logo: FOTMOB_LOGO(9789) },
    { id: 9830, name: "Brest", shortName: "SB29", logo: FOTMOB_LOGO(9830) },
    { id: 8636, name: "Inter", shortName: "INT", logo: FOTMOB_LOGO(8636) },
    { id: 9885, name: "Juventus", shortName: "JUV", logo: FOTMOB_LOGO(9885) },
    { id: 8650, name: "Liverpool", shortName: "LIV", logo: FOTMOB_LOGO(8650) },
    { id: 8456, name: "Manchester City", shortName: "MCI", logo: FOTMOB_LOGO(8456) },
    { id: 8564, name: "AC Milan", shortName: "MIL", logo: FOTMOB_LOGO(8564) },
    { id: 9829, name: "Monaco", shortName: "ASM", logo: FOTMOB_LOGO(9829) },
    { id: 9847, name: "Paris Saint-Germain", shortName: "PSG", logo: FOTMOB_LOGO(9847) },
    { id: 178475, name: "RB Leipzig", shortName: "RBL", logo: FOTMOB_LOGO(178475) },
    { id: 8633, name: "Real Madrid", shortName: "RMA", logo: FOTMOB_LOGO(8633) },
    { id: 9768, name: "Sporting CP", shortName: "SCP", logo: FOTMOB_LOGO(9768) },
    { id: 9810, name: "Eintracht Frankfurt", shortName: "SGE", logo: FOTMOB_LOGO(9810) },
  ],

  "UEFA Europa League": [
    { id: 8315, name: "Athletic Club", shortName: "ATH", logo: FOTMOB_LOGO(8315) },
    { id: 8992, name: "Ajax", shortName: "AJA", logo: FOTMOB_LOGO(8992) },
    { id: 8178, name: "Bayer Leverkusen", shortName: "B04", logo: FOTMOB_LOGO(8178) },
    { id: 8543, name: "Lazio", shortName: "LAZ", logo: FOTMOB_LOGO(8543) },
    { id: 10260, name: "Manchester United", shortName: "MUN", logo: FOTMOB_LOGO(10260) },
    { id: 9784, name: "Olympiacos", shortName: "OLY", logo: FOTMOB_LOGO(9784) },
    { id: 9773, name: "FC Porto", shortName: "FCP", logo: FOTMOB_LOGO(9773) },
    { id: 8603, name: "Real Betis", shortName: "BET", logo: FOTMOB_LOGO(8603) },
    { id: 8989, name: "Real Sociedad", shortName: "RSO", logo: FOTMOB_LOGO(8989) },
    { id: 8686, name: "Roma", shortName: "ROM", logo: FOTMOB_LOGO(8686) },
    { id: 8586, name: "Tottenham Hotspur", shortName: "TOT", logo: FOTMOB_LOGO(8586) },
  ],

  "FIFA World Cup": [
    { id: 8459, name: "Argentina", shortName: "ARG", logo: FOTMOB_LOGO(8459) },
    { id: 8461, name: "Brazil", shortName: "BRA", logo: FOTMOB_LOGO(8461) },
    { id: 8460, name: "France", shortName: "FRA", logo: FOTMOB_LOGO(8460) },
    { id: 8462, name: "England", shortName: "ENG", logo: FOTMOB_LOGO(8462) },
    { id: 8475, name: "Spain", shortName: "ESP", logo: FOTMOB_LOGO(8475) },
    { id: 8472, name: "Germany", shortName: "GER", logo: FOTMOB_LOGO(8472) },
    { id: 8478, name: "Portugal", shortName: "POR", logo: FOTMOB_LOGO(8478) },
    { id: 8474, name: "Netherlands", shortName: "NED", logo: FOTMOB_LOGO(8474) },
    { id: 8471, name: "Italy", shortName: "ITA", logo: FOTMOB_LOGO(8471) },
    { id: 8482, name: "Uruguay", shortName: "URU", logo: FOTMOB_LOGO(8482) },
    { id: 8480, name: "Colombia", shortName: "COL", logo: FOTMOB_LOGO(8480) },
    { id: 8483, name: "Croatia", shortName: "CRO", logo: FOTMOB_LOGO(8483) },
    { id: 8463, name: "Belgium", shortName: "BEL", logo: FOTMOB_LOGO(8463) },
    { id: 8485, name: "Japan", shortName: "JPN", logo: FOTMOB_LOGO(8485) },
    { id: 8488, name: "Morocco", shortName: "MAR", logo: FOTMOB_LOGO(8488) },
    { id: 8487, name: "United States", shortName: "USA", logo: FOTMOB_LOGO(8487) },
  ],

  "UEFA Euro": [
    { id: 8475, name: "Spain", shortName: "ESP", logo: FOTMOB_LOGO(8475) },
    { id: 8462, name: "England", shortName: "ENG", logo: FOTMOB_LOGO(8462) },
    { id: 8460, name: "France", shortName: "FRA", logo: FOTMOB_LOGO(8460) },
    { id: 8474, name: "Netherlands", shortName: "NED", logo: FOTMOB_LOGO(8474) },
    { id: 8472, name: "Germany", shortName: "GER", logo: FOTMOB_LOGO(8472) },
    { id: 8478, name: "Portugal", shortName: "POR", logo: FOTMOB_LOGO(8478) },
    { id: 8471, name: "Italy", shortName: "ITA", logo: FOTMOB_LOGO(8471) },
    { id: 8463, name: "Belgium", shortName: "BEL", logo: FOTMOB_LOGO(8463) },
    { id: 8483, name: "Croatia", shortName: "CRO", logo: FOTMOB_LOGO(8483) },
    { id: 8486, name: "Switzerland", shortName: "SUI", logo: FOTMOB_LOGO(8486) },
    { id: 8484, name: "Denmark", shortName: "DEN", logo: FOTMOB_LOGO(8484) },
    { id: 8489, name: "Austria", shortName: "AUT", logo: FOTMOB_LOGO(8489) },
  ],

  "Copa America": [
    { id: 8459, name: "Argentina", shortName: "ARG", logo: FOTMOB_LOGO(8459) },
    { id: 8480, name: "Colombia", shortName: "COL", logo: FOTMOB_LOGO(8480) },
    { id: 8482, name: "Uruguay", shortName: "URU", logo: FOTMOB_LOGO(8482) },
    { id: 8461, name: "Brazil", shortName: "BRA", logo: FOTMOB_LOGO(8461) },
    { id: 8487, name: "United States", shortName: "USA", logo: FOTMOB_LOGO(8487) },
    { id: 8490, name: "Mexico", shortName: "MEX", logo: FOTMOB_LOGO(8490) },
    { id: 8491, name: "Chile", shortName: "CHI", logo: FOTMOB_LOGO(8491) },
    { id: 8492, name: "Canada", shortName: "CAN", logo: FOTMOB_LOGO(8492) },
    { id: 8493, name: "Ecuador", shortName: "ECU", logo: FOTMOB_LOGO(8493) },
    { id: 8494, name: "Venezuela", shortName: "VEN", logo: FOTMOB_LOGO(8494) },
  ],
};

/**
 * Returns teams for the specified league name.
 * If "All Leagues" is selected, returns a deduplicated list of all clubs and national teams.
 */
export function getTeamsForLeague(leagueName) {
  if (leagueName === "All Leagues") {
    const seen = new Set();
    const all = [];
    Object.values(TEAMS_BY_LEAGUE).forEach((teamList) => {
      teamList.forEach((team) => {
        if (!seen.has(team.id)) {
          seen.add(team.id);
          all.push(team);
        }
      });
    });
    return all.sort((a, b) => a.name.localeCompare(b.name));
  }
  return TEAMS_BY_LEAGUE[leagueName] || TEAMS_BY_LEAGUE["Premier League"];
}
