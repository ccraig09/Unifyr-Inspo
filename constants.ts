import { Category, Event, VendorApplication, UserRole, Thread, Message, VideoUpload } from './types';

// Using standard open source sample videos for demonstration purposes
export const SAMPLE_VIDEOS = [
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
];

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival 2024',
    host: 'Vibe Productions',
    hostAvatar: 'https://picsum.photos/seed/host1/50/50',
    date: 'Tonight',
    time: '8:00 PM',
    location: 'Golden Gate Park',
    distance: '2.3 mi',
    videoUrl: SAMPLE_VIDEOS[4],
    thumbnailUrl: 'https://picsum.photos/seed/concert/400/600',
    category: Category.SINGING_DANCING,
    price: 45,
    attendees: 1204,
    description: 'Experience the ultimate summer vibes with top artists from around the globe. Food trucks, art installations, and non-stop music.',
    status: 'Published',
    isPromoted: true,
    amenities: { hasFood: true, hasAlcohol: true, isFamilyFriendly: false, hasWiFi: true, hasParking: false }
  },
  {
    id: '2',
    title: 'Comedy Night Live',
    host: 'Laugh Factory SF',
    hostAvatar: 'https://picsum.photos/seed/host2/50/50',
    date: 'Tomorrow',
    time: '7:30 PM',
    location: 'The Punchline',
    distance: '3.1 mi',
    videoUrl: SAMPLE_VIDEOS[0],
    thumbnailUrl: 'https://picsum.photos/seed/comedy/400/600',
    category: Category.COMEDY,
    price: 25,
    attendees: 85,
    description: 'Stand-up comedy featuring local legends and surprise guest stars. Two drink minimum.',
    status: 'Published',
    amenities: { hasFood: true, hasAlcohol: true, isFamilyFriendly: false, hasWiFi: false, hasParking: true }
  },
  {
    id: '3',
    title: 'NBA Finals Watch Party',
    host: 'Sports Bar 415',
    hostAvatar: 'https://picsum.photos/seed/host3/50/50',
    date: 'Tonight',
    time: '6:00 PM',
    location: 'Chase Center Plaza',
    distance: '1.8 mi',
    videoUrl: SAMPLE_VIDEOS[5],
    thumbnailUrl: 'https://picsum.photos/seed/sports/400/600',
    category: Category.SPORTS,
    price: 0,
    attendees: 5000,
    description: 'Watch the game on the big screen! Outdoor event, bring your own chairs.',
    status: 'Published',
    amenities: { hasFood: true, hasAlcohol: true, isFamilyFriendly: true, hasWiFi: true, hasParking: true }
  },
  {
    id: '4',
    title: 'Anime Convention 2024',
    host: 'Otaku World',
    hostAvatar: 'https://picsum.photos/seed/host4/50/50',
    date: 'Sat, Nov 25',
    time: '10:00 AM',
    location: 'Moscone Center',
    distance: '5.2 mi',
    videoUrl: SAMPLE_VIDEOS[1],
    thumbnailUrl: 'https://picsum.photos/seed/anime/400/600',
    category: Category.ANIME_COMICS,
    price: 60,
    attendees: 12000,
    description: 'The biggest anime and comic convention in the bay area.',
    status: 'Published',
    amenities: { hasFood: true, hasAlcohol: false, isFamilyFriendly: true, hasWiFi: true, hasParking: true }
  },
  {
    id: '5',
    title: 'Rooftop Jazz Session',
    host: 'Jazz Collective SF',
    hostAvatar: 'https://picsum.photos/seed/host5/50/50',
    date: 'Fri, Nov 22',
    time: '8:00 PM',
    location: '123 Rooftop Ave',
    distance: '1.2 mi',
    videoUrl: SAMPLE_VIDEOS[2],
    thumbnailUrl: 'https://picsum.photos/seed/jazz/400/600',
    category: Category.SINGING_DANCING,
    price: 15,
    attendees: 234,
    description: 'Smooth jazz, city views, and craft cocktails.',
    status: 'Published',
    amenities: { hasFood: true, hasAlcohol: true, isFamilyFriendly: false, hasWiFi: false, hasParking: false }
  }
];

export const MOCK_APPLICATIONS: VendorApplication[] = [
  { id: '1', eventId: '1', eventName: 'Summer Music Festival 2024', eventDate: 'Tonight', status: 'Pending', appliedDate: '2 days ago' },
  { id: '2', eventId: '4', eventName: 'Anime Convention 2024', eventDate: 'Nov 25', status: 'Approved', appliedDate: '1 week ago' },
  { id: '3', eventId: '5', eventName: 'Rooftop Jazz', eventDate: 'Nov 22', status: 'Rejected', appliedDate: '3 weeks ago' },
];

export const MOCK_USER = {
    id: 'u1',
    name: 'Alex Designer',
    email: 'alex@unifyr.com',
    avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    role: UserRole.HOST,
    stats: {
        eventsHosted: 12,
        eventsAttended: 45,
        applications: 3
    }
};

export const MOCK_THREADS: Thread[] = [
    {
        id: 't1',
        eventId: '1',
        eventName: 'Summer Music Festival 2024',
        participants: [
            { name: 'Vibe Productions', role: UserRole.HOST, avatar: 'https://picsum.photos/seed/host1/50/50' },
            { name: 'Taco King', role: UserRole.VENDOR, avatar: 'https://picsum.photos/seed/vendor1/50/50' }
        ],
        lastMessage: 'Can we setup at 3PM?',
        lastMessageTime: '10m ago',
        unreadCount: 2
    },
    {
        id: 't2',
        eventId: '2',
        eventName: 'Comedy Night Live',
        participants: [
            { name: 'Laugh Factory', role: UserRole.HOST, avatar: 'https://picsum.photos/seed/host2/50/50' },
            { name: 'Sound Tech', role: UserRole.VENDOR, avatar: 'https://picsum.photos/seed/vendor2/50/50' }
        ],
        lastMessage: 'Microphones are ready.',
        lastMessageTime: '1h ago',
        unreadCount: 0
    }
];

export const MOCK_MESSAGES: Message[] = [
    {
        id: 'm1',
        senderId: 'u2',
        senderName: 'Vibe Productions',
        senderAvatar: 'https://picsum.photos/seed/host1/50/50',
        content: 'Welcome to the team! Here is the layout.',
        timestamp: '9:00 AM',
        type: 'text'
    },
    {
        id: 'm2',
        senderId: 'u2',
        senderName: 'Vibe Productions',
        senderAvatar: 'https://picsum.photos/seed/host1/50/50',
        content: 'Map PDF',
        timestamp: '9:05 AM',
        type: 'logisticCard',
        metadata: { title: 'Venue Map v2', size: '2.4MB' }
    },
    {
        id: 'm3',
        senderId: 'u1',
        senderName: 'Alex Designer',
        senderAvatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
        content: 'Can we setup at 3PM?',
        timestamp: '10:30 AM',
        type: 'text'
    }
];

export const MOCK_UPLOADS: VideoUpload[] = [
    { id: 'v1', fileName: 'promo_reel_final.mp4', posterUrl: 'https://picsum.photos/seed/concert/400/600', duration: '0:45', uploadDate: '2 hours ago', status: 'Ready', progress: 100 },
    { id: 'v2', fileName: 'interview_clip.mov', posterUrl: '', duration: '--:--', uploadDate: 'Just now', status: 'Transcoding', progress: 45 },
    { id: 'v3', fileName: 'b_roll_crowd.mp4', posterUrl: '', duration: '--:--', uploadDate: 'Yesterday', status: 'Error', progress: 0 },
];