import React, { useState, useEffect } from "react";
import YodlrApi from "./YodlrAPI";
import UserCard from "./users/UserCard";
import { Container, Row } from "react-bootstrap";

function AdminPage() {
    const [users, setUsers] = useState([]);

    async function getUsersList() {
        let usersList = await YodlrApi.getAllUsers();
        setUsers(usersList);
      }
    
      useEffect(() => {
        getUsersList();
      }, [])
      return (
          <Container>
              <h1 style={{ size: '48px', margin: '5px' }}><b><u>Yodlr Users!</u></b></h1>
              <Row>
                {users.map(user => <UserCard key={user.id}
                                             email={user.email} 
                                             firstName={user.firstName}
                                             lastName={user.lastName} 
                                             state={user.state}
                                    />)}
              </Row>
          </Container>
      )
}

export default AdminPage;


