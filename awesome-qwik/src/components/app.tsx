import { $, component$, mutable, useContextProvider, useServerMount$, useStore } from '@builder.io/qwik';
import update from 'immutability-helper';

import { AppContext } from '../context';
import { FavStoryDto, getLatestNews, StoryDto } from '../services/NewsService';
import { Header } from './Header';
import { StoryLine } from './StoryLine';

export const App = component$(() => {
  useContextProvider(
    AppContext,
    useStore({
      favs: [] as FavStoryDto[],
    })
  );

  const store = useStore({
    stories: [] as StoryDto[],
  });

  useServerMount$(async () => {
    store.stories = await getLatestNews();
  });

  const onFavClick = $(function (story: StoryDto) {
    const idx = store.stories.findIndex((it) => it.id === story.id);
    if (idx > -1) {
      const updated = update(store.stories, {
        [idx]: (item) => ({ ...item, selected: true }),
      });
      store.stories = updated;
    }
  });

  return (
    <main>
      <Header />
      <ul class="stories">
        {store.stories.map((it) => (
          <StoryLine onFavClick$={onFavClick} story={mutable(it)} />
        ))}
      </ul>
    </main>
  );
});
