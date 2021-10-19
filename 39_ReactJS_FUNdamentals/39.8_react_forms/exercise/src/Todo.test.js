import React from "react";
import {render} from "@testing-library/react";
import Todo from "./Todo";

it("renders without crashing", function() {
    render(<Todo />);
  });
  
  it("matches snapshot", function() {
    const { asFragment } = render(<Todo />);
    expect(asFragment()).toMatchSnapshot();
  });