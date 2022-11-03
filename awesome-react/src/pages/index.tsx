import React from 'react';
import { createContext, useEffect, useState } from 'react';

import { getLatestNews, StoryDto } from '../services/NewsService';
import { Header } from './Header';
import { StoryLine } from './StoryLine';

export const App = () => {
  const [store, setStore] = useState<{ stories: StoryDto[] }>();

  useEffect(() => {
    getLatestNews().then((stories) => setStore({ stories }));
  }, []);

  const onFavClick = (story: StoryDto) => {
    const idx: number = store!.stories.findIndex((it) => it.id === story.id);
    if (idx > -1) {
      const updated = [
        ...store!.stories,
        {
          ...store!.stories[idx],
          selected: true,
        },
      ];
      setStore({ stories: updated });
    }
  };

  return (
    <main>
      <Header />
      <ul className="stories">
        {store &&
          store.stories.map((it, index) => (
            <StoryLine onFavClick={onFavClick} story={it} key={index} />
          ))}
      </ul>
    </main>
  );
};

export default App;
