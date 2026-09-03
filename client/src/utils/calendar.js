/**
 * Calendar utilities — Google Calendar URL generation & ICS file export
 */

// ── Google Calendar Direct URL (opens in new tab) ──
export function generateGoogleCalendarUrl(match) {
  const matchDate = new Date(match.date);

  const formatGCalDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const endDate = new Date(matchDate.getTime() + 2 * 60 * 60 * 1000);

  const title = `${match.homeTeam} vs ${match.awayTeam}`;
  const details = `League: ${match.league}\nMatch: ${match.homeTeam} vs ${match.awayTeam}\nKickoff: ${matchDate.toUTCString()}\n\nExported from Sports Calendar`;

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${formatGCalDate(matchDate)}/${formatGCalDate(endDate)}`,
    details,
    location: match.league,
    sf: "true",
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ── ICS File Content Generator (Bulk) ──
export function generateICSFile(matches) {
  const formatICSDate = (date) =>
    date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  const stamp = formatICSDate(new Date());

  let icsLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sports Calendar//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "X-WR-CALNAME:My Football Collection",
    "X-WR-TIMEZONE:UTC",
  ];

  matches.forEach((match) => {
    const kickoff = new Date(match.date);
    const end = new Date(kickoff.getTime() + 2 * 60 * 60 * 1000);
    const uid = `fixture-${match.id}-${kickoff.getTime()}@sportscalendar.app`;

    const summary = `${match.homeTeam} vs ${match.awayTeam}`.replace(/,/g, "\\,");
    const description = `League: ${match.league}\\nMatch: ${match.homeTeam} vs ${match.awayTeam}\\nKickoff: ${kickoff.toUTCString()}\\n\\nAdded from Sports Calendar`.replace(/,/g, "\\,");
    const location = (match.league || "Football Stadium").replace(/,/g, "\\,");

    icsLines.push(
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${formatICSDate(kickoff)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      `LOCATION:${location}`,
      "STATUS:CONFIRMED",
      "SEQUENCE:0",
      "END:VEVENT"
    );
  });

  icsLines.push("END:VCALENDAR");
  return icsLines.join("\r\n");
}

// ── Download .ics File ──
export function downloadICS(matches) {
  if (!matches || matches.length === 0) return;

  const icsContent = generateICSFile(matches);
  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "sports_calendar_collection.ics";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
