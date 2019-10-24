import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

function Home() {
    let history = useHistory();

    function app1() {
        history.push('/app1');
    }

    function app2() {
        history.push('/app2');
    }

    function app3() {
        history.push('/app3');
    }

    function routeEditUser() {
        history.push('/edit');
    }
    
    return (
        <div className='col'>
            <button onClick={routeEditUser}>Editar Perfil</button>
            <ul>
                <li><button onClick={app1}>Converter imagem em texto</button></li>
                <li><button onClick={app2}>Converter pdf em texto</button></li>
                <li><button onClick={app3}>Gerar código de barras ou QR code</button></li>
            </ul>
        </div>
    )
}

export default Home;
