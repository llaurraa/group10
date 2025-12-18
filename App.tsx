
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ShoppingBag, ScrollText, Users, PawPrint, Sparkles, RefreshCw, Utensils, Zap, ArrowUpCircle, Heart, User, Check, Edit, Send, Camera, Image as ImageIcon, PackageOpen, Home, Crown, Scroll } from 'lucide-react';
import { GameState, DailyTask, CatSkin, MOOD_EMOJIS, Item, SocialPost } from './types';
import { INITIAL_CATS, SHOP_ITEMS, INITIAL_STATE, DAILY_TASKS_TEMPLATE, NEST_LEVELS, MOCK_POSTS, HAPPINESS_UPGRADES } from './constants';
import { generateCatReaction, generateDailyFortune } from './services/geminiService';
import { Modal } from './components/Modal';
import { CatLoaf } from './components/CatLoaf';
import { Environment } from './components/Environment';
import { YarnIcon } from './components/YarnIcon';
import { TeaserIcon } from './components/TeaserIcon';
import { FoodIcon } from './components/FoodIcon';
import { WardrobeIcon } from './components/WardrobeIcon';
import { PawEffect } from './components/PawEffect';

// --- Helper Components ---
const CurrencyDisplay = ({ coins, catHair, happiness, level }: { coins: number, catHair: number, happiness: number, level: number }) => (
  <div className="flex space-x-2 absolute top-20 left-6 z-20 transition-all duration-300">
    <div className={`bg-white/90 px-2 py-1 rounded-full shadow-lg flex items-center gap-1.5 border ${level >= 5 ? 'border-yellow-500 ring-2 ring-yellow-200' : 'border-pink-300'}`}>
      <div className={`${level >= 5 ? 'animate-pulse' : ''} bg-pink-400 p-1 rounded-full relative`}>
        <Heart size={12} className="text-white fill-current" />
        {level >= 3 && <div className="absolute -top-1 -right-1 text-[8px]">⭐</div>}
      </div>
      <div className="flex flex-col leading-none">
        <span className="font-bold text-[10px] text-pink-400">Lv.{level}</span>
        <span className={`font-bold text-sm text-gray-700`}>{happiness}</span>
      </div>
    </div>
    <div className="bg-white/90 px-2 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-yellow-300">
      <div className="bg-yellow-400 p-1 rounded-full">
        <PawPrint size={12} className="text-white" />
      </div>
      <span className="font-bold text-gray-700 text-sm">{coins}</span>
    </div>
    <div className="bg-white/90 px-2 py-1 rounded-full shadow-lg flex items-center gap-1.5 border border-gray-300">
      <div className="bg-gray-400 p-1 rounded-full">
        <Sparkles size={12} className="text-white" />
      </div>
      <span className="font-bold text-gray-700 text-sm">{catHair}</span>
    </div>
  </div>
);

const InteractButton = ({ icon: Icon, label, onClick, disabled = false, badge, count }: any) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className="flex flex-col items-center justify-center gap-1 active:scale-90 transition-transform disabled:opacity-50 disabled:grayscale relative group"
  >
    <div className="w-14 h-14 bg-white rounded-2xl shadow-[0_4px_0_rgb(0,0,0,0.1)] border-2 border-orange-100 flex items-center justify-center text-orange-500 hover:bg-orange-50 relative">
      <Icon className="w-8 h-8" />
      {count !== undefined && (
        <span className={`absolute -top-2 -right-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white ${count > 0 ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
          x{count}
        </span>
      )}
    </div>
    <span className="text-[10px] font-bold text-gray-600 bg-white/80 px-2 py-0.5 rounded-full">{label}</span>
  </button>
);

const MenuButton = ({ icon: Icon, label, onClick, badge }: any) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-1 p-2 active:scale-95 transition-transform"
  >
    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center relative">
      <Icon className="text-pink-500 w-6 h-6" />
      {badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
          {badge}
        </span>
      )}
    </div>
    <span className="text-[10px] font-bold text-gray-500">{label}</span>
  </button>
);

const SetupScreen = ({ onComplete }: { onComplete: (data: { owner: string, cat: string, birthday: string }) => void }) => {
  const [formData, setFormData] = useState({ owner: '', cat: '', birthday: '' });

  return (
    <div className="absolute inset-0 z-50 bg-pink-50 flex flex-col items-center justify-center p-8 animate-fade-in">
       <div className="mb-8 relative">
         <div className="absolute inset-0 bg-yellow-200 rounded-full blur-xl opacity-50"></div>
         <CatLoaf skinId="cat_orange_tabby" mood="happy" className="w-40 h-40 relative z-10" />
       </div>
       
       <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
         歡迎來到<br/>摸一摸占卜貓
       </h1>
       
       <div className="w-full max-w-xs space-y-4">
         <div>
           <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">怎麼稱呼你呢？</label>
           <input 
             type="text" 
             placeholder="主人暱稱"
             className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
             value={formData.owner}
             onChange={e => setFormData({...formData, owner: e.target.value})}
           />
         </div>
         
         <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">貓咪的名字是？</label>
            <input 
              type="text" 
              placeholder="幫貓貓取個名字"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors"
              value={formData.cat}
              onChange={e => setFormData({...formData, cat: e.target.value})}
            />
         </div>

         <div>
            <label className="block text-xs font-bold text-gray-500 mb-1 ml-1">你的生日 (占卜用)</label>
            <input 
              type="date" 
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-400 focus:outline-none transition-colors text-gray-600"
              value={formData.birthday}
              onChange={e => setFormData({...formData, birthday: e.target.value})}
            />
         </div>

         <button 
           onClick={() => {
             if(formData.owner && formData.cat) onComplete(formData);
             else alert("請填寫名字和貓咪名字喔！");
           }}
           className="w-full bg-pink-500 text-white font-bold py-3.5 rounded-xl shadow-lg hover:bg-pink-600 active:scale-95 transition-all mt-4 flex items-center justify-center gap-2"
         >
           開始養貓 <Check size={20} />
         </button>
       </div>
    </div>
  );
};

export default function App() {
  // --- State ---
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('fortune_cat_save');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Migration for old saves
      if (!parsed.consumables) {
        parsed.consumables = { food: 5, teaser: 5, yarn: 0 };
      }
      if (parsed.happiness === undefined) {
        parsed.happiness = 0; 
      }
      if (parsed.happinessLevel === undefined) {
        parsed.happinessLevel = 1;
      }
      // Migration for new setup fields
      if (parsed.isSetup === undefined) {
        parsed.isSetup = false;
        parsed.ownerName = '';
        parsed.catName = '';
        parsed.birthday = '';
      }
      // Migration for social posts
      if (parsed.myPosts === undefined) {
         parsed.myPosts = [];
      }
      // Migration for accessories
      if (parsed.equippedAccessoryId === undefined) {
        parsed.equippedAccessoryId = null;
      }
      return parsed;
    }
    return INITIAL_STATE;
  });

  // UI State
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [shopTab, setShopTab] = useState<'exchange' | 'skin' | 'clothes' | 'toy' | 'nest'>('exchange');
  
  const [catMessage, setCatMessage] = useState<string>("喵～歡迎回來！");
  const [showCatMessage, setShowCatMessage] = useState(true);
  const [fortuneResult, setFortuneResult] = useState<{title: string, poem: string} | null>(null);
  
  // Social Feed State
  const [feed, setFeed] = useState<SocialPost[]>([]);
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Update clickEffect state to hold content string
  const [clickEffect, setClickEffect] = useState<{x: number, y: number, id: number, content: string}[]>([]);
  const [pawEffects, setPawEffects] = useState<{id: number, x: number, y: number}[]>([]);

  const [isThinking, setIsThinking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Refs
  const effectIdRef = useRef(0);
  const pawIdRef = useRef(0);

  // --- Logic & Effects ---

  // Save game state
  useEffect(() => {
    localStorage.setItem('fortune_cat_save', JSON.stringify(gameState));
  }, [gameState]);

  // Combine mock posts and user posts when social modal opens
  useEffect(() => {
     if (activeModal === 'social') {
        const combined = [...MOCK_POSTS, ...gameState.myPosts].sort((a, b) => b.timestamp - a.timestamp);
        setFeed(combined);
     }
  }, [activeModal, gameState.myPosts]);

  // Check login logic (Neglect & Daily Reset)
  useEffect(() => {
    // Skip logic if not set up
    if (!gameState.isSetup) return;

    const now = Date.now();
    const lastLoginDate = new Date(gameState.lastLogin);
    const currentDate = new Date();
    
    // Check neglect (more than 2 days = 48 hours)
    const hoursSince = (now - gameState.lastLogin) / (1000 * 60 * 60);
    let newMood = gameState.catMood;
    let newMessage = `${gameState.catName || '貓咪'}：喵～${gameState.ownerName || '主人'}歡迎回來！`;
    
    // Happiness Logic: No longer capped, but Neglect still hurts.
    let newHappiness = gameState.happiness;

    if (hoursSince > 48) {
      newMood = 'angry';
      newHappiness = Math.max(0, newHappiness - 50);
      newMessage = "哼！這麼久沒來看我！(幸福度大幅下降)";
    } else if (hoursSince > 24) {
      newMood = 'sad';
      newHappiness = Math.max(0, newHappiness - 20);
      newMessage = "喵... 覺得有點寂寞...";
    }

    // Daily Reset Logic for tasks
    const lastDateStr = lastLoginDate.toISOString().split('T')[0];
    const todayStr = currentDate.toISOString().split('T')[0];

    let newTasks = [...gameState.tasks];

    if (lastDateStr !== todayStr) {
      newTasks = JSON.parse(JSON.stringify(DAILY_TASKS_TEMPLATE));
    }

    setGameState(prev => ({
      ...prev,
      lastLogin: now,
      catMood: newMood,
      happiness: newHappiness,
      tasks: newTasks
    }));
    
    setCatMessage(newMessage);
    setShowCatMessage(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameState.isSetup]);

  const getEquippedCat = () => {
    return INITIAL_CATS.find(c => c.id === gameState.equippedSkinId) || INITIAL_CATS[0];
  };

  const handleSetupComplete = (data: { owner: string, cat: string, birthday: string }) => {
    setGameState(prev => ({
      ...prev,
      isSetup: true,
      ownerName: data.owner,
      catName: data.cat,
      birthday: data.birthday,
      lastLogin: Date.now(),
      happiness: 0,
      happinessLevel: 1
    }));
    setCatMessage(`喵！${data.owner}，請多指教！`);
  };

  const handleTaskProgress = (taskIdPrefix: string, amount: number = 1) => {
    setGameState(prev => {
      const newTasks = prev.tasks.map(t => {
        if (t.id.startsWith(taskIdPrefix) && !t.completed) {
          const newCount = t.currentCount + amount;
          if (newCount >= t.targetCount) {
             return { ...t, currentCount: newCount, completed: true };
          }
          return { ...t, currentCount: newCount };
        }
        return t;
      });
      
      const justCompleted = newTasks.filter(t => t.completed && !prev.tasks.find(pt => pt.id === t.id)?.completed);
      const totalReward = justCompleted.reduce((sum, t) => sum + t.reward, 0);
      
      return {
        ...prev,
        tasks: newTasks,
        coins: prev.coins + totalReward
      };
    });
  };

  const spawnClickEffect = (x: number, y: number, content: string) => {
    const id = effectIdRef.current++;
    setClickEffect(prev => [...prev, { x, y, id, content }]);
    setTimeout(() => {
      setClickEffect(prev => prev.filter(e => e.id !== id));
    }, 1000);
  };

  // --- PAW EFFECT LOGIC ---
  const triggerPaw = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }

    const id = pawIdRef.current++;
    setPawEffects(prev => [...prev, { id, x: clientX, y: clientY }]);
  };

  const removePawEffect = (id: number) => {
    setPawEffects(prev => prev.filter(p => p.id !== id));
  };
  // ------------------------

  const handleTouchCat = async (part: 'head' | 'belly' | 'tail', e: React.MouseEvent) => {
    const rect = (e.target as Element).getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    
    // Multiplier Calculation
    const nestMultiplier = gameState.nestLevel === 0 ? 1 : Math.pow(2, gameState.nestLevel);
    
    // Happiness Level Multiplier
    const currentLevelConfig = HAPPINESS_UPGRADES.find(u => u.level === gameState.happinessLevel) || HAPPINESS_UPGRADES[0];
    const happinessMultiplier = currentLevelConfig.multiplier;

    // Total Multiplier
    const totalMultiplier = nestMultiplier * happinessMultiplier;

    const dropHair = Math.random() > 0.7;
    // Happiness is now uncapped
    let moodUpdate: Partial<GameState> = { happiness: gameState.happiness + 2 };

    if (dropHair) {
      const dropAmount = Math.floor(1 * totalMultiplier);
      spawnClickEffect(x, y, `☁️x${dropAmount}`);
      moodUpdate.catHair = gameState.catHair + dropAmount;
    } else {
      spawnClickEffect(x, y, '❤️');
    }
    
    setGameState(prev => ({ ...prev, ...moodUpdate }));
    handleTaskProgress('task_pet');
    
    if (!isThinking) {
      setIsThinking(true);
      setCatMessage("..."); 
      const response = await generateCatReaction(
        part, 
        gameState.catName || '貓咪', 
        gameState.catMood,
        gameState.ownerName || '主人'
      );
      setCatMessage(response);
      setShowCatMessage(true);
      setIsThinking(false);
      
      if (part === 'head' && gameState.catMood !== 'happy') {
        setGameState(prev => ({ ...prev, catMood: 'happy' }));
      }
    }
  };

  const handleFeed = () => {
    if (gameState.bowlFull) {
       setCatMessage("碗還是滿的喵！");
       return;
    }
    if (gameState.consumables.food <= 0) {
      setCatMessage("沒有罐罐了！去商城買吧～");
      setActiveModal('shop');
      setShopTab('toy');
      return;
    }

    // Fill Bowl
    setGameState(prev => ({ 
      ...prev, 
      consumables: { ...prev.consumables, food: prev.consumables.food - 1 },
      bowlFull: true 
    }));
    
    setCatMessage("有飯飯了！喵～");
    
    // Eat logic after delay
    setTimeout(() => {
       setGameState(prev => ({
         ...prev,
         bowlFull: false,
         catHunger: Math.min(100, prev.catHunger + 30),
         happiness: prev.happiness + 10 // Uncapped
       }));
       setCatMessage("吃飽了！滿足！(幸福度 +10)");
       handleTaskProgress('task_feed');
       // Effect in center of phone
       const phoneRect = document.getElementById('phone-container')?.getBoundingClientRect();
       if(phoneRect) spawnClickEffect(phoneRect.left + phoneRect.width/2, phoneRect.top + phoneRect.height/2, '❤️');
    }, 3000);
  };

  const handlePlay = () => {
     if (isPlaying) return;
     if (gameState.consumables.teaser <= 0) {
        setCatMessage("逗貓棒壞了！去商城買新的吧～");
        setActiveModal('shop');
        setShopTab('toy');
        return;
     }

     setIsPlaying(true);
     setGameState(prev => ({
       ...prev,
       consumables: { ...prev.consumables, teaser: prev.consumables.teaser - 1 }
     }));

     handleTaskProgress('task_play');
     setCatMessage("好玩好玩！(撲)");
     
     const phoneRect = document.getElementById('phone-container')?.getBoundingClientRect();
     if(phoneRect) spawnClickEffect(phoneRect.left + phoneRect.width/2, phoneRect.top + phoneRect.height/2, '❤️');
     
     setTimeout(() => setIsPlaying(false), 2000);
     setGameState(prev => ({ 
       ...prev, 
       coins: prev.coins + 5,
       happiness: prev.happiness + 10 // Uncapped
     }));
  };

  const handleYarn = () => {
    if (isPlaying) return;
    if (gameState.consumables.yarn <= 0) {
      setCatMessage("沒有毛線球了喵...");
      setActiveModal('shop');
      setShopTab('toy');
      return;
    }

    setIsPlaying(true);
    setGameState(prev => ({
      ...prev,
      consumables: { ...prev.consumables, yarn: prev.consumables.yarn - 1 }
    }));

    handleTaskProgress('task_play');
    setCatMessage("毛線球！超開心！喵喵喵！");
    
    const phoneRect = document.getElementById('phone-container')?.getBoundingClientRect();
    if(phoneRect) spawnClickEffect(phoneRect.left + phoneRect.width/2, phoneRect.top + phoneRect.height/2, '❤️');
    
    setTimeout(() => setIsPlaying(false), 2000);
    // Yarn adds 10 happiness
    setGameState(prev => ({ 
      ...prev, 
      coins: prev.coins + 20,
      happiness: prev.happiness + 10 // Uncapped
     }));
  };

  const handleToggleAccessory = () => {
    const ownedAccessories = SHOP_ITEMS
      .filter(item => item.type === 'accessory' && gameState.inventory.includes(item.id))
      .map(item => item.id);
    
    if (ownedAccessories.length === 0) {
      setCatMessage("還沒有買衣服喔！去商城看看吧？");
      setActiveModal('shop');
      setShopTab('clothes');
      return;
    }

    const options = [null, ...ownedAccessories]; // null represents 'no accessory'
    const currentIndex = options.indexOf(gameState.equippedAccessoryId || null);
    const nextIndex = (currentIndex + 1) % options.length;
    const nextAccessory = options[nextIndex];

    setGameState(prev => ({...prev, equippedAccessoryId: nextAccessory}));

    if (nextAccessory) {
        const item = SHOP_ITEMS.find(i => i.id === nextAccessory);
        setCatMessage(`穿上了${item?.name}！`);
    } else {
        setCatMessage("脫掉衣服了，好輕鬆～");
    }
  };

  const handleNestUpgrade = () => {
    setActiveModal('shop');
    setShopTab('nest');
    setCatMessage("去商店看看新貓窩吧！");
  };

  const handleDailyCheckIn = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (gameState.lastCheckIn === todayStr) {
      setCatMessage("今天已經簽到過了喵！");
      return;
    }

    setGameState(prev => ({
      ...prev,
      lastCheckIn: todayStr,
      coins: prev.coins + 100,
      loginStreak: prev.loginStreak + 1
    }));
    setCatMessage("簽到成功！獲得 100 貓掌幣！");
    setActiveModal(null);
  };

  const exchangeHair = () => {
    if (gameState.catHair < 10) {
      alert("貓毛不夠喔！需要10根。");
      return;
    }
    setGameState(prev => ({
      ...prev,
      catHair: prev.catHair - 10,
      coins: prev.coins + 50
    }));
  };

  const upgradeHappinessLevel = () => {
    const nextLevelConfig = HAPPINESS_UPGRADES.find(u => u.level === gameState.happinessLevel + 1);
    if (!nextLevelConfig) return;

    if (gameState.happiness < nextLevelConfig.cost) {
       alert(`幸福度不足！需要 ${nextLevelConfig.cost} 愛心。`);
       return;
    }

    setGameState(prev => {
        let newInventory = [...prev.inventory];
        // Unlock Golden Cat at Level 5
        if (nextLevelConfig.level === 5 && !newInventory.includes('cat_golden')) {
           newInventory.push('cat_golden');
           alert("恭喜！解鎖了「黃金貓」外觀！");
        }

        return {
           ...prev,
           happiness: prev.happiness - nextLevelConfig.cost,
           happinessLevel: nextLevelConfig.level,
           inventory: newInventory
        }
    });
    setCatMessage(`升級成功！現在是 ${nextLevelConfig.title}！`);
  };

  const drawFortune = async () => {
    setIsThinking(true);
    setFortuneResult(null);
    const result = await generateDailyFortune(gameState.ownerName, gameState.birthday, gameState.happinessLevel);
    setFortuneResult(result);
    setIsThinking(false);
  };

  const buyItem = (item: Item | any) => {
    // Handle Nest Upgrades specific logic
    if (item.id.startsWith('nest_')) {
        const level = parseInt(item.id.split('_')[1]);
        if (level <= gameState.nestLevel) return; // Already own better or same
    }

    if (gameState.coins < item.price) {
      alert("錢錢不夠！");
      return;
    }

    setGameState(prev => {
      const newState = { ...prev, coins: prev.coins - item.price };
      
      if (item.type === 'toy') { // Changed food/toy to generic 'toy' type in constants for simplicity, but logic handles ID
         if (item.id === 'food_pack') {
             newState.consumables = { ...newState.consumables, food: newState.consumables.food + (item.quantity || 1) };
         } else if (item.id.includes('yarn')) {
            newState.consumables = { ...newState.consumables, yarn: newState.consumables.yarn + (item.quantity || 1) };
         } else if (item.id.includes('teaser')) {
            newState.consumables = { ...newState.consumables, teaser: newState.consumables.teaser + (item.quantity || 1) };
         }
      } else if (item.id.startsWith('cat_') || item.id.startsWith('acc_')) {
         if (!newState.inventory.includes(item.id)) {
            newState.inventory = [...newState.inventory, item.id];
         }
      } else if (item.id.startsWith('nest_')) {
         const newLevel = parseInt(item.id.split('_')[1]);
         if (!newState.inventory.includes(item.id)) {
            newState.inventory = [...newState.inventory, item.id];
         }
         newState.nestLevel = newLevel;
      }
      return newState;
    });
    alert(`購買成功！${item.name}`);
  };

  // --- Social Logic ---
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = () => {
    if (!postContent.trim()) return;
    
    const newPost: SocialPost = {
      id: `u_${Date.now()}`,
      authorName: gameState.ownerName || '神秘鏟屎官',
      catName: gameState.catName || '貓咪',
      skinId: gameState.equippedSkinId,
      content: postContent,
      imageUrl: postImage || undefined,
      likes: 0,
      timestamp: Date.now(),
      isUser: true
    };

    setGameState(prev => ({
      ...prev,
      myPosts: [newPost, ...prev.myPosts]
    }));
    
    // Optimistic update for UI
    setFeed(prev => [newPost, ...prev]);
    setPostContent('');
    setPostImage(null);
    setCatMessage("發佈成功！喵～");
  };

  const toggleLike = (postId: string) => {
    if (likedPosts.includes(postId)) {
      setLikedPosts(prev => prev.filter(id => id !== postId));
      setFeed(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPosts(prev => [...prev, postId]);
      setFeed(prev => prev.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
      
      // Spawn effect
      const btn = document.getElementById(`like-btn-${postId}`);
      if(btn) {
        const rect = btn.getBoundingClientRect();
        spawnClickEffect(rect.left + 10, rect.top, '❤️');
      }
    }
  };

  // Helper to format time
  const formatTime = (ts: number) => {
    const diff = Date.now() - ts;
    const hours = Math.floor(diff / 3600000);
    if (hours < 1) return '剛剛';
    if (hours < 24) return `${hours}小時前`;
    return '1天前';
  };

  // --- Render Helpers ---
  const currentCat = getEquippedCat();

  // Shop Tabs Config
  const tabs = [
    { id: 'exchange', label: '交易所', icon: Sparkles },
    { id: 'skin', label: '外觀', icon: PawPrint },
    { id: 'clothes', label: '衣服', icon: WardrobeIcon },
    { id: 'toy', label: '玩具', icon: PackageOpen },
    { id: 'nest', label: '貓窩', icon: Home },
  ];

  // Current Level Config
  const currentLevelConfig = HAPPINESS_UPGRADES.find(u => u.level === gameState.happinessLevel) || HAPPINESS_UPGRADES[0];
  const nextLevelConfig = HAPPINESS_UPGRADES.find(u => u.level === gameState.happinessLevel + 1);

  return (
    <div className="relative group">
       {/* --- Physical Buttons (Left) --- */}
       <div className="absolute top-28 -left-[4px] w-[4px] h-8 bg-gray-800 rounded-l-md border-y border-l border-gray-700"></div> {/* Mute */}
       <div className="absolute top-44 -left-[4px] w-[4px] h-16 bg-gray-800 rounded-l-md border-y border-l border-gray-700"></div> {/* Vol Up */}
       <div className="absolute top-64 -left-[4px] w-[4px] h-16 bg-gray-800 rounded-l-md border-y border-l border-gray-700"></div> {/* Vol Down */}

       {/* --- Physical Buttons (Right) --- */}
       <div className="absolute top-52 -right-[4px] w-[4px] h-24 bg-gray-800 rounded-r-md border-y border-r border-gray-700"></div> {/* Power */}

       <div 
        id="phone-container"
        className="w-[402px] h-[874px] bg-pink-50 text-gray-800 relative flex flex-col shadow-[0_0_0_12px_#000000,0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden font-sans rounded-[60px]"
      >
      
      {/* Speaker Grill */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[60px] h-[4px] bg-[#1a1a1a] rounded-full z-[1000] pointer-events-none"></div>

      {/* Dynamic Island - High Z-index to sit on top of Setup Screen */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 w-[126px] h-[36px] bg-black rounded-full z-[1000] pointer-events-none flex items-center justify-between px-4 overflow-hidden shadow-sm">
          {/* Internal reflection/sensor details */}
          <div className="w-16 h-full relative">
             <div className="absolute top-1/2 left-2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#1c1c1e] opacity-40 blur-[1px]"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#111] border border-[#222]/30"></div>
          {/* Subtle reflection on the glass */}
          <div className="absolute top-0 right-4 w-6 h-2 bg-white/5 rounded-full blur-md rotate-12"></div>
      </div>

      {/* --- SETUP SCREEN CHECK --- */}
      {!gameState.isSetup ? (
        <SetupScreen onComplete={handleSetupComplete} />
      ) : (
        <>
          {/* Top Bar - Moved down to top-20 to avoid Island */}
          <CurrencyDisplay coins={gameState.coins} catHair={gameState.catHair} happiness={gameState.happiness} level={gameState.happinessLevel} />
          
          {/* --- Paw Effects Layer --- */}
          {pawEffects.map(paw => (
            <PawEffect 
              key={paw.id} 
              x={paw.x} 
              y={paw.y} 
              onComplete={() => removePawEffect(paw.id)} 
            />
          ))}

          {/* --- Main Game Scene --- */}
          <div className="flex-1 relative w-full h-full bg-orange-50/30 flex flex-col">
            
            {/* Scene Container */}
            <div className="relative w-full h-full flex items-center justify-center mt-8">
               
               {/* Environment Layer (Behind Cat) - z-0 to sit behind */}
               <div className="absolute w-full h-full z-0 flex items-center justify-center pointer-events-none">
                 <Environment nestLevel={gameState.nestLevel} bowlFull={gameState.bowlFull} className="w-full h-full max-w-[380px] scale-110" />
               </div>

               {/* Cat Layer - z-10 to sit in front */}
               <div className={`relative z-10 w-full max-w-[400px] h-96 mt-20 transition-transform duration-500 ${isPlaying ? 'animate-bounce' : 'floating'}`}>
                 <CatLoaf 
                   skinId={currentCat.id} 
                   mood={gameState.catMood} 
                   accessoryId={gameState.equippedAccessoryId}
                   onPartClick={handleTouchCat}
                   className="w-full h-full drop-shadow-2xl"
                 />
                 
                 {/* Name Tag - Above Cat */}
                 <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white/90 px-4 py-1.5 rounded-full text-base font-bold text-gray-700 shadow-sm border-2 border-pink-100 flex items-center gap-1.5 z-20">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
                    {gameState.catName || '貓咪'}
                    {gameState.happinessLevel >= 5 && <Crown size={14} className="text-yellow-500 fill-current" />}
                 </div>

                 {/* Click Effects */}
                 {clickEffect.map(effect => (
                   <div 
                      key={effect.id}
                      className="absolute text-2xl animate-ping pointer-events-none fixed font-bold text-pink-500 drop-shadow-sm"
                      style={{ left: effect.x - 12, top: effect.y - 12, zIndex: 100 }}
                   >
                     {effect.content}
                   </div>
                 ))}
               </div>
               
               {/* Chat Bubble - Static, no bounce */}
               {showCatMessage && (
                <div className="absolute top-24 left-1/2 -translate-x-1/2 z-30 w-72 text-center">
                   <div className="bg-white px-5 py-3 rounded-2xl shadow-xl border-2 border-pink-200 inline-block relative">
                     {/* Little triangle arrow pointing down */}
                     <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-pink-200 rotate-45"></div>
                     <p className="text-gray-700 font-bold text-base relative z-10 bg-white">
                       {isThinking ? <RefreshCw className="animate-spin w-4 h-4 inline" /> : catMessage}
                     </p>
                   </div>
                </div>
               )}

            </div>
          </div>

          {/* --- Interaction Control Bar (Sticky Bottom Area) --- */}
          <div className="bg-white rounded-t-[30px] shadow-[0_-5px_30px_rgba(0,0,0,0.05)] pb-8 pt-6 z-30">
            
            {/* 1. Direct Interactions Row */}
            <div className="flex justify-center gap-4 mb-6 px-4">
              <InteractButton 
                icon={FoodIcon} 
                label="餵食" 
                onClick={(e: React.MouseEvent) => { triggerPaw(e); handleFeed(); }} 
                disabled={gameState.bowlFull}
                count={gameState.consumables.food}
              />
              <InteractButton 
                icon={TeaserIcon} 
                label="逗貓棒" 
                onClick={(e: React.MouseEvent) => { triggerPaw(e); handlePlay(); }} 
                count={gameState.consumables.teaser}
              />
              <InteractButton 
                icon={YarnIcon} 
                label="毛線球" 
                onClick={(e: React.MouseEvent) => { triggerPaw(e); handleYarn(); }} 
                count={gameState.consumables.yarn}
              />
              <InteractButton 
                icon={WardrobeIcon} 
                label="換裝" 
                onClick={(e: React.MouseEvent) => { triggerPaw(e); handleToggleAccessory(); }} 
              />
            </div>

            {/* 2. Menu Row */}
            <div className="border-t border-gray-100 pt-4 grid grid-cols-4 gap-2 px-6 pb-2">
              <MenuButton icon={ScrollText} label="每日占卜" onClick={(e: React.MouseEvent) => { triggerPaw(e); setActiveModal('fortune'); drawFortune(); }} />
              <MenuButton icon={Users} label="貓咪廣場" onClick={(e: React.MouseEvent) => { triggerPaw(e); setActiveModal('social'); }} />
              <MenuButton icon={ShoppingBag} label="貓咪商城" onClick={(e: React.MouseEvent) => { triggerPaw(e); setActiveModal('shop'); }} badge={gameState.catHair >= 10 ? '!' : null} />
              <MenuButton icon={Scroll} label="任務簽到" onClick={(e: React.MouseEvent) => { triggerPaw(e); setActiveModal('tasks'); }} />
            </div>
          </div>

          {/* --- MODALS --- */}

          <Modal isOpen={activeModal === 'fortune'} onClose={() => setActiveModal(null)} title="今日運勢">
            <div className="flex flex-col items-center text-center space-y-4">
               {isThinking && <RefreshCw className="w-10 h-10 animate-spin text-pink-400" />}
               {fortuneResult && !isThinking && (
                 <>
                   <div className="text-4xl font-bold text-red-500 my-2">{fortuneResult.title}</div>
                   <div className="bg-pink-50 p-6 rounded-xl border-2 border-pink-200">
                      <p className="text-lg leading-relaxed font-medium text-gray-700 whitespace-pre-line">
                        {fortuneResult.poem}
                      </p>
                   </div>
                   {gameState.happinessLevel >= 3 && (
                     <div className="text-xs text-yellow-600 font-bold bg-yellow-100 px-2 py-1 rounded-full">
                       ✨ 資深鏟屎官加持：詳細解讀
                     </div>
                   )}
                 </>
               )}
            </div>
          </Modal>

          <Modal isOpen={activeModal === 'tasks'} onClose={() => setActiveModal(null)} title="任務與簽到">
            <div className="space-y-6">
               {/* Checkin Section */}
               <div className="bg-yellow-50 p-4 rounded-2xl flex items-center justify-between">
                 <div>
                   <h3 className="font-bold text-gray-800">每日簽到</h3>
                   <p className="text-xs text-gray-500">連續: {gameState.loginStreak} 天</p>
                 </div>
                 <button 
                   onClick={handleDailyCheckIn}
                   disabled={gameState.lastCheckIn === new Date().toISOString().split('T')[0]}
                   className="bg-yellow-400 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm disabled:bg-gray-300"
                 >
                   {gameState.lastCheckIn === new Date().toISOString().split('T')[0] ? '已領取' : '領取'}
                 </button>
               </div>

               {/* Tasks List */}
               <div className="space-y-3">
                 <h3 className="font-bold text-gray-700 ml-1">今日任務</h3>
                 {gameState.tasks.map(task => (
                    <div key={task.id} className="bg-white p-3 rounded-xl flex justify-between items-center border border-gray-100 shadow-sm">
                      <div>
                        <h4 className="font-bold text-gray-700 text-sm">{task.description}</h4>
                        <div className="text-xs text-gray-400 mt-1">
                          進度: {task.currentCount} / {task.targetCount}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-yellow-500 font-bold text-sm">+{task.reward}</span>
                        {task.completed ? (
                          <span className="text-green-500 font-bold bg-green-100 px-2 py-1 rounded text-xs">完成</span>
                        ) : (
                          <span className="text-gray-400 text-xs bg-gray-100 px-2 py-1 rounded">進行中</span>
                        )}
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </Modal>

          <Modal isOpen={activeModal === 'shop'} onClose={() => setActiveModal(null)} title="貓咪商城">
            
            {/* Currency Header */}
            <div className="grid grid-cols-3 gap-2 mb-4">
               {/* Same Currency Display as before */}
               <div className="bg-pink-50 border border-pink-100 p-2 rounded-xl flex flex-col items-center justify-center shadow-sm relative overflow-hidden">
                 <div className="flex items-center gap-1 mb-1 relative z-10"><Heart size={14} className="text-pink-500 fill-pink-500" /><span className="text-xs text-pink-400 font-bold">幸福度</span></div>
                 <span className="font-bold text-gray-700 relative z-10">{gameState.happiness}</span>
                 {gameState.happinessLevel >= 3 && <div className="absolute -bottom-2 -right-2 text-yellow-200 opacity-50 text-4xl">✨</div>}
              </div>
              <div className="bg-yellow-50 border border-yellow-100 p-2 rounded-xl flex flex-col items-center justify-center shadow-sm">
                 <div className="flex items-center gap-1 mb-1"><div className="bg-yellow-400 p-0.5 rounded-full"><PawPrint size={10} className="text-white" /></div><span className="text-xs text-yellow-600 font-bold">貓幣</span></div>
                 <span className="font-bold text-gray-700">{gameState.coins}</span>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-2 rounded-xl flex flex-col items-center justify-center shadow-sm">
                 <div className="flex items-center gap-1 mb-1"><div className="bg-gray-400 p-0.5 rounded-full"><Sparkles size={10} className="text-white" /></div><span className="text-xs text-gray-500 font-bold">貓毛</span></div>
                 <span className="font-bold text-gray-700">{gameState.catHair}</span>
              </div>
            </div>

            {/* Shop Categories Tabs */}
            <div className="flex justify-between border-b border-gray-200 mb-4 overflow-x-auto no-scrollbar">
              {tabs.map(tab => {
                const Icon = tab.icon;
                const isActive = shopTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setShopTab(tab.id as any)}
                    className={`flex flex-col items-center p-2 min-w-[60px] transition-colors relative ${isActive ? 'text-pink-500' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Icon size={20} />
                    <span className="text-[10px] font-bold mt-1">{tab.label}</span>
                    {isActive && <div className="absolute bottom-0 w-full h-0.5 bg-pink-500 rounded-t-full"></div>}
                  </button>
                )
              })}
            </div>

            <div className="min-h-[300px]">
              {/* --- EXCHANGE TAB --- */}
              {shopTab === 'exchange' && (
                <div className="space-y-4">
                  {/* Happiness Level Upgrade Section */}
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-5 rounded-2xl border border-pink-200 relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10 text-pink-600">
                        <Heart size={80} fill="currentColor" />
                     </div>
                     
                     <div className="flex justify-between items-start mb-3 relative z-10">
                        <div>
                           <div className="text-xs font-bold text-pink-500 mb-1 uppercase tracking-wider">幸福度等級</div>
                           <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                             Lv.{gameState.happinessLevel} {currentLevelConfig.title}
                           </h2>
                           <p className="text-sm text-gray-600 mt-1">{currentLevelConfig.desc}</p>
                        </div>
                        {gameState.happinessLevel >= 5 && <div className="bg-yellow-400 text-white text-xs px-2 py-1 rounded-full font-bold shadow-sm animate-pulse">MAX</div>}
                     </div>

                     {nextLevelConfig ? (
                       <div className="bg-white/80 p-4 rounded-xl backdrop-blur-sm relative z-10">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-xs font-bold text-gray-500">下一級: {nextLevelConfig.title}</span>
                             <span className="text-xs font-bold text-pink-500">{nextLevelConfig.desc}</span>
                          </div>
                          <button 
                            onClick={upgradeHappinessLevel}
                            disabled={gameState.happiness < nextLevelConfig.cost}
                            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-gray-300 text-white font-bold py-3 rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
                          >
                             升級 <span className="text-sm opacity-80">(花費 {nextLevelConfig.cost} 愛心)</span>
                          </button>
                          <div className="text-center mt-2 text-[10px] text-gray-400">
                            目前愛心: {gameState.happiness} / {nextLevelConfig.cost}
                          </div>
                       </div>
                     ) : (
                       <div className="bg-white/60 p-4 rounded-xl text-center text-gray-500 font-bold relative z-10">
                          已達到最高等級！貓生圓滿！
                       </div>
                     )}
                  </div>

                  {/* Standard Exchange */}
                  <div className="bg-gray-100 p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-gray-700 text-sm">貓毛交易所</h3>
                      <p className="text-[10px] text-gray-500">10 貓毛 = 50 貓掌幣</p>
                    </div>
                    <button onClick={exchangeHair} className="bg-gray-800 text-white px-4 py-2 rounded-lg text-xs font-bold disabled:opacity-50" disabled={gameState.catHair < 10}>
                      兌換
                    </button>
                  </div>
                </div>
              )}

              {/* --- SKINS TAB --- */}
              {shopTab === 'skin' && (
                <div className="grid grid-cols-2 gap-3">
                  {INITIAL_CATS.map(cat => {
                     const owned = gameState.inventory.includes(cat.id);
                     const equipped = gameState.equippedSkinId === cat.id;
                     // Hide legendary if not unlocked
                     if (cat.id === 'cat_golden' && !owned) return null;

                     return (
                      <div key={cat.id} className={`p-3 rounded-xl border-2 relative ${equipped ? 'border-pink-500 bg-pink-50' : cat.id === 'cat_golden' ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'}`}>
                        <div className="w-full h-20 flex items-center justify-center bg-white rounded-lg mb-2 overflow-hidden border border-gray-100 relative">
                           {cat.id === 'cat_golden' && <div className="absolute inset-0 bg-yellow-100 animate-pulse opacity-30"></div>}
                           <CatLoaf skinId={cat.id} mood="neutral" className="w-16 h-16" />
                        </div>
                        <h4 className={`font-bold text-xs truncate ${cat.id === 'cat_golden' ? 'text-yellow-600' : ''}`}>{cat.name.split(' (')[0]}</h4>
                        <div className="mt-2 flex justify-between items-center">
                          {!owned ? (
                            <button onClick={() => buyItem(cat)} className="w-full bg-yellow-400 text-white text-xs py-1 rounded font-bold">${cat.price}</button>
                          ) : (
                            <button onClick={() => setGameState(p => ({ ...p, equippedSkinId: cat.id }))} disabled={equipped} className={`w-full text-xs py-1 rounded font-bold ${equipped ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{equipped ? '使用中' : '裝備'}</button>
                          )}
                        </div>
                      </div>
                     );
                  })}
                  {/* Teaser for Golden Cat if not owned */}
                  {!gameState.inventory.includes('cat_golden') && (
                     <div className="p-3 rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center opacity-50">
                        <div className="text-2xl mb-2">🔒</div>
                        <div className="text-[10px] text-center font-bold">隱藏外觀<br/>(L5 解鎖)</div>
                     </div>
                  )}
                </div>
              )}

              {/* --- CLOTHES (Accessory) TAB --- */}
              {shopTab === 'clothes' && (
                 <div className="space-y-3">
                    {SHOP_ITEMS.filter(i => i.type === 'accessory').map(item => {
                       const owned = gameState.inventory.includes(item.id);
                       return (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                               <div className="font-bold text-xs text-gray-800">{item.name}</div>
                               <div className="text-[10px] text-gray-400">可愛裝飾品</div>
                            </div>
                          </div>
                          {owned ? <span className="text-xs font-bold text-gray-400">已擁有</span> : (
                            <button onClick={() => buyItem(item)} className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold">${item.price}</button>
                          )}
                        </div>
                       )
                    })}
                 </div>
              )}

              {/* --- TOYS TAB --- */}
              {shopTab === 'toy' && (
                 <div className="space-y-3">
                    {SHOP_ITEMS.filter(i => i.type === 'toy').map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">
                            {item.id === 'toy_yarn' ? <YarnIcon className="w-6 h-6" /> : 
                             item.id === 'toy_teaser_pack' ? <TeaserIcon className="w-6 h-6" /> :
                             item.id === 'food_pack' ? <FoodIcon className="w-6 h-6" /> :
                             item.icon}
                          </span>
                          <div>
                             <div className="font-bold text-xs text-gray-800">{item.name}</div>
                             <div className="text-[10px] text-gray-400">+{item.quantity || 1} 數量</div>
                          </div>
                        </div>
                        <button onClick={() => buyItem(item)} className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-bold">${item.price}</button>
                      </div>
                    ))}
                 </div>
              )}

              {/* --- NEST TAB (Upgrades) --- */}
              {shopTab === 'nest' && (
                <div className="flex flex-col items-center text-center">
                   {gameState.nestLevel >= 2 ? (
                      <div className="p-8 text-gray-500">
                        <Home size={48} className="mx-auto mb-4 opacity-50" />
                        <h3 className="font-bold text-lg">已達到最高等級！</h3>
                        <p className="text-sm">您的貓咪現在住在城堡裡！</p>
                      </div>
                   ) : (
                     <>
                       {/* Show NEXT level item */}
                       {(() => {
                         const nextLevel = NEST_LEVELS[gameState.nestLevel + 1];
                         const item = { id: `nest_${nextLevel.id}`, name: nextLevel.name, price: nextLevel.price, type: 'nest', icon: '🏠' };
                         return (
                           <div className="bg-white border-2 border-yellow-200 p-6 rounded-2xl shadow-sm w-full">
                              <h3 className="text-gray-500 font-bold text-xs mb-2 uppercase tracking-widest">下一級升級</h3>
                              <div className="text-4xl mb-4">
                                {nextLevel.id === 1 ? '🛋️' : '🏰'}
                              </div>
                              <h2 className="text-xl font-bold text-gray-800 mb-1">{nextLevel.name}</h2>
                              <p className="text-sm text-pink-500 font-bold mb-4">{nextLevel.description}</p>
                              <button onClick={() => buyItem(item)} className="w-full bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-3 rounded-xl shadow-md transition-colors">
                                升級花費 ${nextLevel.price}
                              </button>
                           </div>
                         )
                       })()}
                     </>
                   )}
                   <div className="mt-6 text-left w-full px-2">
                      <h4 className="text-xs font-bold text-gray-400 mb-2">等級說明</h4>
                      {NEST_LEVELS.map((n) => (
                        <div key={n.id} className={`flex justify-between items-center py-2 border-b border-dashed border-gray-200 ${gameState.nestLevel === n.id ? 'text-pink-600 font-bold' : 'text-gray-500'}`}>
                           <span className="text-xs">{n.id === gameState.nestLevel ? '✅ ' : ''}{n.name}</span>
                           <span className="text-[10px]">{n.description}</span>
                        </div>
                      ))}
                   </div>
                </div>
              )}
            </div>
          </Modal>

          <Modal isOpen={activeModal === 'social'} onClose={() => setActiveModal(null)} title="貓咪廣場">
             <div className="space-y-4">
               {/* Post Input */}
               <div className="bg-pink-50 p-4 rounded-2xl flex flex-col gap-2 border border-pink-100">
                  <textarea 
                    placeholder="分享你的貓咪趣事..."
                    className="w-full bg-white rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 resize-none h-20"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  />
                  {/* Image Preview */}
                  {postImage && (
                    <div className="relative w-20 h-20">
                      <img src={postImage} alt="Preview" className="w-full h-full object-cover rounded-lg border border-gray-200" />
                      <button 
                        onClick={() => setPostImage(null)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]"
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-1">
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="text-pink-400 hover:text-pink-600 p-1"
                    >
                      <Camera size={20} />
                    </button>
                    <input 
                       type="file" 
                       ref={fileInputRef} 
                       className="hidden" 
                       accept="image/*"
                       onChange={handleImageSelect}
                    />

                    <button 
                      onClick={handlePostSubmit}
                      disabled={!postContent.trim()}
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1 disabled:opacity-50"
                    >
                      <Send size={12} /> 發佈
                    </button>
                  </div>
               </div>
               
               {/* Feed */}
               <div className="space-y-4 pb-10">
                 <h3 className="font-bold text-gray-500 text-xs ml-1">最新動態</h3>
                 {feed.map((post) => (
                   <div key={post.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="flex items-start gap-3">
                         {/* Avatar - Adjusted for Doodle Style */}
                         <div className="w-10 h-10 bg-yellow-50 rounded-full border border-yellow-100 overflow-hidden shrink-0 flex items-center justify-center relative">
                            {/* Adjusted scale and position to show face */}
                            <div className="w-20 h-20 absolute -top-2">
                               <CatLoaf skinId={post.skinId} mood="happy" className="w-full h-full" />
                            </div>
                         </div>
                         <div className="flex-1">
                            <div className="flex justify-between items-start">
                               <div>
                                  <div className="font-bold text-gray-800 text-sm flex items-center gap-1">
                                    {post.authorName} 
                                    {post.isUser && <span className="bg-pink-100 text-pink-500 text-[10px] px-1 rounded">Me</span>}
                                  </div>
                                  <div className="text-[10px] text-gray-400">貓咪：{post.catName}</div>
                               </div>
                               <span className="text-[10px] text-gray-300">{formatTime(post.timestamp)}</span>
                            </div>
                            <p className="text-gray-600 text-sm mt-2 leading-relaxed whitespace-pre-wrap">{post.content}</p>
                            
                            {/* Post Image */}
                            {post.imageUrl && (
                               <div className="mt-3 rounded-lg overflow-hidden border border-gray-100">
                                  <img src={post.imageUrl} alt="User post" className="w-full h-auto max-h-48 object-cover" />
                               </div>
                            )}
                            
                            <div className="mt-3 flex items-center gap-4">
                               <button 
                                 id={`like-btn-${post.id}`}
                                 onClick={() => toggleLike(post.id)}
                                 className={`flex items-center gap-1 text-xs font-bold transition-colors ${likedPosts.includes(post.id) ? 'text-pink-500' : 'text-gray-400 hover:text-pink-400'}`}
                               >
                                 <Heart size={14} className={likedPosts.includes(post.id) ? 'fill-current' : ''} />
                                 {post.likes}
                               </button>
                            </div>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
             </div>
          </Modal>
        </>
      )}

      </div>
    </div>
  );
}
