
import { CatSkin, Item, DailyTask, GameState, SocialPost } from './types';

export const INITIAL_CATS: CatSkin[] = [
  {
    id: 'cat_cyber_blue', // ID kept for save file compatibility
    name: '棉花糖 (Marshmallow)',
    description: '圓滾滾、軟綿綿，像雲朵一樣的白貓。',
    price: 0, // Free starter
    imageUrl: '',
    unlocked: true,
  },
  {
    id: 'cat_orange_tabby',
    name: '橘子 (Citrus)',
    description: '十隻橘貓九隻胖，這是最貪吃的那隻。',
    price: 500,
    imageUrl: '',
    unlocked: false,
  },
  {
    id: 'cat_calico',
    name: '招財 (Lucky)',
    description: '身上有著幸運花紋的三色貓。',
    price: 800,
    imageUrl: '',
    unlocked: false,
  },
  {
    id: 'cat_default_white',
    name: '雪球 (Snowball)',
    description: '純淨優雅，像冬天的小雪球。',
    price: 500,
    imageUrl: '', 
    unlocked: false,
  },
  {
    id: 'cat_void_black',
    name: '夜煞 (Night)',
    description: '一團神秘的小黑炭，眼睛亮亮的。',
    price: 600,
    imageUrl: '',
    unlocked: false,
  },
  {
    id: 'cat_grey',
    name: '灰灰 (Ash)',
    description: '溫柔又慵懶，毛色像溫暖的灰毯子。',
    price: 600,
    imageUrl: '',
    unlocked: false,
  },
  {
    id: 'cat_siamese',
    name: '可可 (Coco)',
    description: '臉黑黑的重點色貓咪，很有個性。',
    price: 1500,
    imageUrl: '',
    unlocked: false,
  },
  {
    id: 'cat_golden',
    name: '黃金貓 (Legendary)',
    description: '傳說中的貓咪，全身金光閃閃！(L5 解鎖)',
    price: 99999, // Cannot be bought normally
    imageUrl: '',
    unlocked: false,
  }
];

export const NEST_LEVELS = [
  { id: 0, name: '破舊紙箱', price: 0, description: '貓毛掉落 x1' },
  { id: 1, name: '柔軟坐墊', price: 1000, description: '貓毛掉落 x2 (雙倍!)' },
  { id: 2, name: '豪華貓窩', price: 3000, description: '貓毛掉落 x4 (超量!)' }
];

export const HAPPINESS_UPGRADES = [
  { level: 1, cost: 0, multiplier: 1.0, title: "初級鏟屎官", desc: "掉落率 x1.0" },
  { level: 2, cost: 100, multiplier: 1.5, title: "熟練鏟屎官", desc: "掉落率 x1.5" },
  { level: 3, cost: 500, multiplier: 2.5, title: "資深鏟屎官", desc: "掉落率 x2.5, 解鎖進階占卜" },
  { level: 4, cost: 1500, multiplier: 3.5, title: "貓語溝通師", desc: "掉落率 x3.5" },
  { level: 5, cost: 3500, multiplier: 4.5, title: "貓界至尊", desc: "掉落率 x4.5, 解鎖黃金貓" },
  { level: 6, cost: 5000, multiplier: 5.0, title: "貓神", desc: "掉落率 x5.0 (MAX)" }
];

export const SHOP_ITEMS: Item[] = [
  // Toys
  { id: 'food_pack', name: '美味罐罐 (5入)', type: 'toy', price: 100, effectValue: 30, quantity: 5, icon: '🥫' },
  { id: 'toy_teaser_pack', name: '逗貓棒組 (5入)', type: 'toy', price: 150, effectValue: 20, quantity: 5, icon: '🎣' },
  { id: 'toy_yarn', name: '高級毛線球 (1入)', type: 'toy', price: 50, effectValue: 50, quantity: 1, icon: '🧶' },
  // Accessories
  { id: 'acc_bowtie', name: '紅色領結', type: 'accessory', price: 300, effectValue: 0, icon: '🎀' },
  { id: 'acc_bell', name: '金鈴鐺', type: 'accessory', price: 500, effectValue: 0, icon: '🔔' },
  { id: 'acc_hat', name: '派對帽', type: 'accessory', price: 800, effectValue: 0, icon: '🎉' },
];

export const DAILY_TASKS_TEMPLATE: DailyTask[] = [
  { id: 'task_pet_10', description: '摸摸貓咪', reward: 50, completed: false, targetCount: 5, currentCount: 0 },
  { id: 'task_feed', description: '餵食貓咪', reward: 30, completed: false, targetCount: 1, currentCount: 0 },
  { id: 'task_play', description: '陪貓咪玩', reward: 40, completed: false, targetCount: 1, currentCount: 0 },
];

export const INITIAL_STATE: GameState = {
  // User Settings
  isSetup: false,
  ownerName: '',
  catName: '',
  birthday: '',

  coins: 100,
  catHair: 0,
  happiness: 0,
  happinessLevel: 1, // Start at Level 1
  inventory: ['cat_cyber_blue', 'nest_0'], // Start with Cyber Blue
  equippedSkinId: 'cat_cyber_blue',
  equippedAccessoryId: null,
  // Start with 5 free items
  consumables: {
    food: 5,
    teaser: 5,
    yarn: 0
  },
  lastLogin: Date.now(),
  lastCheckIn: '',
  loginStreak: 0,
  catMood: 'happy',
  catHunger: 50,
  nestLevel: 0,
  bowlFull: false,
  tasks: JSON.parse(JSON.stringify(DAILY_TASKS_TEMPLATE)),
  myPosts: [],
};

export const FORTUNE_TYPES = ['大吉', '中吉', '小吉', '吉', '末吉', '凶'];

// Mock Social Data
export const MOCK_POSTS: SocialPost[] = [
  {
    id: 'm1',
    authorName: '貓奴小美',
    catName: '豆花',
    skinId: 'cat_calico',
    content: '今天豆花一直盯著窗外看，是不是想出去玩了？🐱',
    likes: 42,
    timestamp: Date.now() - 3600000 * 2,
    isUser: false
  },
  {
    id: 'm2',
    authorName: '阿強',
    catName: '老大',
    skinId: 'cat_void_black',
    content: '雖然是黑貓，但在暗處眼睛會發光超帥的！✨',
    likes: 108,
    timestamp: Date.now() - 3600000 * 5,
    isUser: false
  },
  {
    id: 'm3',
    authorName: '罐罐富翁',
    catName: '咪咪',
    skinId: 'cat_default_white',
    content: '今天買了高級貓窩，結果他還是跑去睡紙箱...無言😑',
    likes: 256,
    timestamp: Date.now() - 3600000 * 24,
    isUser: false
  },
  {
    id: 'm4',
    authorName: '橘貓養育員',
    catName: '胖胖',
    skinId: 'cat_orange_tabby',
    content: '有人家的貓也會把逗貓棒咬斷嗎？這已經是第三根了！😅',
    likes: 89,
    timestamp: Date.now() - 3600000 * 26,
    isUser: false
  }
];
