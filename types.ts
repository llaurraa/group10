
export interface CatSkin {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  unlocked: boolean;
}

export interface Item {
  id: string;
  name: string;
  type: 'food' | 'toy' | 'accessory' | 'nest';
  price: number;
  effectValue: number; 
  quantity?: number; // For shop packs (e.g., 5x food)
  icon: string;
}

export interface DailyTask {
  id: string;
  description: string;
  reward: number;
  completed: boolean;
  targetCount: number;
  currentCount: number;
}

export interface SocialPost {
  id: string;
  authorName: string;
  catName: string;
  skinId: string;
  content: string;
  imageUrl?: string; // New: Image attachment
  likes: number;
  timestamp: number;
  isUser: boolean; // Is this the player's post?
}

export interface GameState {
  // User Settings
  isSetup: boolean;
  ownerName: string;
  catName: string;
  birthday: string; // YYYY-MM-DD for fortune context

  // Game Data
  coins: number; // Cat Paws
  catHair: number;
  happiness: number; // No longer capped at 100
  happinessLevel: number; // New: Level 1-6
  inventory: string[]; // IDs of owned skins/nests
  consumables: {
    food: number;
    teaser: number;
    yarn: number;
  };
  equippedSkinId: string;
  equippedAccessoryId: string | null; // New field for accessories
  lastLogin: number; // Timestamp
  lastCheckIn: string; // YYYY-MM-DD
  loginStreak: number;
  catMood: 'happy' | 'neutral' | 'sad' | 'angry'; 
  catHunger: number; // 0-100
  nestLevel: number; // 0: Box, 1: Cushion, 2: Bed
  bowlFull: boolean;
  tasks: DailyTask[];
  
  // Changed from moodHistory to social posts
  myPosts: SocialPost[];
}

export const MOOD_EMOJIS: Record<string, string> = {
  happy: '😺',
  neutral: '🐱',
  sad: '😿',
  angry: '😾',
  excited: '😻'
};
