import React, { useState } from "react";

function ColorForm({ addColor }) {
    const INITIAL_STATE = {
        color: "#000000",
        name:''
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
        addColor({ ...formData });
        setFormData(INITIAL_STATE);
    }

    return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                    <input
                        id="name"
                        type="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                <label htmlFor="color">color</label>
                    <input
                        id="color"
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />
                <button>Add Color!</button>
            </form>
    )
}

export default ColorForm;