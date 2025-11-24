export enum Category {
  ALL = 'All',
  SINGING_DANCING = 'Singing & Dancing',
  COMEDY = 'Comedy',
  SPORTS = 'Sports',
  ANIME_COMICS = 'Anime & Comics',
  RELATIONSHIP = 'Relationship',
  SHOWS = 'Shows',
  LIPSYNC = 'Lipsync'
}

export enum UserRole {
  ATTENDEE = 'Attendee',
  HOST = 'Host',
  VENDOR = 'Vendor',
  GUEST = 'Guest'
}

export type EventStatus = 'Draft' | 'Published' | 'Cancelled' | 'Past';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  stats?: {
    eventsHosted?: number;
    eventsAttended?: number;
    applications?: number;
  };
}

export interface VendorApplication {
  id: string;
  eventId: string;
  eventName: string;
  eventDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  appliedDate: string;
}

export interface Event {
  id: string;
  title: string;
  host: string;
  hostAvatar: string;
  date: string;
  time: string;
  location: string;
  distance: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: Category;
  price: number;
  attendees: number;
  description: string;
  status: EventStatus;
  isPromoted?: boolean;
  amenities?: {
    hasFood: boolean;
    hasAlcohol: boolean;
    isFamilyFriendly: boolean;
    hasWiFi: boolean;
    hasParking: boolean;
  };
  logistics?: {
    setupTime: string;
    breakdownTime: string;
    capacity: number;
  };
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  eventId?: string;
}

export type ViewState = 
  | 'home' 
  | 'events-list' 
  | 'event-detail' 
  | 'dashboard-host' 
  | 'dashboard-vendor' 
  | 'dashboard-attendee' 
  | 'create-event' 
  | 'auth-login' 
  | 'auth-register'
  | 'settings'
  | 'messages'
  | 'media-manager';

// --- Messaging Types ---
export interface Message {
    id: string;
    senderId: string;
    senderName: string;
    senderAvatar: string;
    content: string;
    timestamp: string;
    type: 'text' | 'video' | 'logisticCard';
    metadata?: any; // For logistic cards or video props
}

export interface Thread {
    id: string;
    eventId: string;
    eventName: string;
    participants: { name: string, role: UserRole, avatar: string }[];
    lastMessage: string;
    lastMessageTime: string;
    unreadCount: number;
}

// --- Media Manager Types ---
export interface VideoUpload {
    id: string;
    fileName: string;
    posterUrl: string;
    duration: string;
    uploadDate: string;
    status: 'Uploading' | 'Transcoding' | 'CDN Push' | 'Ready' | 'Error';
    progress: number;
}