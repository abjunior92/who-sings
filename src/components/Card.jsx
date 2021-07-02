import React from "react";
// Styles
import { Container, ButtonContainer } from "./Card.styles";

const Card = ({
  question,
  answers,
  handleClick,
  userAnswer,
  questionNumber,
  total,
  className
}) => {
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
              disabled={userAnswer ? true : false}
              value={answer?.artist_id}
              onClick={e => {
                handleClick(e, answer?.artist_id);
              }}
            >
              <span>{answer?.artist}</span>
            </button>
          </ButtonContainer>
        ))}
      </div>
    </Container>
  );
};

export default Card;
