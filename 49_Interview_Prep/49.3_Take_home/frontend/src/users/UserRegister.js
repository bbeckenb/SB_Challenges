import React, { useState } from 'react';
import YodlrApi from '../YodlrAPI';
import { Form, Button, Card, Container } from 'react-bootstrap';

function UserRegister() {
    const INIT_STATE = {
                        "email": '',
                        "firstName": '',
                        "lastName": '',
                        }
    const [formData, setFormData] = useState(INIT_STATE);
    
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(currFormData => ({...currFormData, [name]: value}));
        console.log(formData)
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        // try {
        YodlrApi.registerUser(formData)
        // } catch (e) {
        //     console.error('Registration failure:', e);
        // }
    }

    return (
        <Container>
            <Card style={{ width: '52rem', backgroundColor: 'whitesmoke'}}>
                <h1 style={{ margin: '5px' }}><b><u>Register for Yodlr!</u></b></h1>
                <Form onSubmit={handleSubmit} style={{ width: '800px', margin: '10px'}}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="email">Email address</Form.Label>
                        <Form.Control 
                                    id="email"
                                    name="email"
                                    type="email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control 
                                    id="firstName"
                                    name="firstName"
                                    type="firstName" 
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name" />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control 
                                    id="lastName"
                                    name="lastName"
                                    type="lastName" 
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name" />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card>
        </Container>
    )
}

export default UserRegister;

