import React, { useEffect, useState } from "react";
// Styles
import { Container, ButtonContainer, TimerContainer } from "./Card.styles";

const TOT_SECONDS = 10;

const Card = ({
  question,
  answers,
  handleClick,
  userAnswer,
  questionNumber,
  total,
  nextQuestion,
  restartCard,
  setRestartCard,
  className
}) => {
  const [seconds, setSeconds] = useState(TOT_SECONDS);
  const [checked, setChecked] = useState(false);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    if (seconds > 0) {
      setTimer(setTimeout(() => setSeconds(seconds - 1), 1000));
    } else if (seconds === "TIME OUT!") {
      nextQuestion(true);
    } else {
      setSeconds("TIME OUT!");
      clearTimeout(timer);
    }
  }, [seconds]);

  useEffect(() => {
    if (restartCard) {
      setSeconds(TOT_SECONDS);
      setRestartCard(false);
    }
  }, [restartCard]);

  useEffect(() => {
    if (checked) {
      clearTimeout(timer);
      setChecked(false);
    }
  }, [checked]);

  return (
    <Container className={className}>
      <p>
        Question: {questionNumber + 1} / {total}
      </p>
      <p style={{ fontStyle: "italic" }}>{`"${question}"`}</p>
      <div>
        {answers?.map(answer => (
          <ButtonContainer
            key={answer?.artist_id}
            isCorrect={
              userAnswer?.isCorrect &&
              userAnswer?.answerVal === `${answer?.artist_id}`
            }
            userClicked={userAnswer?.answerVal === `${answer?.artist_id}`}
          >
            <button
              className={`${seconds === "TIME OUT!" ? "timeout" : ""}`}
              disabled={userAnswer ? true : false}
              value={answer?.artist_id}
              onClick={e => {
                setChecked(true);
                handleClick(e, answer?.artist_id);
              }}
            >
              <span>{answer?.artist}</span>
            </button>
          </ButtonContainer>
        ))}
      </div>
      <TimerContainer>{seconds}</TimerContainer>
    </Container>
  );
};

export default Card;
