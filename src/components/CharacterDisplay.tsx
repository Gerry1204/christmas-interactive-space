import React from 'react';
import { Character } from '../types';

interface CharacterDisplayProps {
  character: Character | null;
  position: { x: number; y: number };
  isFloating?: boolean;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character, position, isFloating }) => {
  if (!character) return null;

  return (
    <div
      className="fixed z-50 pointer-events-none transition-transform duration-100 ease-out"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)' // Center the character on cursor
      }}
    >
      <div className={`relative ${isFloating ? 'animate-none scale-105 opacity-90' : 'animate-float'}`}>
        <img
          src={character.imageUrl}
          alt={character.name}
          className={`object-contain drop-shadow-xl ${character.width} transition-all`}
        />
        <div className="absolute -bottom-2 w-full text-center">
          <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
            {character.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CharacterDisplay;