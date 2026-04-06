"use client";

import { Video, MapPin, Clock } from "lucide-react";

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: string;
  type: "video" | "in-person";
  location?: string;
  videoUrl?: string;
  isNext?: boolean;
}

const meetings: Meeting[] = [
  {
    id: "1",
    title: "Design Review",
    date: "Apr 5",
    time: "10:00 AM",
    duration: "45 min",
    type: "video",
    videoUrl: "https://meet.google.com/",
    isNext: true,
  },
  {
    id: "2",
    title: "Sprint Planning",
    date: "Mar 25",
    time: "2:00 PM",
    duration: "1 hr",
    type: "video",
    videoUrl: "https://meet.google.com/",
  },
];

function parseDurationToMinutes(duration: string): number {
  const hourMatch = duration.match(/(\d+)\s*hr/);
  const minuteMatch = duration.match(/(\d+)\s*min/);
  const hours = hourMatch ? Number(hourMatch[1]) : 0;
  const minutes = minuteMatch ? Number(minuteMatch[1]) : 0;
  return hours * 60 + minutes;
}

function getMeetingDateTime(date: string, time: string): Date {
  const now = new Date();
  const year = now.getFullYear();
  return new Date(`${date} ${year} ${time}`);
}

function toIcsDateTimeString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

function downloadCalendarInvite(meeting: Meeting) {
  const start = getMeetingDateTime(meeting.date, meeting.time);
  const end = new Date(
    start.getTime() + parseDurationToMinutes(meeting.duration) * 60_000
  );
  const stamp = toIcsDateTimeString(new Date());

  const description =
    meeting.type === "video"
      ? `Video meeting${meeting.videoUrl ? `\nJoin: ${meeting.videoUrl}` : ""}`
      : "In-person meeting";
  const location =
    meeting.type === "video"
      ? meeting.videoUrl ?? "Online"
      : meeting.location ?? "TBD";

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Meeting Dashboard//EN",
    "BEGIN:VEVENT",
    `UID:${meeting.id}@meeting-dashboard`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${toIcsDateTimeString(start)}`,
    `DTEND:${toIcsDateTimeString(end)}`,
    `SUMMARY:${meeting.title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${meeting.title.toLowerCase().replace(/\s+/g, "-")}.ics`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export function UpcomingMeetingsCard() {
  return (
    <div className="flex w-full flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-[20px] font-medium tracking-wide text-white">
            Upcoming Meetings
          </h3>
        </div>
      </div>

      <div className="mt-2 space-y-3">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className={`group relative rounded-lg border p-3 transition-all hover:border-[#c9a227]/50 ${
              meeting.isNext
                ? "border-[#c9a227]/30 bg-[#c9a227]/5"
                : "border-[#2a2a2a] bg-[#1a1a1a]"
            }`}
          >
            {meeting.isNext && (
              <div className="absolute -left-px top-1/2 h-8 w-0.5 -translate-y-1/2 rounded-full bg-[#c9a227]" />
            )}

            <div className="flex items-center gap-4">
              <div className="min-w-[54px] rounded-lg bg-[#252525] px-2.5 py-1.5">
                <div className="text-center text-lg font-semibold text-white font-mono">
                  {meeting.date.split(" ")[1]}
                </div>
                <div className="text-center text-[10px] tracking-wide uppercase text-[#888] font-mono">
                  {meeting.date.split(" ")[0]}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="truncate text-sm font-medium text-white">
                    {meeting.title}
                  </h4>
                  {meeting.isNext && (
                    <span className="shrink-0 rounded bg-[#c9a227]/20 px-1.5 py-0.5 text-[8px] font-medium font-mono uppercase tracking-wider text-[#c9a227]">
                      Next
                    </span>
                  )}
                </div>

                <div className="mt-1 flex flex-nowrap items-center gap-2 text-[10px] text-[#888] font-mono">
                  <span className="flex items-center gap-1 whitespace-nowrap font-mono">
                    <Clock className="h-3 w-3" />
                    {meeting.time}
                  </span>
                  <span className="text-[#555]">•</span>
                  <span className="whitespace-nowrap font-mono">{meeting.duration}</span>
                  <span className="text-[#555]">•</span>
                  <span className="flex items-center gap-1 whitespace-nowrap font-mono">
                    {meeting.type === "video" ? (
                      <Video className="h-3 w-3" />
                    ) : (
                      <MapPin className="h-3 w-3" />
                    )}
                    {meeting.type === "video" ? "Video" : "In-person"}
                  </span>
                </div>
              </div>

              {meeting.isNext && (
                <button
                  onClick={() => downloadCalendarInvite(meeting)}
                  className="shrink-0 rounded-md border border-[#434343] bg-[#262626] px-3 py-1.5 text-[8px] font-normal font-mono tracking-[0.06em] text-[#fbfbfb] transition-colors hover:border-[#ffffff] hover:bg-[#ffffff] hover:text-[#111111]"
                >
                  ADD TO CALENDAR
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
