import React, { useState } from "react";
import "./TodoList.css"
import { v4 as uuid } from 'uuid';
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
    const [listOfTodos, updateTodos] = useState([]) 
    function removeTodo(todoId) {
        updateTodos(todos => todos.filter(t => t.id !== todoId))
    }
    function addTodo(newTodo) {
        updateTodos(todos => [...todos, { ...newTodo, id: uuid() }])
    }


    return (
        <div>
            <h1>Make Todos!</h1>
            <NewTodoForm addTodo={addTodo} />
            <div>
            {listOfTodos.map(({id, color, todo}) => <Todo key={id} id={id} color={color} todo={todo} removeTodo={evt => removeTodo(`${id}`)}/>)}
            </div>
            
        </div>
    )
}

export default TodoList;