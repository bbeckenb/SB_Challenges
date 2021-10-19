import React from "react";
import {render, fireEvent} from "@testing-library/react";
import TodoList from "./TodoList";

it("renders without crashing", function() {
    render(<TodoList />);
  });
  
  it("matches snapshot", function() {
    const { asFragment } = render(<TodoList />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("should add new todo", function () {
    const { queryByText, getByLabelText } = render(<TodoList />);
    const input = getByLabelText("Todo");
    const btn = queryByText("Add Todo!");
    expect(queryByText('make pancakes')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'make pancakes' } });
    fireEvent.click(btn);
    expect(queryByText('make pancakes')).toBeInTheDocument();
  })

  it("should delete existing todo", function () {
    const { queryByText, getByLabelText } = render(<TodoList />);
    const input = getByLabelText("Todo");
    const btn = queryByText("Add Todo!");
    expect(queryByText('make pancakes')).not.toBeInTheDocument();
    fireEvent.change(input, { target: { value: 'make pancakes' } });
    fireEvent.click(btn);
    expect(queryByText('make pancakes')).toBeInTheDocument();
    const delBtn = queryByText('X');
    fireEvent.click(delBtn);
    expect(queryByText('make pancakes')).not.toBeInTheDocument();
  })