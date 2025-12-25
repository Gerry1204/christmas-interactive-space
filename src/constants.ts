import { Character, SceneType, Song } from './types';

// Images
import jakeImg from './assets/images/JaketheDog.png';
import doraImg from './assets/images/doraemon12.png';
import mainImg from './assets/images/main.png';
import secret1Img from './assets/images/517d4ea58fa6c12aca4e035cdbf257b6.jpg';
import secret2Img from './assets/images/7e9b9d24c6541f535f825e2bf2b257aa.webp';

// Backgrounds (Gemini Generated)
import bgLab from './assets/images/Gemini_Generated_Image_4h49m84h49m84h49.png';
import bgClass from './assets/images/Gemini_Generated_Image_jhdzkbjhdzkbjhdz.png';
import bgHome from './assets/images/Gemini_Generated_Image_kf87w9kf87w9kf87.png';
import bgSnowy from './assets/images/Gemini_Generated_Image_mdrcpnmdrcpnmdrc.png';
import bgFantasy from './assets/images/Gemini_Generated_Image_u2hatwu2hatwu2ha.png';

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
    id: 'usagi', // Mapped to main.png as placeholder or specific character
    name: '小可愛',
    imageUrl: mainImg,
    width: 'w-24 md:w-36'
  },
  {
    id: 'secret1',
    name: '神祕訪客 A',
    imageUrl: secret1Img,
    width: 'w-24 md:w-36'
  },
  {
    id: 'secret2',
    name: '神祕訪客 B',
    imageUrl: secret2Img,
    width: 'w-24 md:w-36'
  }
];

export const SCENE_CONFIG = {
  [SceneType.LAB]: {
    bgClass: 'bg-slate-900', // Fallback
    bgImage: bgLab,
    accentColor: 'text-cyan-400',
    glassClass: 'bg-slate-800/30 border-slate-600/30',
    description: 'Lab 實驗室'
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
    description: '冰雪森林'
  },
  [SceneType.FANTASY]: {
    bgClass: 'bg-purple-900', // Fallback
    bgImage: bgFantasy,
    accentColor: 'text-pink-300',
    glassClass: 'bg-purple-800/30 border-pink-500/30',
    description: '夢幻世界'
  }
};