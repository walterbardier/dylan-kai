export type Page = 'home' | 'about' | 'music' | 'albums' | 'album-detail' | 'blog' | 'post-detail';
export type Lang = 'es' | 'en';

// export type Navigate = (page: Page, album?: AlbumData, post?: PostData) => void;
export type Navigate = (page: Page, data?: any) => void;

export interface AlbumData {
  id: number;
  title: string;
  year: number;
  cover: string;
  bg: string;
  era: {
    es: string;
    en: string;
  };
  color: string;
  description: {
    es: string;
    en: string;
  };
  songs: string[];
  tags: string[];
  gallery?: string[];
  spotifyLink?: string;
  appleMusicLink?: string;
  youtubeLink?: string;
}

export interface PostData {
  id: number;
  title: {
    en: string;
    es: string;
  };
  excerpt: {
    en: string;
    es: string;
  };
  content: {
    en: string;
    es: string;
  };
  category:string;
  date: string;
  readTime: string;
  albumId?: number;
}