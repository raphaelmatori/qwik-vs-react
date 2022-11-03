import { createContext } from 'react';

import { FavStoryDto } from './services/NewsService';

export interface AppContextType {
  favs: FavStoryDto[];
}
export const AppContext = createContext<AppContextType>({ favs: [] });
