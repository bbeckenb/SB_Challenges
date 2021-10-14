import "./Pokecard.css"

const Pokecard = (props) => {
    return (
        <div className="Pokecard">
            <h3 className="Pokecard-Name">{props.name}</h3>
            <img className="Pokecard-Img" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.id}.png`} alt=""></img>
            <h4><b>Type:</b> {props.type}</h4>
            <h4><b>Exp:</b> {props.exp}</h4>
        </div>
    )
}

export { Pokecard }