import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import "../css/login.css"


export default function Barcode() {
    const [text, setText] = useState("");
    const [mode, setMode] = useState("QR");
    const [url, setUrl] = useState("");
    let history = useHistory();

    function handleSubmit(event) {
        event.preventDefault();
        document.getElementById('image').hidden = true;
        let data = {
            mensagem: text,
            tipo: mode
        };
        let accessToken = localStorage.getItem('accessToken');
        api.post("barcode", data, {headers: {'Authorization': 'Bearer ' + accessToken }})
        .then((response) => {
                setUrl(response.config.baseURL + response.data.image);
                document.getElementById('image').hidden = false;
            }, (error) => {
                console.log(error);
            });
    }

    return (
        <body>
            <select id='dropdown' onChange={m => setMode(m.target.value)}>
                <option value="QR">QR code</option>
                <option value="BC">Código de barras</option>
            </select>
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="message" bsSize="large">
                    <label>Mensagem</label>
                    <FormControl
                        autoFocus
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                </FormGroup>
                <Button block bsSize="large" type="submit">
                    Gerar!
                </Button>
            </form>
            <div>
                <img src={url} height='200' hidden={true} id='image'/>
            </div>
        </body>
    )
}
