import React from "react";
import {render, fireEvent} from "@testing-library/react";
import BoxList from "./BoxList";

it("renders without crashing", function() {
    render(<BoxList />);
  });
  
  it("matches snapshot", function() {
    const { asFragment } = render(<BoxList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should add new box", function () {
    const { queryByText, getByLabelText } = render(<BoxList />);
    const input = getByLabelText("Color");
    const btn = queryByText("Add Box!");
    expect(queryByText('X')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: '#FF0000' } });
    fireEvent.click(btn);
    expect(queryByText('X')).toBeInTheDocument();
  })

  it("should delete existing box", function () {
    const { queryByText } = render(<BoxList />);
    const btn = queryByText("Add Box!");
    expect(queryByText('X')).not.toBeInTheDocument();
    fireEvent.click(btn);
    expect(queryByText('X')).toBeInTheDocument();
    const delBtn = queryByText('X');
    fireEvent.click(delBtn);
    expect(queryByText('X')).not.toBeInTheDocument();
  })