import React, { useState } from "react";
import "./EightBall.css";

const EightBall = (props) => {
    const genRandomState = () => {
        return props.answers[Math.floor(Math.random() * props.answers.length)]
    };
    const shakeBall = () => {
        setState(genRandomState());
    }
    const resetBall = () => {
        setState({msg: "Think of a Question", color: "black"})
    }
    const [state, setState] = useState({msg: "Think of a Question", color: "black"})

    return (
        <div>
            <div className="EightBall" onClick={shakeBall} style={{backgroundColor: state.color, color:"white"}}> 
                <h3>{state.msg}</h3>
            </div>
            <button onClick={resetBall}>Reset Magic 8 Ball!</button>
        </div>
    )
}

EightBall.defaultProps = {
    answers: [
        { msg: "It is certain.", color: "green" },
        { msg: "It is decidedly so.", color: "green" },
        { msg: "Without a doubt.", color: "green" },
        { msg: "Yes - definitely.", color: "green" },
        { msg: "You may rely on it.", color: "green" },
        { msg: "As I see it, yes.", color: "green" },
        { msg: "Most likely.", color: "green" },
        { msg: "Outlook good.", color: "green" },
        { msg: "Yes.", color: "green" },
        { msg: "Signs point to yes.", color: "goldenrod" },
        { msg: "Reply hazy, try again.", color: "goldenrod" },
        { msg: "Ask again later.", color: "goldenrod" },
        { msg: "Better not tell you now.", color: "goldenrod" },
        { msg: "Cannot predict now.", color: "goldenrod" },
        { msg: "Concentrate and ask again.", color: "goldenrod" },
        { msg: "Don't count on it.", color: "red" },
        { msg: "My reply is no.", color: "red" },
        { msg: "My sources say no.", color: "red" },
        { msg: "Outlook not so good.", color: "red" },
        { msg: "Very doubtful.", color: "red" },
      ]
}

export { EightBall};