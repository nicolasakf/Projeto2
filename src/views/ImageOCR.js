import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import "../css/login.css"


export default function ImageOCR() {
    const [text, setText] = useState("");
    let history = useHistory();

    function convert() {
        document.getElementById('loader').hidden = false;
        const data = new FormData();
        let file = document.getElementById('myFile').files[0];
        data.append('file', file, file.name);
        let language = document.getElementById('dropdown-language').value;
        data.append('language', language);
        let accessToken = localStorage.getItem('accessToken')
        api.post("ocr",
            data,
            {
                headers: { 'Authorization': 'Bearer ' + accessToken, 'Content-Type': `multipart/form-data; boundary=${data._boundary}` }
            }).then((response) => {
                setText(response.data.text);
                document.getElementById('loader').hidden = true;
            }, (error) => {
                console.log(error);
            });
    }

    function copyToClipboard() {
        let el = document.createElement('copiedText');
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    function routeHistory() {
        history.push('/app1/history')
    }

    return (
        <div className='container'>
            <div className='container'>
                <h1>Escolha uma imagem para ser convertida em texto</h1>
                <input type="file" id="myFile" />
                <h2>Escolha uma língua</h2>
                <select id="dropdown-language">
                    <option value="POR">Português</option>
                    <option value="ENG">Inglês</option>
                    <option value="FRA">Francês</option>
                    <option value="DEU">Alemão</option>
                    <option value="EPO">Esperanto</option>
                    <option value="TGL">Tagalog</option>
                </select>
                <div className='container'>
                    <button onClick={convert}>Converter!</button>
                </div>
                <div>
                    <img src={require('../static/loader.gif')} height='100' hidden={true} id='loader' />
                </div>
                <div>
                    <label>{text}</label>
                </div>
                <div>
                    <button onClick={copyToClipboard} hidden={!(text.length > 0)}>Copiar texto</button>
                </div>
            </div>
            <div>
                <button onClick={routeHistory}>Ver histórico de conversões</button>
            </div>
        </div>
    )
}
