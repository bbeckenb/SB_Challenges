import React from "react";
import { Col, Card } from "react-bootstrap";

function UserCard({ email, firstName, lastName, state }) {
    return (
        <Col xs={12} md={6} lg={4} xxl={3}>
            <Card style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                    <Card.Title>{`${firstName} ${lastName}`}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{`Status: ${state}`}</Card.Subtitle>
                    <Card.Link href={`mailto:${email}`}>{email}</Card.Link>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default UserCard;