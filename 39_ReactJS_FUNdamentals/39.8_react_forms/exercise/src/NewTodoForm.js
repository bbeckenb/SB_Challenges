import React, { useState } from "react";


function NewTodoForm({ addTodo }) {
    const INITIAL_STATE = {
        todo: "",
        color: "#00FF00"
    }
    const [formData, setFormData] = useState(INITIAL_STATE);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({ ...formData });
        setFormData(INITIAL_STATE);
    }

    return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="todo">Todo</label>
                    <input
                        id="todo"
                        type="text"
                        name="todo"
                        value={formData.todo}
                        onChange={handleChange}
                    />
                <label htmlFor="color">Color</label>
                    <input
                        id="color"
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />

                <button>Add Todo!</button>
            </form>
    )
}

export default NewTodoForm;