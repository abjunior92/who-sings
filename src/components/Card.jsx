import React from "react";
// Styles
import { Container, ButtonContainer } from "./Card.styles";

const Card = ({
  question,
  answers,
  handleClick,
  userAnswer,
  questionNumber,
  total
}) => {
  console.log(answers);
  return (
    <Container>
      <p>
        Question: {questionNumber + 1} / {total}
      </p>
      <p>{question}</p>
      <div>
        {answers?.map(answer => (
          <ButtonContainer
            key={answer}
            isCorrect={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
          >
            <button
              disabled={userAnswer ? true : false}
              value={answer}
              onClick={e => handleClick(e)}
            >
              <span>{answer}</span>
            </button>
          </ButtonContainer>
        ))}
      </div>
    </Container>
  );
};

export default Card;
