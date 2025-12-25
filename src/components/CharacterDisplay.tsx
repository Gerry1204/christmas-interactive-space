import React from 'react';
import { Character } from '../types';

interface CharacterDisplayProps {
  character: Character | null;
}

const CharacterDisplay: React.FC<CharacterDisplayProps> = ({ character }) => {
  if (!character) return null;

  return (
    <div className={`
      relative z-20 
      transition-all duration-500 ease-in-out
      animate-float
      mt-4 md:mt-0 md:ml-[-2rem] 
    `}>
      {/* Speech bubble placeholder area if needed */}
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
  );
};

export default CharacterDisplay;