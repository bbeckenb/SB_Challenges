import React, {useState} from React
import "./Toggler.css"

function Toggler() {
    const [isShowing, setIsShowing] = useState(true);
    return (
        <div classname="Toggler">
            <button className="Toggler-btn" onClick={() => setIsShowing(!isShowing)}>
                Toggle</button>
            {isShowing && <h1 className="Toggler-text">Hellow World</h1>}
        </div>
    );
}

export default Toggler;