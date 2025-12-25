import { Character, SceneType, Song } from './types';

export const QUOTES = [
  "🎄 聖誕快樂！希望你的程式碼沒有 Bug！",
  "❄️ 天氣好冷，但我的肝還在燃燒 (社畜心聲)。",
  "🎁 你的禮物就是我 (誤)",
  "🛌 想回家躺在床上當一塊馬鈴薯...",
  "🌟 願你的薪水跟聖誕樹一樣高！",
  "🦾 下班了嗎？還沒？那繼續加油。",
  "🎅 Ho Ho Ho! 記得吃飽睡好！",
  "🥺 烏薩奇覺得今天適合喝熱可可。",
  "⚡ 老皮表示：又是冒險的好時間！"
];

// 音樂 placeholder (使用無版權或簡單的音效連結)
export const SONGS: Song[] = [
  { id: 1, title: "Cozy Lo-Fi", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
  { id: 2, title: "Jingle Bell Rock", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
  { id: 3, title: "Silent Night", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" }
];

export const CHARACTERS: Character[] = [
  {
    id: 'jake',
    name: '老皮',
    // 使用者請替換這裡的 URL 為透明背景 PNG
    imageUrl: 'https://placehold.co/200x200/eab308/ffffff?text=Jake', 
    width: 'w-32 md:w-48'
  },
  {
    id: 'usagi',
    name: '烏薩奇',
    // 使用者請替換這裡的 URL 為透明背景 PNG
    imageUrl: 'https://placehold.co/200x200/fef08a/000000?text=Usagi',
    width: 'w-24 md:w-36'
  },
  {
    id: 'hachiware',
    name: '小八',
    // 使用者請替換這裡的 URL 為透明背景 PNG
    imageUrl: 'https://placehold.co/200x200/3b82f6/ffffff?text=Hachi',
    width: 'w-24 md:w-36'
  }
];

export const SCENE_CONFIG = {
  [SceneType.LAB]: {
    bgClass: 'bg-slate-900',
    accentColor: 'text-cyan-400',
    glassClass: 'bg-slate-800/30 border-slate-600/30',
    description: 'Lab 實驗室 (電路風格)'
  },
  [SceneType.CLASSROOM]: {
    bgClass: 'bg-stone-800',
    accentColor: 'text-amber-200',
    glassClass: 'bg-stone-700/30 border-stone-500/30',
    description: '社課教室 (木質調)'
  },
  [SceneType.HOME]: {
    bgClass: 'bg-orange-950',
    accentColor: 'text-red-300',
    glassClass: 'bg-red-900/20 border-red-500/20',
    description: '溫馨家裡 (壁爐感)'
  }
};