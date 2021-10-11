const Person = (props) => {
    let voteMsg;
    let nameOut;

    if (props.name.length > 8) {
        nameOut = props.name.slice(0,6);
    } else {
        nameOut = props.name;
    }
    if (props.age >= 18) {
        voteMsg = <h3>Please go vote, {nameOut}!</h3>;
    } else {
        voteMsg = <h3>You must be 18 to vote, {nameOut}</h3>;
    }

    return (
        <div>
            {voteMsg}
            <p>  
                Learn some information about this person's hobbies:
                Hi, my name is {props.name}, I am {props.age} year old!
            </p>
            <h4>My Hobbies:</h4>
            <ul>
                {
                    props.hobbies.map(h => (<li>{h}</li>))
                }
            </ul>
        </div>
    )
}