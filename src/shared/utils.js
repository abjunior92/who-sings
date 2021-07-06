import _ from "lodash";

export const userLoggedName = () => {
  const user = JSON.parse(localStorage.getItem("userLogged"));
  return user?.name || false;
};

export const createLyrics = chart => {
  const filter = _.filter(chart, el => {
    return el?.lyric_snippet;
  });
  return shuffle(
    _.reduce(
      filter,
      (acc, t) => {
        return [
          ...acc,
          {
            lyric: t?.lyric_snippet,
            artist_id: t?.artist_id,
            artist: t?.artist
          }
        ];
      },
      []
    )
  );
};

export const generateAnswers = (array, artist_id) => {
  const find = _.find(array, el => {
    return el?.artist_id === artist_id;
  });
  let filter = _.filter(array, el => {
    return el?.artist_id !== artist_id;
  });
  filter = [find, ...filter];

  return shuffle(
    _.slice(
      _.reduce(
        filter,
        (acc, t) => {
          return [...acc, { artist_id: t?.artist_id, artist: t?.artist }];
        },
        []
      ),
      0,
      3
    )
  );
};

export const shuffle = array => {
  let currentIndex = array.length;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }

  return array;
};
