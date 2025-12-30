
export type Language = 'en' | 'zh';

export interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: {
    en: string;
    zh: string;
  };
  timestamp: string;
  likes: number;
}

export interface Issue {
  id: string;
  category: {
    en: string;
    zh: string;
  };
  title: {
    en: string;
    zh: string;
  };
  description: {
    en: string;
    zh: string;
  };
  author: string;
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  expiryDate: string;
  stats: {
    agree: number;
    disagree: number;
    absurd: number;
  };
  comments: Comment[];
}

export enum SwipeDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  UP = 'UP',
  DOWN = 'DOWN',
  NONE = 'NONE'
}
