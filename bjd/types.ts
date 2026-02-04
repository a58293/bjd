
export type GoddessType = 'HUNDRED' | 'TWELVE';
export type Language = 'zh' | 'en' | 'fr' | 'ar' | 'ja' | 'ko'; 

export interface LocalizedContent {
  name: string;
  title: string;
  flower: string;
  description: string;
  shortDesc: string;
}

export interface Goddess {
  id: string;
  image: string;
  samples?: string[];
  localUrl?: string; 
  pvUrl?: string;    
  shopUrl?: string;  
  color: string;
  type: GoddessType;
  pvDesc?: string;
  translations: Record<Language, LocalizedContent>; 
}
