import { Character, SceneType, Song, Gift } from './types';

// Images (Updated to match User's renaming)
import jakeImg from './assets/images/老皮.png';
import doraImg from './assets/images/doraemon12.png';
import usagiImg from './assets/images/烏薩奇2.png';
import snorlaxImg from './assets/images/卡比獸.png';
import patrickImg from './assets/images/派大星2.png';

// Backgrounds (Updated to match User's renaming)
import bgLab from './assets/images/scene_研究小間.png';
import bgClass from './assets/images/scene_社課教室.png';
import bgHome from './assets/images/scene_家.png';
import bgSnowy from './assets/images/scene_穿堂.png';
import bgFantasy from './assets/images/scene_操場.png';

// Gift Images
import coneImg from './assets/images/三角錐.jpg';
import hatImg from './assets/images/工地帽.webp';
import ramImg from './assets/images/天價記憶體.jfif';
import btcImg from './assets/images/比特幣.webp';
import headphoneImg from './assets/images/耳機.jpg';
import pillowImg from './assets/images/抱枕.jpeg';
import detergentImg from './assets/images/洗衣粉.jpg';
import tapeImg from './assets/images/修正帶.jfif';
import teaImg from './assets/images/茶包.jpg';
import pcImg from './assets/images/電腦.jpg';
import moneyImg from './assets/images/錢.jfif';
import shovelImg from './assets/images/鏟子.webp';
import gpuImg from './assets/images/顯卡.jpeg';
// Quotes
export const QUOTES = [
  "🎄 聖誕快樂！希望你的程式碼沒有 Bug！",
  "❄️ 天氣好冷，但我的肝還在燃燒 (社畜心聲)。",
  "🎁 你的禮物就是我 (誤)",
  "🛌 想回家躺在床上當一塊馬鈴薯...",
  "🌟 願你的薪水跟聖誕樹一樣高！",
  "🦾 下班了嗎？還沒？那繼續加油。",
  "🎅 Ho Ho Ho! 記得吃飽睡好！",
  "🥺 烏薩奇覺得今天適合喝熱可可。",
  "⚡ 老皮表示：又是冒險的好時間！",
  "🔔 來自神祕訪客的問候：Happy Holidays!",
  "✨ 魔法施展中... 請稍候..."
];
// Random Gifts (Mix of nice and prank items)
export const GIFTS: Gift[] = [
  { id: 'cone', text: "路邊的三角錐", imageUrl: coneImg, description: "不知道誰遺失的，現在歸你了。", isPrank: true },
  { id: 'hat', text: "工地安全帽", imageUrl: hatImg, description: "戴上它，Bug 都砸不到你。", isPrank: true },
  { id: 'ram', text: "天價記憶體", imageUrl: ramImg, description: "這容量... 夠跑 Chrome 了嗎？", isPrank: false },
  { id: 'btc', text: "比特幣 (實體版?)", imageUrl: btcImg, description: "雖然只是圖片，但看起來很值錢。", isPrank: false },
  { id: 'headphone', text: "降噪耳機", imageUrl: headphoneImg, description: "阻隔老闆需求的必備神器。", isPrank: false },
  { id: 'pillow', text: "等身抱枕", imageUrl: pillowImg, description: "今晚不孤單。", isPrank: false },
  { id: 'detergent', text: "強力洗衣粉", imageUrl: detergentImg, description: "連你的黑歷史都能洗白。", isPrank: true },
  { id: 'tape', text: "人生修正帶", imageUrl: tapeImg, description: "可惜塗改不了 Git History。", isPrank: true },
  { id: 'tea', text: "回甘茶包", imageUrl: teaImg, description: "喝一口，繼續加班。", isPrank: true },
  { id: 'pc', text: "頂級電競主機", imageUrl: pcImg, description: "RGB 效能加成 200%。", isPrank: false },
  { id: 'money', text: "一疊鈔票", imageUrl: moneyImg, description: "醒醒吧，這不是真的。", isPrank: true },
  { id: 'shovel', text: "鏟子", imageUrl: shovelImg, description: "自己挖的坑，含淚也要填完。", isPrank: true },
  { id: 'gpu', text: "NVIDIA 顯卡", imageUrl: gpuImg, description: "跑 AI 還是打遊戲？都行！", isPrank: false },
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
    imageUrl: jakeImg,
    width: 'w-32 md:w-48'
  },
  {
    id: 'doraemon',
    name: '哆啦A夢',
    imageUrl: doraImg,
    width: 'w-24 md:w-36'
  },
  {
    id: 'usagi',
    name: '烏薩奇',
    imageUrl: usagiImg,
    width: 'w-24 md:w-36'
  },
  {
    id: 'snorlax',
    name: '卡比獸',
    imageUrl: snorlaxImg,
    width: 'w-32 md:w-56' // Snorlax is big
  },
  {
    id: 'patrick',
    name: '派大星',
    imageUrl: patrickImg,
    width: 'w-24 md:w-36'
  }
];

export const SCENE_CONFIG = {
  [SceneType.LAB]: {
    bgClass: 'bg-slate-900', // Fallback
    bgImage: bgLab,
    accentColor: 'text-cyan-400',
    glassClass: 'bg-slate-800/30 border-slate-600/30',
    description: '研究小間'
  },
  [SceneType.CLASSROOM]: {
    bgClass: 'bg-stone-800', // Fallback
    bgImage: bgClass,
    accentColor: 'text-amber-200',
    glassClass: 'bg-stone-700/30 border-stone-500/30',
    description: '社課教室'
  },
  [SceneType.HOME]: {
    bgClass: 'bg-orange-950', // Fallback
    bgImage: bgHome,
    accentColor: 'text-red-300',
    glassClass: 'bg-red-900/20 border-red-500/20',
    description: '溫馨家裡'
  },
  [SceneType.SNOWY]: {
    bgClass: 'bg-blue-900', // Fallback
    bgImage: bgSnowy,
    accentColor: 'text-blue-200',
    glassClass: 'bg-blue-800/30 border-blue-400/30',
    description: '校園穿堂'
  },
  [SceneType.FANTASY]: {
    bgClass: 'bg-purple-900', // Fallback
    bgImage: bgFantasy,
    accentColor: 'text-pink-300',
    glassClass: 'bg-purple-800/30 border-pink-500/30',
    description: '夜間操場'
  }
};