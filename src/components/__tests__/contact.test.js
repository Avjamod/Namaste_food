import { render, screen } from "@testing-library/react";
import Contact from "../Contact";
import "@testing-library/jest-dom";

test("Should load contact page component", () => {
  render(<Contact />);

  const Heading = screen.getByRole("heading");

  expect(Heading).toBeInTheDocument();
});
