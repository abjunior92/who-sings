import { render, screen } from "@testing-library/react";
import App from "../App";
import { BrowserRouter as Router } from "react-router-dom";

test("renders Play and Chart nav links react link", () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const linkElementPlay = screen.getByText(/Play/i);
  const linkElementChart = screen.getByText(/Chart/i);
  expect(linkElementPlay).toBeInTheDocument();
  expect(linkElementChart).toBeInTheDocument();
});
