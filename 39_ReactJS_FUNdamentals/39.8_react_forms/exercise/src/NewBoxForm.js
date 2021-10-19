import React, { useState } from "react";
import "./NewBoxForm.css"

function NewBoxForm({ addBox }) {
    const INITIAL_STATE = {
        color: "#000000",
        height: 75,
        width: 75,
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
        addBox({ ...formData });
        setFormData(INITIAL_STATE);
    }

    return (
            <form onSubmit={handleSubmit}>
                <label htmlFor="color">Color</label>
                    <input
                        id="color"
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                    />
                <label htmlFor="height">Height:{formData.height}</label>
                    <input
                        id="height"
                        type="range"
                        name="height"
                        min="50"
                        max="200"
                        value={formData.height}
                        onChange={handleChange}
                    />
                <label htmlFor="width">Width:{formData.width}</label>
                    <input
                        id="width"
                        type="range"
                        name="width"
                        min="50"
                        max="200"
                        value={formData.width}
                        onChange={handleChange}
                    />
                <button>Add Box!</button>
            </form>
    )
}

export default NewBoxForm;