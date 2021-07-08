import React, { useEffect, useState } from "react";
// api
import { fetchChartTracks } from "../api";
// Styles
import {
  Container,
  ButtonUpper,
  ButtonNext,
  Loader,
  LoaderContainer,
  Score,
  InputName,
  Label,
  Greetings
} from "./Quiz.styles";
import { SectionTitle } from "./common/Common.styles";
// Components
import Card from "./Card";
// shared
import {
  createLyrics,
  generateAnswers,
  userLoggedHighScore,
  userLoggedName
} from "../shared/utils";
//other libs
import _ from "lodash";

const TOTAL_QUESTIONS = 5;

const Quiz = ({ user, setUser, chart, setChart }) => {
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
        setGameOver(false);
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
    setScore(0);
    setQuestionNumber(0);
    setUserAnswers([]);
    if (!user || _.isEmpty(user)) {
      setUser({ name: name });
    }
  };

  const initGame = () => {
    setGameOver(true);
    setScore(0);
    setQuestionNumber(0);
    setUserAnswers([]);
    setQuestions([]);
    setName("");
    setRestartCard(false);
    setGeneratedAnswers([]);
  };

  useEffect(() => {
    if (!userLoggedName()) {
      initGame();
    } else if (gameOver && TOTAL_QUESTIONS === userAnswers.length) {
      setUser({
        ...user,
        highScore:
          score > userLoggedHighScore() ? score : userLoggedHighScore(),
        lastGames: [score, ...(user?.lastGames || [])]
      });
      setChart({ player: user?.name, score: score });
      initGame();
    }
  }, [user, gameOver]);

  const greetings = user?.name;

  const enableStartQuiz = greetings || name;

  const newHighScore =
    TOTAL_QUESTIONS === userAnswers.length && score > userLoggedHighScore();

  return (
    <>
      <Container>
        <SectionTitle>Lyrics Quiz Game</SectionTitle>
        {gameOver &&
          (!greetings ? (
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
          ) : (
            <>
              <Greetings>Hello, {greetings}</Greetings>
            </>
          ))}
        {_.isEmpty(questions) && !loading && (
          <ButtonUpper disabled={!enableStartQuiz} onClick={() => startGame()}>
            Start Quiz
          </ButtonUpper>
        )}
        {!loading ? (
          <>
            {!gameOver &&
              !_.isEmpty(questions) &&
              !_.isEmpty(generatedAnswers) && (
                <>
                  <Score>
                    {newHighScore ? (
                      <>
                        {
                          <span>
                            Congrats {greetings}! New High Score: {score} 🎉
                          </span>
                        }
                      </>
                    ) : (
                      <>
                        {greetings}
                        {TOTAL_QUESTIONS === userAnswers.length
                          ? " - Final Score: "
                          : " - Score: "}
                        {score}
                      </>
                    )}
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
            {!gameOver && userAnswers.length === questionNumber + 1 && (
              <ButtonNext onClick={() => next()}>
                {questionNumber === TOTAL_QUESTIONS - 1 ? "End Game" : "Next"}
              </ButtonNext>
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

export default Quiz;
