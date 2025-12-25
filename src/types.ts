export enum SceneType {
  LAB = 'LAB',
  CLASSROOM = 'CLASSROOM',
  HOME = 'HOME',
  SNOWY = 'SNOWY',
  FANTASY = 'FANTASY'
}

export enum LightMode {
  STATIC = 'STATIC',
  RAINBOW = 'RAINBOW',
  BREATHING = 'BREATHING'
}

export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  width: string; // Tailwind class mostly, or explicit px
}

export interface Song {
  id: number;
  title: string;
  url: string;
}