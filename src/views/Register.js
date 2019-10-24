import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Container, Row, Col } from 'reactstrap';
import { useHistory } from 'react-router-dom';

import api from "../services/api"

export default function Resgister() {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    let history = useHistory();

    function validateForm() {
        return (confirm.length > 0 && password.length > 0 && name.length > 0 && lastName.length > 0) && (confirm === password);
    }

    function handleSubmit(event) {
        event.preventDefault();
        api.post("users", {
            firstName: name,
            lastName: lastName,
            email: email,
            password: password
        }).then((response) => {
            history.push('/')
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
                            <FormGroup controlId="email" bsSize="large">
                                <label>Email</label>
                                <FormControl
                                    autoFocus
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
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
                            <FormGroup controlId="confirm" bsSize="large">
                                <label>Confirmar Senha</label>
                                <FormControl
                                    value={confirm}
                                    onChange={e => setConfirm(e.target.value)}
                                    type="password"
                                />
                            </FormGroup>
                            <div>
                                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                                    Cadastrar
                                </Button>
                                <label hidden={!(errorMessage.length > 0)}>{errorMessage}</label>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}