import React from "react";
import axios from "axios";
import JokeClass from "./JokeClass";
import './JokeList.css';

class JokeListClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {jokes: []};
        this.numJokesToGet = props.numJokesToGet;
        this.getJokes = this.getJokes.bind(this);
        this.vote = this.vote.bind(this);
    }

    async componentDidMount() {
       await this.getJokes();
    }

    async getJokes() {
        let j = [];
        let seenJokes = new Set();
        try {
          while (j.length < this.numJokesToGet) {
            let res = await axios.get("https://icanhazdadjoke.com", {
              headers: { Accept: "application/json" }
            });
            let { status, ...jokeObj } = res.data;
    
            if (!seenJokes.has(jokeObj.id)) {
              seenJokes.add(jokeObj.id);
              j.push({ ...jokeObj, votes: 0 });
            } else {
              console.error("duplicate found!");
            }
          }
          this.setState({jokes: j});
        } catch (e) {
          console.log(e);
        }
    }

    vote(id, delta) {
        let updateVote = this.state.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j));
        this.setState({jokes: updateVote});
    }

    render() {
        if (this.state.jokes.length) {
            let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
          
            return (
              <div className="JokeList">
                <button className="JokeList-getmore" onClick={this.getJokes}>
                  Get New Jokes
                </button>
          
                {sortedJokes.map(j => (
                  <JokeClass text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
                ))}
              </div>
            );
          }
        
          return null;
    }

}

export default JokeListClass;