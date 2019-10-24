import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import api from "../services/api"

export default function Logout() {

    let history = useHistory();

    function handleClick() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="Logout">
            <button onClick={handleClick} id='logout-button'>Logout</button>
        </div>
    );
}