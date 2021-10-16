import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Toggler from "./Toggler";

it("should start showing", () => {
  const { getByText } =render(<Toggler />);
  const heading = getByText("Hello World");
  expect(heading).toHaveClass('Toggler-text');
  expect(heading).toBeInTheDocument();

  fireEvent.click(getByText('Toggle'));
  expect(heading).not.toBeInTheDocument();
});

