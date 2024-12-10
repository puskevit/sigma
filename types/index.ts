export interface UserProfile {
  name: string;
  neighborhood: string;
  joinDate: string;
  helpCount: number;
  rating: number;
  helpRadius: number;
  skills: string[];
  recentActivity: { title: string; date: string }[];
  avatar?: string;
}

export interface Request {
  id: string;
  title: string;
  category: string;
  description: string;
  urgency: 'Low' | 'Medium' | 'High';
  user: string;
  userRating: number;
  timestamp: Date;
}

export interface Notification {
  id: string;
  type: 'new_request' | 'request_created' | 'help_offered';
  message: string;
  timestamp: Date;
}

