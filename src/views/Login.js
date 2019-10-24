import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import api from "../services/api"

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  validateToken();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function validateToken() {
    let accessToken = localStorage.getItem('accessToken');
    api.get("users", {
      headers: { 'Authorization': 'Bearer ' + accessToken }
    }).then((response) => {
      history.push('/home');
    }, (error) => {
         console.log(error);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    api.post("auth", {
      email: email,
      password: password
    }).then((response) => {
      localStorage.setItem('accessToken', response.data.accessToken);
      console.log(response);
      history.push('/home')
    }, (error) => {
      console.log(error);
      history.push('/')
    });
  }

  function routeRegister() {
    history.push('/register');
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
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
            value={password}
            onChange={e => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <div>
          <Button block bsSize="large" disabled={!validateForm()} type="submit">
            Entrar
            </Button>
        </div>
      </form>
      <Button onClick={routeRegister}>Cadastrar</Button>
    </div>
  );
}