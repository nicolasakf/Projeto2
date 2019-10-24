import React, { useState } from "react";
import api from '../services/api';
import "../css/login.css"


function PdfOCR() {
    const [text, setText] = useState("");

    function convert() {
        const data = new FormData();
        let file = document.getElementById('myFile').files[0];
        data.append('file', file, file.name);
        let language = document.getElementById('dropdown-language').value;
        data.append('language', language);
        let accessToken = localStorage.getItem('accessToken')
        api.post("ocr",
            data,
            {headers: { 'Authorization': 'Bearer ' + accessToken , 'Content-Type': `multipart/form-data; boundary=${data._boundary}`}
          }).then((response) => {
              setText(response.data.text);
          }, (error) => {
            console.log(error);
          });
    }

    return (    
        <div>
            <h1>Escolha um PDF para ser convertido em texto</h1>
            <input type="file" id="myFile"/>
            <h2>Escolha uma língua</h2>
            <select id="dropdown-language">
                <option value="POR">Português</option>
                <option value="ENG">Inglês</option>
                <option value="FRA">Francês</option>
                <option value="DEU">Alemão</option>
                <option value="EPO">Esperanto</option>
                <option value="TGL">Tagalog</option>
            </select>
            <div>
                <button onClick={convert}>Converter!</button>
            </div>
            <div>
                <label>{text}</label>
            </div>
        </div>
    )
}

export default PdfOCR;
