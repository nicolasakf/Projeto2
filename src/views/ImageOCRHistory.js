import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import api from '../services/api';
import "../css/login.css"

var counter = 0;

function ImageOCRHistory() {

    const [array, setArray] = useState([]);
    const [baseURL, setBaseURL] = useState('');
    const accessToken = localStorage.getItem('accessToken')

    if (counter == 0) {
        api.get("ocr", {
            headers: { 'Authorization': 'Bearer ' + accessToken }
        }).then((response) => {
            setBaseURL(response.config.baseURL);
            setArray(response.data);
        }, (error) => {
            console.log(error);
        });
    }
    counter ++;

    return (
        <div>
            <h1>Histórico de Conversões</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Imagem</th>
                        <th>Texto</th>
                    </tr>
                    {array.map(function(e, i) {
                        return (
                            <tr key={i}>
                                <td><img src={baseURL+e.image} height='200'/></td>
                                <td><label>{e.text}</label></td>
                            </tr>
                        )
                    })}
                    <tr>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ImageOCRHistory;
