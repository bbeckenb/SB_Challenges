import React from "react";
import { render } from "@testing-library/react";
import Dog from "./Dog";

it("renders without crashing", function() {
  render(<Dog name="Whiskey" isAdopted={true} />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Dog name="Whiskey" isAdopted={true} />);
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot", function() {
  const { asFragment } = render(<Dog name="Tubby" isAdopted={false} />);
  expect(asFragment()).toMatchSnapshot();
});
