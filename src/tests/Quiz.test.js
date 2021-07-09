import { render, screen } from "@testing-library/react";
import Quiz from "../components/Quiz";

const userLogged = { name: "mimmo", highScore: 1, lastGames: [1] };

test("renders Quiz react component if user is logged", () => {
  render(
    <Quiz user={userLogged} setUser={() => {}} chart={[]} setChart={() => {}} />
  );
  const linkElementTitle = screen.getByText(/Lyrics Quiz Game/i);
  const linkElementName = screen.getByText(`Hello, ${userLogged.name}`);
  const linkElementBtn = screen.getByText(/START QUIZ/i);
  expect(linkElementTitle).toBeInTheDocument();
  expect(linkElementName).toBeInTheDocument();

  expect(linkElementBtn.closest("button")).toBeEnabled();
});

test("renders Quiz react component if user is not logged", () => {
  render(<Quiz user={{}} setUser={() => {}} chart={[]} setChart={() => {}} />);
  const linkElementTitle = screen.getByText(/Lyrics Quiz Game/i);
  const linkElementBtn = screen.getByText(/START QUIZ/i);
  expect(linkElementTitle).toBeInTheDocument();

  expect(linkElementBtn.closest("button")).toBeDisabled();
});
