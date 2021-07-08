import _ from "lodash";

export const userLoggedName = () => {
  const user = JSON.parse(localStorage.getItem("userLogged"));
  return user?.name || false;
};

export const userLoggedHighScore = () => {
  const user = JSON.parse(localStorage.getItem("userLogged"));
  return user?.highScore || 0;
};

export const userLoggedLastGames = () => {
  const user = JSON.parse(localStorage.getItem("userLogged"));
  return user?.lastGames || false;
};

export const getChartBestPlayers = () => {
  const bests = JSON.parse(localStorage.getItem("bestPlayers"));
  return (
    _.orderBy(
      bests,
      p => {
        return p.score;
      },
      "desc"
    ) || false
  );
};

export const tracksMaxLastGames = user => {
  if (user?.lastGames?.length > 10) {
    user.lastGames = _.slice(user.lastGames, 0, 5);
  }
  return user;
};

export const getUserDataIfExist = user => {
  const bests = JSON.parse(localStorage.getItem("bestPlayers"));
  const findUser = _.find(bests, u => {
    return u?.player === user?.name;
  });

  if (findUser) {
    user.name = findUser.player;
    user.highScore =
      user.highScore > findUser.score ? user.highScore : findUser.score;
  }

  return user;
};

export const addToChartBestPlayers = (player, setBestPlayer) => {
  let bests = JSON.parse(localStorage.getItem("bestPlayers"));
  if (_.isEmpty(bests) || !player || _.isEmpty(player)) {
    return false;
  } else {
    const foundUser = _.find(bests, p => {
      return p?.player === player?.player;
    });
    const foundUserIndex = _.findIndex(bests, p => {
      return p?.player === player?.player;
    });
    const changedHighScore = foundUser
      ? foundUser.score < player.score
        ? true
        : false
      : false;

    if (changedHighScore) {
      bests[foundUserIndex].score = player?.score;
      setBestPlayer([...bests]);
    } else if (foundUserIndex !== -1) {
      setBestPlayer([...bests]);
    } else {
      setBestPlayer([...bests, player]);
    }
  }
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
