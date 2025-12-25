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
  Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>,
  X: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
};

const App: React.FC = () => {
  // State
  const [scene, setScene] = useState<SceneType>(SceneType.LAB);
  const [lightMode, setLightMode] = useState<LightMode>(LightMode.STATIC);
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [quote, setQuote] = useState<string>("點擊按鈕獲取祝福！");
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const [characterPos, setCharacterPos] = useState({ x: -100, y: -100 }); // Start hidden
  const [isFloating, setIsFloating] = useState(false);

  // Light Control State
  const [brightness, setBrightness] = useState(1.0);
  const [speed, setSpeed] = useState(2.0); // seconds
  const [customColor, setCustomColor] = useState('#fef08a'); // Default warm yellow

  // Mobile Menu State
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    if (isFloating) {
      setCharacterPos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleGlobalClick = (e: React.MouseEvent) => {
    // Ignore clicks on controls (inputs, buttons, selects) to prevent unwanted drops/pickups
    if ((e.target as HTMLElement).closest('button, select, input')) return;

    // Toggle floating state
    if (selectedChar) {
      setIsFloating(!isFloating);
      // Update position immediately on pickup
      if (!isFloating) {
        setCharacterPos({ x: e.clientX, y: e.clientY });
      }
    }
  };

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
      className={`relative min-h-screen w-full transition-all duration-1000 ease-in-out overflow-hidden flex flex-col font-sans text-white ${currentSceneConfig.bgClass} ${isFloating ? 'cursor-none' : ''}`}
      style={{
        backgroundImage: currentSceneConfig.bgImage ? `url(${currentSceneConfig.bgImage})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      onMouseMove={handleGlobalMouseMove}
      onClick={handleGlobalClick}
    >

      {/* Background Audio */}
      <audio ref={audioRef} src={currentSong.url} loop />

      {/* Snowfall Effect */}
      <Snowfall />

      {/* Character Follower (Fixed Overlay) */}
      <CharacterDisplay
        character={selectedChar}
        position={characterPos}
        isFloating={isFloating}
      />

      {/* === MOBILE CONTROLS TOGGLE === */}
      <button
        onClick={() => setShowMobileMenu(true)}
        className="fixed top-4 right-4 z-50 lg:hidden p-3 bg-black/40 backdrop-blur-md border border-white/20 rounded-full text-white shadow-xl hover:bg-black/60 transition-all active:scale-95"
      >
        <Icons.Settings />
      </button>

      {/* === MOBILE FULLSCREEN MENU === */}
      <div className={`fixed inset-0 z-50 bg-black/90 backdrop-blur-xl transition-all duration-300 overflow-y-auto lg:hidden flex flex-col ${showMobileMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'}`}>

        <div className="flex justify-between items-center p-6 border-b border-white/10 sticky top-0 bg-black/50 backdrop-blur-md z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Icons.Settings /> 設定控制台
          </h2>
          <button
            onClick={() => setShowMobileMenu(false)}
            className="p-2 bg-white/10 rounded-full text-white hover:bg-white/20"
          >
            <Icons.X />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-8 pb-32">

          {/* 1. Scene Switcher */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold uppercase tracking-wider text-white/70">場景切換</label>
            <div className="grid grid-cols-2 gap-2">
              {Object.values(SceneType).map((s) => (
                <button
                  key={s}
                  onClick={() => setScene(s)}
                  className={`py-3 px-2 rounded-lg text-xs font-medium transition-all ${scene === s
                    ? 'bg-white text-black shadow-lg font-bold'
                    : 'bg-white/10 text-white/70'
                    }`}
                >
                  {SCENE_CONFIG[s].description}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Character */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold uppercase tracking-wider text-white/70">召喚夥伴</label>
            <select
              className="w-full bg-white/10 border border-white/10 rounded-lg p-3 text-white focus:outline-none"
              onChange={(e) => {
                const char = CHARACTERS.find(c => c.id === e.target.value);
                setSelectedChar(char || null);
                setIsFloating(true);
              }}
              value={selectedChar?.id || ""}
            >
              <option value="">-- 選擇夥伴 --</option>
              {CHARACTERS.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <p className="text-[10px] text-white/40 text-center">* 點選畫面可移動/固定角色 *</p>
          </div>

          {/* 3. Light Controls */}
          <div className="flex flex-col gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
            <label className="text-sm font-bold uppercase tracking-wider text-white/70">燈光氛圍</label>

            <button
              onClick={toggleLightMode}
              className="w-full py-3 rounded-lg text-xs font-bold shadow-md bg-white/10 border border-white/10 text-white"
            >
              {lightMode === LightMode.STATIC ? '模式：單色恆亮' :
                lightMode === LightMode.RAINBOW ? '模式：彩虹閃爍' : '模式：呼吸律動'}
            </button>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-white/60 flex justify-between">亮度 <span>{Math.round(brightness * 100)}%</span></span>
                <input type="range" min="0.2" max="2" step="0.1" value={brightness} onChange={(e) => setBrightness(parseFloat(e.target.value))} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-yellow-400" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-white/60 flex justify-between">速度 <span>{speed}s</span></span>
                <input type="range" min="0.1" max="5" step="0.1" value={speed} onChange={(e) => setSpeed(parseFloat(e.target.value))} className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-400" disabled={lightMode === LightMode.STATIC} style={{ opacity: lightMode === LightMode.STATIC ? 0.3 : 1 }} />
              </div>
            </div>

            {(lightMode !== LightMode.RAINBOW) && (
              <div className="flex gap-2 flex-wrap justify-between mt-2">
                {['#fef08a', '#fda4af', '#93c5fd', '#86efac', '#d8b4fe', '#ffffff'].map(color => (
                  <button
                    key={color}
                    onClick={() => setCustomColor(color)}
                    className={`w-8 h-8 rounded-full border border-white/20 ${customColor === color ? 'ring-2 ring-white scale-110' : ''}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 4. Music */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold uppercase tracking-wider text-white/70">音樂播放</label>
            <div className="flex items-center gap-3 bg-white/5 rounded-xl p-2 pr-3 border border-white/10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-white/10"
              >
                {isPlaying ? <Icons.Pause /> : <Icons.Play />}
              </button>
              <select
                className="flex-1 bg-transparent text-sm text-white focus:outline-none font-bold"
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

          <div className="text-center text-white/30 text-xs font-mono mt-8">
            {formatTime(currentTime)}
          </div>

        </div>
      </div>


      {/* Main Content Container (Tree & Quote) */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-4">

        {/* Quote Bubble */}
        <div className={`mb-8 p-6 rounded-2xl backdrop-blur-md shadow-lg max-w-md text-center transform transition-all hover:scale-105 border border-white/20 bg-white/10`}>
          <p className="text-lg md:text-xl font-medium drop-shadow-md leading-relaxed tracking-wide">
            {quote}
          </p>
        </div>

        {/* Center Scene: Tree Only */}
        <div className="flex flex-col md:flex-row items-end justify-center items-center gap-4">
          <ChristmasTree
            lightMode={lightMode}
            brightness={brightness}
            speed={speed}
            customColor={customColor}
          />
        </div>

      </div>

      {/* --- LEFT SIDEBAR: Scene & Character --- */}
      <div className="hidden lg:flex fixed left-4 top-1/2 transform -translate-y-1/2 z-20 w-64 flex flex-col gap-6">
        <div className={`p-5 rounded-2xl backdrop-blur-xl shadow-2xl border ${currentSceneConfig.glassClass} flex flex-col gap-6 transition-all duration-500`}>

          {/* Scene Switcher */}
          <div className="flex flex-col gap-3">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentSceneConfig.accentColor} flex items-center gap-2 border-b border-white/10 pb-2`}>
              <Icons.Home /> 場景切換
            </label>
            <div className="flex flex-col gap-2">
              {Object.values(SceneType).map((s) => (
                <button
                  key={s}
                  onClick={() => setScene(s)}
                  className={`w-full py-2 px-3 rounded-lg text-xs font-medium text-left transition-all flex items-center justify-between group ${scene === s
                    ? 'bg-white text-black shadow-lg scale-105'
                    : 'bg-black/20 text-white/70 hover:bg-black/40 hover:pl-4'
                    }`}
                >
                  {SCENE_CONFIG[s].description}
                  {scene === s && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>}
                </button>
              ))}
            </div>
          </div>

          {/* Character Selector */}
          <div className="flex flex-col gap-3">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentSceneConfig.accentColor} flex items-center gap-2 border-b border-white/10 pb-2`}>
              <Icons.MessageSquare /> 召喚夥伴
            </label>
            <div className="relative group">
              <select
                className="w-full bg-black/20 border border-white/10 rounded-lg p-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/50 appearance-none cursor-pointer hover:bg-black/30 transition-colors"
                onChange={(e) => {
                  const char = CHARACTERS.find(c => c.id === e.target.value);
                  setSelectedChar(char || null);
                  setIsFloating(true);
                }}
                value={selectedChar?.id || ""}
              >
                <option value="">-- 選擇夥伴 --</option>
                {CHARACTERS.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                ▼
              </div>
            </div>
            {selectedChar && (
              <div className="text-[10px] text-white/50 text-center italic">
                * 點擊畫面任意處可固定/移動 *
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- RIGHT SIDEBAR: Light & Music --- */}
      <div className="hidden lg:flex fixed right-4 top-1/2 transform -translate-y-1/2 z-20 w-72 flex flex-col gap-6">
        <div className={`p-5 rounded-2xl backdrop-blur-xl shadow-2xl border ${currentSceneConfig.glassClass} flex flex-col gap-6 transition-all duration-500`}>

          {/* Light Controls */}
          <div className="flex flex-col gap-2">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentSceneConfig.accentColor} flex items-center gap-2 border-b border-white/10 pb-2`}>
              <Icons.Lightbulb /> 燈光氛圍
            </label>

            <div className="flex flex-col gap-3">
              {/* Mode Switcher */}
              <button
                onClick={toggleLightMode}
                className={`w-full py-2.5 rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-2 mb-1
                  ${lightMode === LightMode.STATIC ? 'bg-white/20 text-yellow-100 ring-1 ring-yellow-400/50' :
                    lightMode === LightMode.RAINBOW ? 'bg-gradient-to-r from-red-500/50 to-blue-500/50 animate-pulse' :
                      'bg-green-500/30 text-green-100 ring-1 ring-green-400/50'}`}
              >
                {lightMode === LightMode.STATIC ? '單色恆亮模式' :
                  lightMode === LightMode.RAINBOW ? '彩虹閃爍模式' : '呼吸律動模式'}
              </button>

              {/* Controls Grid */}
              <div className="flex flex-col gap-4 text-xs text-white/80 bg-black/20 p-3 rounded-lg">

                {/* Brightness */}
                <div className="flex flex-col gap-1.5">
                  <span className="flex justify-between text-[10px] uppercase tracking-wider opacity-70">
                    亮度 <span>{Math.round(brightness * 100)}%</span>
                  </span>
                  <input
                    type="range" min="0.2" max="2" step="0.1"
                    value={brightness}
                    onChange={(e) => setBrightness(parseFloat(e.target.value))}
                    className="accent-yellow-400 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer w-full"
                  />
                </div>

                {/* Speed */}
                <div className="flex flex-col gap-1.5">
                  <span className="flex justify-between text-[10px] uppercase tracking-wider opacity-70">
                    速度 <span>{speed}s</span>
                  </span>
                  <input
                    type="range" min="0.1" max="5" step="0.1"
                    value={speed}
                    onChange={(e) => setSpeed(parseFloat(e.target.value))}
                    className="accent-blue-400 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer w-full"
                    disabled={lightMode === LightMode.STATIC}
                    style={{ opacity: lightMode === LightMode.STATIC ? 0.3 : 1 }}
                  />
                </div>

                {/* Color Picker */}
                {(lightMode !== LightMode.RAINBOW) && (
                  <div className="border-t border-white/10 pt-3 mt-1">
                    <div className="flex gap-2 justify-between items-center">
                      <div className="flex gap-1.5 flex-1 flex-wrap">
                        {['#fef08a', '#fda4af', '#93c5fd', '#86efac', '#d8b4fe', '#ffffff'].map(color => (
                          <button
                            key={color}
                            onClick={() => setCustomColor(color)}
                            className={`w-5 h-5 rounded-full border border-white/20 transition-all hover:scale-125 hover:z-10 shadow-sm ${customColor === color ? 'ring-2 ring-white scale-125 shadow-md z-10' : ''}`}
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                      <div className="relative group">
                        <input
                          type="color"
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/20 p-0 cursor-pointer shadow-sm hover:scale-110 transition-transform"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleRandomQuote}
                className="w-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white py-2 rounded-lg text-[10px] tracking-widest shadow-sm transition-all border border-white/5"
              >
                ✨ 隨機祝福
              </button>
            </div>
          </div>

          {/* Music Player */}
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <label className={`text-xs font-bold uppercase tracking-wider ${currentSceneConfig.accentColor} flex items-center gap-2`}>
              <Icons.Music /> 音樂播放
            </label>
            <div className="flex items-center gap-3 bg-black/20 rounded-xl p-2 pr-3 border border-white/5 hover:bg-black/30 transition-colors">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/20 hover:scale-105 transition-all text-white"
              >
                {isPlaying ? <Icons.Pause /> : <Icons.Play />}
              </button>
              <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
                <span className="text-[10px] text-white/40 uppercase tracking-widest">Now Playing</span>
                <select
                  className="bg-transparent text-xs text-white focus:outline-none font-bold w-full cursor-pointer hover:underline truncate"
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

        {/* Footer Clock - Moved to Right Sidebar */}
        <div className="text-right text-white/40 text-[10px] font-mono tracking-widest px-2">
          {formatTime(currentTime)}
        </div>
      </div>
    </div>
  );
};

export default App;