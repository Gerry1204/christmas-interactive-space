import React, { useState, useEffect, useRef } from 'react';
import { SceneType, LightMode, Character, Song } from './types';
import { QUOTES, SONGS, CHARACTERS, SCENE_CONFIG } from './constants';
import Snowfall from './components/Snowfall';
import ChristmasTree from './components/ChristmasTree';
import CharacterDisplay from './components/CharacterDisplay';

// SVG Icons
const Icons = {
  Music: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
  Lightbulb: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-1 1.5-2 1.5-3.5A6 6 0 0 0 6 8c0 1 .5 2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>,
  MessageSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  Home: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  Play: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3" /></svg>,
  Pause: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>,
};

const App: React.FC = () => {
  // State
  const [scene, setScene] = useState<SceneType>(SceneType.LAB);
  const [lightMode, setLightMode] = useState<LightMode>(LightMode.STATIC);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [quote, setQuote] = useState<string>("點擊按鈕獲取祝福！");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Audio State
  const [currentSong, setCurrentSong] = useState<Song>(SONGS[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Constants based on current scene
  const currentSceneConfig = SCENE_CONFIG[scene];

  // Effects
  useEffect(() => {
    // Clock tick
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Audio control
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn("Autoplay prevented:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  // Handlers
  const handleRandomQuote = () => {
    const random = QUOTES[Math.floor(Math.random() * QUOTES.length)];
    setQuote(random);
  };

  const toggleLightMode = () => {
    const modes = Object.values(LightMode);
    const nextIndex = (modes.indexOf(lightMode) + 1) % modes.length;
    setLightMode(modes[nextIndex]);
  };

  const formatTime = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  return (
    <div
      className={`relative min-h-screen w-full transition-all duration-1000 ease-in-out overflow-hidden flex flex-col font-sans text-white ${currentSceneConfig.bgClass}`}
      style={{
        backgroundImage: currentSceneConfig.bgImage ? `url(${currentSceneConfig.bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >

      {/* Background Audio */}
      <audio ref={audioRef} src={currentSong.url} loop />

      {/* Snowfall Effect */}
      <Snowfall />

      {/* Main Content Container */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-4">

        {/* Quote Bubble */}
        <div className={`mb-8 p-6 rounded-2xl backdrop-blur-md shadow-lg max-w-md text-center transform transition-all hover:scale-105 border border-white/20 bg-white/10`}>
          <p className="text-lg md:text-xl font-medium drop-shadow-md leading-relaxed tracking-wide">
            {quote}
          </p>
        </div>

        {/* Center Scene: Tree + Character */}
        <div className="flex flex-col md:flex-row items-end justify-center items-center gap-4">
          <ChristmasTree lightMode={lightMode} />
          <CharacterDisplay character={selectedChar} />
        </div>

      </div>

      {/* Controls Area - Glassmorphism */}
      <div className="relative z-20 w-full p-6 pb-12 md:pb-6">
        <div className={`max-w-4xl mx-auto rounded-3xl backdrop-blur-xl shadow-2xl p-6 border ${currentSceneConfig.glassClass}`}>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Scene Switcher */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-bold uppercase tracking-wider ${currentSceneConfig.accentColor} flex items-center gap-2`}>
                <Icons.Home /> 場景切換
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.values(SceneType).map((s) => (
                  <button
                    key={s}
                    onClick={() => setScene(s)}
                    className={`flex-1 min-w-[60px] py-2 px-1 rounded-lg text-xs font-medium transition-all ${scene === s
                      ? 'bg-white text-black shadow-lg scale-105'
                      : 'bg-black/30 text-white/70 hover:bg-black/50'
                      }`}
                  >
                    {SCENE_CONFIG[s].description}
                  </button>
                ))}
              </div>
            </div>

            {/* Character Selector */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-bold uppercase tracking-wider ${currentSceneConfig.accentColor} flex items-center gap-2`}>
                <Icons.MessageSquare /> 召喚夥伴
              </label>
              <select
                className="w-full bg-black/30 border border-white/10 rounded-lg p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50"
                onChange={(e) => {
                  const char = CHARACTERS.find(c => c.id === e.target.value);
                  setSelectedChar(char || null);
                }}
                value={selectedChar?.id || ""}
              >
                <option value="">-- 選擇夥伴 --</option>
                {CHARACTERS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* Interactive Actions */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-bold uppercase tracking-wider ${currentSceneConfig.accentColor} flex items-center gap-2`}>
                <Icons.Lightbulb /> 互動控制
              </label>
              <div className="flex gap-2">
                <button
                  onClick={toggleLightMode}
                  className="flex-1 bg-gradient-to-r from-yellow-500/80 to-orange-500/80 hover:from-yellow-400 hover:to-orange-400 py-2 rounded-lg text-xs font-bold shadow-lg transition-transform active:scale-95"
                >
                  切換燈光
                </button>
                <button
                  onClick={handleRandomQuote}
                  className="flex-1 bg-gradient-to-r from-pink-500/80 to-purple-500/80 hover:from-pink-400 hover:to-purple-400 py-2 rounded-lg text-xs font-bold shadow-lg transition-transform active:scale-95"
                >
                  隨機祝福
                </button>
              </div>
            </div>

            {/* Music Player */}
            <div className="flex flex-col gap-2">
              <label className={`text-sm font-bold uppercase tracking-wider ${currentSceneConfig.accentColor} flex items-center gap-2`}>
                <Icons.Music /> 音樂播放
              </label>
              <div className="flex items-center gap-2 bg-black/30 rounded-lg p-1 pr-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? <Icons.Pause /> : <Icons.Play />}
                </button>
                <select
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                  value={currentSong.id}
                  onChange={(e) => {
                    const song = SONGS.find(s => s.id === Number(e.target.value));
                    if (song) {
                      setCurrentSong(song);
                      setIsPlaying(true);
                    }
                  }}
                >
                  {SONGS.map(s => (
                    <option key={s.id} value={s.id} className="text-black">{s.title}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Clock */}
        <div className="text-center mt-6 text-white/40 text-xs font-mono tracking-widest">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default App;