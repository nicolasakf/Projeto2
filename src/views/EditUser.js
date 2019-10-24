import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import api from "../services/api"

export default function EditUser() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let history = useHistory();

    function handleSubmit(event) {
        // debugger;
        let objectUser = new Object();
        if (name.length > 0) {
            objectUser['firstName'] = name;
        }
        if (password.length > 0) {
            objectUser['password'] = password;
        }
        if (lastName.length > 0) {
            objectUser['lastName'] = lastName;
        }
        event.preventDefault();
        api.patch("users", objectUser, {headers: { 'Authorization': 'Bearer ' + localStorage.accessToken }})
        .then((response) => {
            // messagem
        }, (error) => {
            setErrorMessage(error.response.data.message);
        });
    }

    function makePaid(event) {
        event.preventDefault();
        api.patch("users", {permissionLevel: 4}, {headers: { 'Authorization': 'Bearer ' + localStorage.accessToken }})
        .then((response) => {
            localStorage.clear();
            history.push('/');
        }, (error) => {
            setErrorMessage(error.response.data.message);
        });
    }

    return (
        <div className="Login">
            <Container>
                <Row>
                    <Col xs='90'>
                        <form onSubmit={handleSubmit}>
                            <FormGroup controlId="name" bsSize="large">
                                <label>Nome</label>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="lastName" bsSize="large">
                                <label>Sobrenome</label>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="password" bsSize="large">
                                <label>Senha</label>
                                <FormControl
                                    autoFocus
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </FormGroup>
                            <div>
                                <Button block bsSize="large" type="submit">
                                    Alterar!
                                </Button>
                                <label>{errorMessage}</label>
                            </div>
                        </form>
                        <button onClick={makePaid}>Tornar-se Premium!</button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}