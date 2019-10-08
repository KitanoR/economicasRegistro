import React from 'react';
import './alerta.css'
const alerta_img = require('assets/img/icons/alerta.png');


const Alerta = ({texto}) =>(
    <div className="alerta-container">
        <img src={alerta_img} alt="Alerta" className="title_img"/>
        <span className="alerta-text">{texto}</span>
    </div>
);

export default Alerta;
