import React, {useState, useContext} from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from './UserContext';
import {Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button} from 'reactstrap';

function UserEditProfile({ updateUser }) {
    const { currUser } = useContext(UserContext);
    console.log(currUser)
    const INIT_STATE = {firstName: currUser.firstName, lastName: currUser.lastName, email: currUser.email, isAdmin: currUser.isAdmin}
    const [formData, setFormData] = useState(INIT_STATE);
    const [isChecked, setIsChecked] = useState(currUser.isAdmin);
    let history = useHistory();

    
    function handleChange(evt) {
        const {name, value} = evt.target;
        setFormData(currFormData => ({...currFormData, [name]: value}));
    };

    function handleSubmit(evt) {
        evt.preventDefault();
        updateUser(currUser.username, formData);
        setFormData(INIT_STATE);
        history.push('/');
    }

    function handleChangeCheckBox() {
        setFormData(currFormData => ({...currFormData, isAdmin: !isChecked}))
        setIsChecked(!isChecked);
    }

    return (
        <section className="col-md-4">
          <Card>
            <CardBody>
              <CardTitle className="font-weight-bold text-center">
                Sign Up!
              </CardTitle>
              <Form onSubmit={handleSubmit}>
                  <FormGroup>
                      <Label htmlFor="password">Password:</Label>
                      <Input
                          id="password"
                          name="password"
                          placeholder="new password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="firstName">First Name:</Label>
                      <Input
                          id="firstName"
                          name="firstName"
                          placeholder="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="lastName">Last Name:</Label>
                      <Input
                          id="lastName"
                          name="lastName"
                          placeholder="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="email">Email:</Label>
                      <Input
                          id="email"
                          name="email"
                          placeholder="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                      />
                  </FormGroup>
                  <FormGroup>
                      <Label htmlFor="isAdmin">Admin: </Label>
                      <Input
                          id="isAdmin"
                          name="isAdmin"
                          type="checkbox"
                          checked={isChecked}
                          value={formData.isAdmin}
                          onChange={handleChangeCheckBox}
                      />
                  </FormGroup>
                  <Button>Submit</Button>
              </Form>
            </CardBody>
          </Card>
        </section>
      );
}

export default UserEditProfile;