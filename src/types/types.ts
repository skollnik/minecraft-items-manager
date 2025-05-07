export interface Category {
  name: string;
  color: string;
  items?: Item[];
}

export interface Item {
  id: string;
  name: string;
  legacyId?: string;
  categories?: Category[];
}

export interface LanguageMap {
  [key: string]: string;
}

export interface LegacyMap {
  [key: string]: string;
}
