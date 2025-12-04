import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Heart,
  Bookmark,
  Users,
  CheckCircle,
  Ticket,
  ChevronRight,
} from "lucide-react";

// --- Types ---

export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  thumbnailUrl: string;
  host: string;
  status: "Published" | "Draft";
  attendees: number;
  // Extended for UI logic as per requirements
  attendeeStatus?: "Confirmed" | "Waitlist" | "Saved";
}

export interface User {
  id: string;
  name: string;
  role: "ATTENDEE" | "HOST" | "VENDOR";
  stats?: {
    eventsAttended?: number;
    eventsSaved?: number;
    hostsFollowed?: number;
    checkIns?: number;
  };
}

interface AttendeeDashboardProps {
  user: User;
  events: Event[];
  onEventClick?: (event: Event) => void;
}

// --- Sub-components ---

const StatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  icon: React.ElementType;
}) => (
  <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl flex-1 min-w-[130px]">
    <div className="flex items-center gap-3">
      <div className="p-2 bg-neutral-800 rounded-lg text-yellow-400">
        <Icon size={20} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-neutral-500">{label}</div>
      </div>
    </div>
  </div>
);

export const AttendeeStatsRow = ({ user }: { user: User }) => {
  const stats = user.stats || {};
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Upcoming"
        value={stats.eventsAttended || 0}
        icon={Calendar}
      />
      <StatCard label="Saved" value={stats.eventsSaved || 0} icon={Bookmark} />
      <StatCard
        label="Following"
        value={stats.hostsFollowed || 0}
        icon={Users}
      />
      <StatCard label="Check-ins" value={stats.checkIns || 0} icon={MapPin} />
    </div>
  );
};

export const NextEventCard = ({ event, onClick }: { event: Event; onClick?: (event: Event) => void }) => {
  if (!event) return null;

  return (
    <div 
      className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 md:p-6 mb-8 relative overflow-hidden group cursor-pointer"
      onClick={() => onClick?.(event)}
    >
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
        {/* Thumbnail */}
        <div className="w-full md:w-32 h-32 rounded-xl bg-neutral-800 overflow-hidden flex-shrink-0 shadow-lg">
          <img
            src={event.thumbnailUrl}
            alt={event.title}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>

        {/* Info */}
        <div className="flex-1 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-yellow-400 text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.3)]">
              In 3 days
            </span>
            <span className="text-neutral-500 text-xs flex items-center gap-1">
              <Clock size={12} /> {event.time}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1 line-clamp-1">
            {event.title}
          </h2>
          <div className="text-neutral-400 text-sm mb-4 flex items-center gap-2">
            <MapPin size={14} /> {event.location}
          </div>

          <div className="flex gap-3">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-6 rounded-lg text-sm transition-colors shadow-lg hover:shadow-yellow-400/20">
              View Ticket
            </button>
            <button className="bg-transparent border border-neutral-700 hover:border-neutral-500 text-white py-2 px-4 rounded-lg text-sm transition-colors flex items-center gap-2">
              <Calendar size={16} /> Add to Calendar
            </button>
          </div>
        </div>
      </div>

      {/* Background glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 blur-[100px] pointer-events-none" />
    </div>
  );
};

export const AttendeeSummaryHeader = ({
  user,
  nextEvent,
  onEventClick,
}: {
  user: User;
  nextEvent: Event | undefined;
  onEventClick?: (event: Event) => void;
}) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Hey {user.name.split(" ")[0]}, here's your week
          </h1>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 box-shadow-[0_0_8px_rgba(45,212,191,0.5)]"></span>
            Attendee
          </div>
        </div>
      </div>

      {nextEvent && <NextEventCard event={nextEvent} onClick={onEventClick} />}
      <AttendeeStatsRow user={user} />
    </div>
  );
};

export const FeedToggle = ({
  activeTab,
  onChange,
}: {
  activeTab: "upcoming" | "saved";
  onChange: (tab: "upcoming" | "saved") => void;
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <button
          onClick={() => onChange("upcoming")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
            activeTab === "upcoming"
              ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-105"
              : "bg-neutral-900 border border-neutral-800 text-white hover:border-neutral-700"
          }`}
        >
          Upcoming
        </button>
        <button
          onClick={() => onChange("saved")}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
            activeTab === "saved"
              ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-105"
              : "bg-neutral-900 border border-neutral-800 text-white hover:border-neutral-700"
          }`}
        >
          Saved
        </button>
      </div>
      <p className="text-neutral-500 text-sm pl-1">
        {activeTab === "upcoming"
          ? "Upcoming events you're going to"
          : "Events you've bookmarked for later"}
      </p>
    </div>
  );
};

export const AttendeeReelCard = ({ event, onClick }: { event: Event; onClick?: (event: Event) => void }) => {
  const isWaitlist = event.attendeeStatus === "Waitlist";
  const isSaved = event.attendeeStatus === "Saved";

  return (
    <div 
      className="min-w-[160px] w-[160px] h-[280px] bg-neutral-900 rounded-xl relative overflow-hidden flex-shrink-0 border border-neutral-800 group cursor-pointer hover:border-neutral-600 transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-xl"
      onClick={() => onClick?.(event)}
    >
      {/* Thumbnail */}
      <img
        src={event.thumbnailUrl}
        alt={event.title}
        className="w-full h-[65%] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Badges */}
      <div className="absolute top-2 right-2">
        {isSaved ? (
          <div className="bg-black/60 backdrop-blur-md p-1.5 rounded-full text-red-500 shadow-sm">
            <Heart size={14} fill="currentColor" />
          </div>
        ) : (
          <div
            className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${
              isWaitlist
                ? "bg-yellow-500/90 text-black"
                : "bg-green-500/90 text-black"
            }`}
          >
            {isWaitlist ? "Waitlist" : "Confirmed"}
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 pt-16 pb-3 px-3 bg-gradient-to-t from-neutral-950 via-neutral-900/95 to-transparent flex flex-col justify-end h-full pointer-events-none">
        <h3 className="text-sm font-bold text-white leading-tight mb-1 line-clamp-2 group-hover:text-yellow-400 transition-colors">
          {event.title}
        </h3>
        <div className="flex items-center gap-1 text-[10px] text-neutral-300 mb-1">
          <Calendar size={10} className="text-neutral-500" />
          <span>
            {event.date} • {event.time}
          </span>
        </div>
        <div className="text-[10px] text-neutral-500 truncate border-t border-neutral-800/50 pt-1.5 mt-1">
          by <span className="text-neutral-400">{event.host}</span>
        </div>
      </div>
    </div>
  );
};

export const AttendeeReelsSection = ({
  title,
  events,
  onEventClick,
}: {
  title: string;
  events: Event[];
  onEventClick?: (event: Event) => void;
}) => {
  return (
    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-4 overflow-x-auto pb-6 snap-x scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {events.map((event) => (
          <AttendeeReelCard key={event.id} event={event} onClick={onEventClick} />
        ))}
      </div>
    </div>
  );
};

// --- Main Component ---

export const AttendeeDashboard: React.FC<AttendeeDashboardProps> = ({
  user,
  events,
  onEventClick,
}) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "saved">("upcoming");

  // Filter events based on tab
  // Mocking the filter logic based on `attendeeStatus` or falling back to 'upcoming' if undefined for demo
  const upcomingEvents = events.filter(
    (e) =>
      !e.attendeeStatus ||
      e.attendeeStatus === "Confirmed" ||
      e.attendeeStatus === "Waitlist"
  );
  const savedEvents = events.filter((e) => e.attendeeStatus === "Saved");

  // Next event logic (earliest upcoming) - just taking first for demo
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : undefined;

  const displayEvents = activeTab === "upcoming" ? upcomingEvents : savedEvents;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 md:py-8 min-h-screen bg-neutral-950 text-white font-sans">
      <AttendeeSummaryHeader user={user} nextEvent={nextEvent} onEventClick={onEventClick} />

      <FeedToggle activeTab={activeTab} onChange={setActiveTab} />

      {displayEvents.length > 0 ? (
        <AttendeeReelsSection
          title={activeTab === "upcoming" ? "Your Schedule" : "Saved Events"}
          events={displayEvents}
          onEventClick={onEventClick}
        />
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center border-2 border-dashed border-neutral-800 rounded-2xl bg-neutral-900/30 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center mb-4 text-neutral-600 border border-neutral-800">
            {activeTab === "upcoming" ? (
              <Calendar size={28} />
            ) : (
              <Bookmark size={28} />
            )}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">
            {activeTab === "upcoming"
              ? "No upcoming events"
              : "No saved events yet"}
          </h3>
          <p className="text-neutral-400 text-sm max-w-xs mb-6 leading-relaxed">
            {activeTab === "upcoming"
              ? "Looks like your schedule is clear. Ready to find something to do?"
              : "Explore events and tap the heart icon to save them for later."}
          </p>
          <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2.5 px-6 rounded-lg text-sm transition-colors shadow-lg hover:shadow-yellow-400/20">
            {activeTab === "upcoming"
              ? "Find Events to Attend"
              : "Explore Events"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AttendeeDashboard;
