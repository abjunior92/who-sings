import React, { useCallback, useState, useEffect } from "react";
// api
import { fetchChartTracks } from "./api";
// Styles
import {
  GlobalStyle,
  Container,
  Header1,
  ButtonStart,
  ButtonNext,
  Loader,
  LoaderContainer,
  Score,
  InputName,
  Label
} from "./App.styles";
// Components
import Card from "./components/Card";
// shared
import { createLyrics, generateAnswers } from "./shared/utils";
//other libs
import _ from "lodash";

const TOTAL_QUESTIONS = 5;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [generatedAnswers, setGeneratedAnswers] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [name, setName] = useState("");
  const [restartCard, setRestartCard] = useState(false);

  const handleChartTracks = () => {
    async function makeRequest() {
      try {
        setLoading(true);
        const dataResponse = await fetchChartTracks();
        const qs = createLyrics(dataResponse);
        const ans = generateAnswers(qs, qs[questionNumber]?.artist_id);
        setQuestions(qs);
        setGeneratedAnswers(ans);
      } catch (err) {
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    makeRequest();
  };

  const handleClickUser = (event, artist_id) => {
    const answerVal = event.currentTarget.value;
    const isCorrect = questions[questionNumber]?.artist_id === artist_id;
    if (isCorrect) {
      setScore(score + 1);
    }

    const obj = {
      question: questions[questionNumber]?.lyric,
      answerVal,
      isCorrect
    };
    setUserAnswers(prev => [...prev, obj]);
  };

  const next = timeOut => {
    if (timeOut) {
      setScore(score);
      const obj = {
        question: questions[questionNumber]?.lyric,
        answerVal: "",
        isCorrect: false
      };
      setUserAnswers(prev => [...prev, obj]);
    } else {
      setRestartCard(true);
      if (questionNumber === TOTAL_QUESTIONS - 1) {
        setGameOver(true);
      } else {
        setQuestionNumber(questionNumber + 1);
        setGeneratedAnswers(
          generateAnswers(questions, questions[questionNumber + 1]?.artist_id)
        );
      }
    }
  };

  const startGame = () => {
    handleChartTracks();
    setGameOver(false);
    setScore(0);
    setQuestionNumber(0);
    setUserAnswers([]);
    sessionStorage.setItem("userLogged", name);
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Header1>Lyrics Quiz Game</Header1>
        {gameOver && (
          <>
            <Label htmlFor="fname">Your Name</Label>
            <InputName
              type="text"
              id="fname"
              name="name"
              placeholder="enter your name..."
              autoComplete="off"
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />
          </>
        )}
        {_.isEmpty(questions) && !loading && (
          <ButtonStart disabled={!name} onClick={() => startGame()}>
            Start
          </ButtonStart>
        )}
        {!loading ? (
          <>
            {!gameOver &&
              !_.isEmpty(questions) &&
              !_.isEmpty(generatedAnswers) && (
                <>
                  <Score>
                    {name}
                    {TOTAL_QUESTIONS === userAnswers.length
                      ? " - Final Score: "
                      : " - Score: "}
                    {score}
                  </Score>
                  <Card
                    question={questions[questionNumber]?.lyric}
                    answers={generatedAnswers}
                    handleClick={(e, artist_id) =>
                      handleClickUser(e, artist_id)
                    }
                    userAnswer={
                      userAnswers ? userAnswers[questionNumber] : undefined
                    }
                    questionNumber={questionNumber}
                    total={TOTAL_QUESTIONS}
                    nextQuestion={timeOut => next(timeOut)}
                    restartCard={restartCard}
                    setRestartCard={value => setRestartCard(value)}
                  />
                </>
              )}
            {!gameOver &&
              userAnswers.length === questionNumber + 1 &&
              questionNumber !== TOTAL_QUESTIONS - 1 && (
                <ButtonNext onClick={() => next()}>Next</ButtonNext>
              )}
          </>
        ) : (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}
      </Container>
    </>
  );
};

export default App;
