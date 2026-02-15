
export enum Platform {
  SHUTTERSTOCK = 'Shutterstock',
  ADOBE_STOCK = 'Adobe Stock',
  INSTAGRAM = 'Instagram',
  THAI_MARKET = 'Thai Market',
  CANVA = 'Canva'
}

export enum MarketType {
  EVERGREEN = 'Evergreen',
  SEASONAL = 'Seasonal',
  TREND = 'Trend'
}

export enum ImageStyle {
  REALISTIC = 'Realistic',
  VECTOR = 'Vector',
  ILLUSTRATION = 'Illustration',
  WATERCOLOR = 'Watercolor',
  MINIMAL = 'Minimal'
}

export interface ResearchResult {
  id: string;
  timestamp: number;
  topic: string;
  platform: Platform;
  marketType: MarketType;
  style: ImageStyle;
  title: string;
  description: string;
  keywords: string[];
  tags: string[];
  theme: string;
  commercialAngle: string;
  buyerIntent: string;
  aiPrompt: string;
  isFavorite: boolean;
}

export interface AppSettings {
  language: 'Thai' | 'English';
  defaultStyle: ImageStyle;
  defaultPlatform: Platform;
}
