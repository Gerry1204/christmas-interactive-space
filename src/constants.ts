import { Character, SceneType, Song, Gift } from './types';

// Images (Updated to match User's renaming)
import jakeImg from './assets/images/jake.png';
import doraImg from './assets/images/doraemon.png';
import usagiImg from './assets/images/usagi.png';
import snorlaxImg from './assets/images/snorlax.png';
import patrickImg from './assets/images/patrick.png';

// Backgrounds (Updated to match User's renaming)
import bgLab from './assets/images/scene_lab.png';
import bgClass from './assets/images/scene_classroom.png';
import bgHome from './assets/images/scene_home.png';
import bgSnowy from './assets/images/scene_snowy.png';
import bgFantasy from './assets/images/scene_fantasy.png';

// Gift Images
import coneImg from './assets/images/cone.png';
import hatImg from './assets/images/hat.png';
import ramImg from './assets/images/ram.png';
import btcImg from './assets/images/btc.png';
import headphoneImg from './assets/images/headphone.png';
import pillowImg from './assets/images/pillow.png';
import detergentImg from './assets/images/detergent.png';
import tapeImg from './assets/images/tape.png';
import teaImg from './assets/images/tea.png';
import pcImg from './assets/images/computer.png';
import moneyImg from './assets/images/money.png';
import shovelImg from './assets/images/shovel.png';
import gpuImg from './assets/images/gpu.png';
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

// 音樂 (來自 Kevin MacLeod - Creative Commons)
export const SONGS: Song[] = [
  { id: 1, title: "Jingle Bells", url: "https://archive.org/download/Kevin_MacLeod_-_Jingle_Bells/Jingle_Bells.mp3" },
  { id: 2, title: "Deck the Halls", url: "https://archive.org/download/Kevin_MacLeod_-_Deck_the_Halls_B/Deck_the_Halls_B.mp3" },
  { id: 3, title: "We Wish You a Merry Christmas", url: "https://archive.org/download/Kevin_MacLeod_-_We_Wish_You_a_Merry_Christmas/We_Wish_You_a_Merry_Christmas.mp3" },
  { id: 4, title: "Silent Night", url: "https://archive.org/download/Kevin_MacLeod_-_Silent_Night/Silent_Night.mp3" },
  { id: 5, title: "Sugar Plum Fairy", url: "https://archive.org/download/Kevin_MacLeod_-_Dance_of_the_Sugar_Plum_Fairy/Dance_of_the_Sugar_Plum_Fairy.mp3" }
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