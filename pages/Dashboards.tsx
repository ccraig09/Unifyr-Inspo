import React, { useState } from "react";
import { User, Event, VendorApplication } from "../types";
import { Button, Card, Badge, Tabs } from "../components/ui";
import { StatCard, VideoListRow } from "../components/ui-features";
import {
  Calendar,
  Users,
  DollarSign,
  Briefcase,
  CheckCircle,
  Clock,
  XCircle,
  Wand2,
} from "lucide-react";
import NewAttendeeDashboard, {
  Event as NewEvent,
  User as NewUser,
} from "../components/AttendeeDashboard";

// --- HOST DASHBOARD ---
export const HostDashboard: React.FC<{ user: User; events: Event[]; onEventClick?: (event: Event) => void }> = ({
  user,
  events,
  onEventClick,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Host Dashboard</h1>
        <Button>
          <Wand2 size={18} /> Create Event
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Events"
          value={user.stats?.eventsHosted || 0}
          icon={Calendar}
        />
        <StatCard
          label="Total Attendees"
          value="12.5k"
          icon={Users}
          trend="+12%"
        />
        <StatCard
          label="Revenue"
          value="$45.2k"
          icon={DollarSign}
          trend="+5%"
        />
        <StatCard label="Avg. Rating" value="4.8" icon={CheckCircle} />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-4">My Events</h3>
            <div className="space-y-4">
              {events.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  onClick={() => onEventClick?.(event)}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-800/50 transition-colors cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-lg bg-neutral-800 overflow-hidden">
                    <img
                      src={event.thumbnailUrl}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold">{event.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <span>{event.date}</span>
                      <span>•</span>
                      <Badge
                        variant={
                          event.status === "Published" ? "success" : "outline"
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">{event.attendees}</div>
                    <div className="text-xs text-neutral-500">Going</div>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-sm">
              View All Events
            </Button>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-gradient-to-br from-neutral-900 to-indigo-900/20 border-indigo-500/30">
            <div className="flex items-center gap-2 mb-4 text-indigo-400">
              <Wand2 size={20} />
              <h3 className="font-bold">AI Insights</h3>
            </div>
            <p className="text-sm text-neutral-300 mb-4">
              Your "Summer Music Festival" is trending! Consider adding more VIP
              tickets to maximize revenue.
            </p>
            <Button variant="outline" size="sm" className="w-full">
              View Details
            </Button>
          </Card>

          <VideoListRow title="Top Performing Reels" videos={events} />
        </div>
      </div>
    </div>
  );
};

// --- VENDOR DASHBOARD ---
export const VendorDashboard: React.FC<{
  user: User;
  applications: VendorApplication[];
}> = ({ user, applications }) => {
  const [tab, setTab] = useState("pending");

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Portal</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          label="Active Applications"
          value={applications.length}
          icon={Briefcase}
        />
        <StatCard
          label="Events Approved"
          value="12"
          icon={CheckCircle}
          trend="+2"
        />
        <StatCard label="Total Earnings" value="$8.4k" icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="p-6 min-h-[400px]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Applications</h3>
              <div className="w-64">
                <Tabs
                  items={[
                    { id: "pending", label: "Pending" },
                    { id: "approved", label: "Approved" },
                    { id: "rejected", label: "Rejected" },
                  ]}
                  activeId={tab}
                  onChange={setTab}
                />
              </div>
            </div>

            <div className="space-y-3">
              {applications
                .filter((a) => a.status.toLowerCase() === tab)
                .map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-4 bg-neutral-800/50 rounded-xl border border-neutral-800"
                  >
                    <div>
                      <h4 className="font-bold text-white">{app.eventName}</h4>
                      <p className="text-sm text-neutral-400">
                        Applied {app.appliedDate}
                      </p>
                    </div>
                    <Badge
                      variant={
                        app.status === "Approved"
                          ? "success"
                          : app.status === "Rejected"
                          ? "danger"
                          : "warning"
                      }
                    >
                      {app.status}
                    </Badge>
                  </div>
                ))}
              {applications.filter((a) => a.status.toLowerCase() === tab)
                .length === 0 && (
                <div className="text-center py-12 text-neutral-500">
                  No applications found in this category.
                </div>
              )}
            </div>
          </Card>
        </div>

        <div>
          <Card className="p-6 mb-6">
            <h3 className="font-bold mb-4">Completeness</h3>
            <div className="w-full bg-neutral-800 h-2 rounded-full mb-2 overflow-hidden">
              <div className="bg-neon-teal h-full w-[75%]"></div>
            </div>
            <p className="text-xs text-neutral-400 mb-4">
              75% Complete. Add a video intro to reach 100%.
            </p>
            <Button variant="secondary" size="sm" className="w-full">
              Update Profile
            </Button>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold mb-4">Recommended Gigs</h3>
            <div className="text-sm text-neutral-400 mb-4">
              Based on your profile "Food Truck"
            </div>
            <Button className="w-full">Find Events</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- ATTENDEE DASHBOARD ---
export const AttendeeDashboard: React.FC<{ user: User; events: Event[]; onEventClick?: (event: Event) => void }> = ({
  user,
  events,
  onEventClick,
}) => {
  // Map project types to the new component's expected types
  const mappedUser: NewUser = {
    ...user,
    role: user.role.toUpperCase() as "ATTENDEE" | "HOST" | "VENDOR",
    stats: {
      eventsAttended: user.stats?.eventsAttended || 0,
      eventsSaved: 12, // Mocking for demo
      hostsFollowed: 5, // Mocking for demo
      checkIns: 3, // Mocking for demo
    },
  };

  const mappedEvents: NewEvent[] = events.map((e) => ({
    ...e,
    // Ensure status matches
    status:
      e.status === "Published" || e.status === "Draft" ? e.status : "Published",
    // Add random UI status for demo purposes
    attendeeStatus:
      Math.random() > 0.7
        ? "Saved"
        : Math.random() > 0.5
        ? "Waitlist"
        : "Confirmed",
  }));

  return <NewAttendeeDashboard user={mappedUser} events={mappedEvents} onEventClick={onEventClick} />;
};
