import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

function CompanyCard({name, description, handle}) {
    return (
        <Link to={`/companies/${handle}`}>
            <Card>
                <CardBody>
                    <CardTitle className="font-weight-bold text-center">{name}</CardTitle>
                    <CardText className="font-italic">{description}</CardText>
                </CardBody>
            </Card>
        </Link>
    )
}

export default CompanyCard;