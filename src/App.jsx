import React, { useEffect, useState } from "react";
import { endpoint, apiKey } from "./api";
import axios from "axios";
import _ from "lodash";

// Styles
import {
  GlobalStyle,
  Container,
  Header1,
  ButtonStart,
  ButtonNext,
  Loader
} from "./App.styles";
// Components
import Card from "./components/Card";

const TOTAL_QUESTIONS = 5;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    handleChartTracks();
  }, []);

  async function fetchChartTracks() {
    return await axios
      .get(`${endpoint.chartTracksGet}`, {
        params: {
          apikey: apiKey,
          country: "IT",
          chart_name: "top",
          page_size: 10,
          page: 1,
          f_has_lyrics: true
        }
      })
      .then(function (response) {
        const resp = response?.data?.message?.body?.track_list;

        const tracks = Promise.resolve(
          _.reduce(
            resp,
            async (acc, t) => {
              const s = await fetchSnippetLyric(t?.track?.track_id);
              return acc.then(async a => {
                return [
                  ...a,
                  {
                    track_id: t?.track?.track_id,
                    artist: t?.track?.artist_name,
                    artist_id: t?.track?.artist_id,
                    lyric_snippet: s
                  }
                ];
              });
            },
            Promise.resolve([])
          )
        );
        return tracks;
      })
      .then(function (response) {
        return response;
      });
  }

  async function fetchSnippetLyric(track_id) {
    return await axios
      .get(`${endpoint.trackSnippetGet}`, {
        params: {
          apikey: apiKey,
          track_id
        }
      })
      .then(function (response) {
        return response?.data?.message?.body?.snippet?.snippet_body;
      });
  }

  const createLyrics = chart => {
    return _.reduce(
      chart,
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
    );
  };

  const generateAnswers = (array, artist_id) => {
    const find = _.find(array, el => {
      return el?.artist_id === artist_id;
    });
    let filter = _.filter(array, el => {
      return el?.artist_id !== artist_id;
    });
    console.log(find, filter);
    filter = [find, ...filter];

    return shuffle(
      _.slice(
        _.reduce(
          filter,
          (acc, t) => {
            return [...acc, t?.artist];
          },
          []
        ),
        0,
        3
      )
    );
  };

  const shuffle = array => [...array].sort(() => Math.random() - 0.5);

  const generateData = chart => {
    return _.slice(shuffle(chart), 0, 5);
  };

  const handleChartTracks = () => {
    async function makeRequest() {
      try {
        // setRequestInvoiceSuggestionDetailsError(null);
        // setRequestInvoiceSuggestionDetailsLoading(true);
        setLoading(true);
        const dataResponse = await fetchChartTracks();
        const data = generateData(dataResponse);
        setQuestions(createLyrics(data));
      } catch (err) {
        setLoading(false);
        // const error = err?.response?.data?.error;
        // setRequestInvoiceSuggestionDetailsLoading(false);
        // error && setRequestInvoiceSuggestionDetailsError(error);
        // handleCloseDrawer();
        // handleErrors(err, true);
      } finally {
        setLoading(false);
        // setRequestInvoiceSuggestionDetailsLoading(false);
      }
    }

    makeRequest();
  };

  const handleClickUser = (event, artist_id) => {
    const answerVal = event.currentTarget.value;
    console.log(answerVal);
    const isCorrect = questions[questionNumber].artist_id === artist_id;
    console.log(isCorrect);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const startGame = () => {
    setGameOver(false);
    setScore(0);
    setQuestionNumber(0);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header1>Lyrics Quiz Game</Header1>
        {!loading ? (
          <>
            {gameOver && (
              <ButtonStart onClick={() => startGame()}>Start</ButtonStart>
            )}
            {!gameOver && !_.isEmpty(questions) && (
              <Card
                question={questions[questionNumber]?.lyric}
                answers={generateAnswers(
                  questions,
                  questions[questionNumber]?.artist_id
                )}
                handleClick={() => {}}
                userAnswer={userAnswers}
                questionNumber={questionNumber}
                total={TOTAL_QUESTIONS}
              />
            )}
          </>
        ) : (
          <Loader />
        )}
      </Container>
    </>
  );
};

export default App;
