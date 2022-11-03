import React, { useContext } from 'react';

import { AppContext } from '../context';

export const StoryLine = (props) => {
  const state = useContext(AppContext);
  const { story } = props;
  const addToFavs = () => {
    state.favs = [
      ...state.favs,
      {
        url: story.url,
        title: story.title,
        details: "",
      },
    ];
    props.onFavClick(story);
  };

  return (
    <li className={story.selected ? "sel" : ""}>
      <h3>{story.title}</h3>
      <p>{story.text}</p>
      <footer>
        <span>{story.score}</span>
        <a href={story.url} target="new">
          Link
        </a>
        <button className={"love"} onClick={addToFavs}>
          ❤️
        </button>
      </footer>
    </li>
  );
};

export default StoryLine;
