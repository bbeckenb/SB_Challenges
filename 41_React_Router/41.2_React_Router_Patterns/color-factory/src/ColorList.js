import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import ColorForm from './ColorForm';

function ColorList({colors, addColor}) {
    const [formVisible, setFormVisible] = useState(false);
    function toggleFormVisible() {
        setFormVisible(!formVisible)
    }
    return (
        <div className="ColorList">
            <button onClick={toggleFormVisible}>Add Color?</button>
            {formVisible ? <ColorForm addColor={addColor} /> : null}
            <ul>
            {colors.map(color => <li><Link to={`/colors/${color.name}`}>{color.name}</Link></li>)}
            </ul>
            
        </div>
    )
}

export default ColorList;