const Tweet = (props) => {
    return (
        <div>
            <h3>Username: {props.username}</h3>
            <h4>Name: {props.name}</h4>
            <h4>Time Created: {props.date}</h4>
            <p>Message: {props.message}</p>
        </div> 
    )
}