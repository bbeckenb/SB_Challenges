import React, {useContext, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContext from "../User/UserContext";
import JoblyApi from "../JoblyAPI";
import { Card, CardBody, CardText, CardTitle, ListGroup, ListGroupItem, Button } from 'reactstrap';

function JobCard({id, title, salary, equity, company}) {
    const { applyToJob, alreadyApplied} = useContext(UserContext);
    const [status, setStatus] = useState(alreadyApplied(id));

    async function handleApply() {
        if (alreadyApplied(id)) {
            console.log('here')
            return;
        }
        let out = await applyToJob(id);
        setStatus(true);
        return out
    }

    return (
        <Card>
            <CardBody>
                <CardTitle className="font-weight-bold text-center">{title}</CardTitle>
                <CardText>{company}</CardText>
                <ListGroup>
                    <ListGroupItem>Id: {id}</ListGroupItem>
                    <ListGroupItem>Salary: {salary}</ListGroupItem>
                    <ListGroupItem>Equity: {equity}</ListGroupItem>
                </ListGroup>
                {status ? <h3>Applied!</h3> : <Button onClick={evt => handleApply()} >Apply</Button>}
            </CardBody>
        </Card>
    )
}

export default JobCard;