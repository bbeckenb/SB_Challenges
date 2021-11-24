import React from "react";
import { useHistory } from "react-router-dom";
import { ButtonGroup, Button } from 'react-bootstrap';

function Home() {
    let history = useHistory();

    return (
        <div>
            <h1 style={{ margin: '5px' }}><b><u>Yodlr!</u></b></h1>
            <p>All the jobs in one, convenient place!</p>
            <ButtonGroup>
                <Button style={{backgroundColor:'#21618C'}} onClick={evt => {history.push('/register')}}>Register</Button>
                <Button style={{backgroundColor:'#21618C'}} onClick={evt => {history.push('/admin')}}>Admin Page</Button>
            </ButtonGroup>
        </div>
    )
}

export default Home;