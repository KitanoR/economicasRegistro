import React, { Fragment} from 'react';


function CardForm(props) {
    return (
        <Fragment>
            <div className="d-flex align-items-baseline ml-3">
                <img src={require(`assets/img/icons/${props.icon}.png`)} alt="Usuario" className="title_img mr-2"/>
                <img src={require('assets/img/icons/linea.png')} alt="Linea" className="title_img mr-2"/>
                <h2 className="mr-2">{props.titulo}</h2>
                <span>{props.subtitulo}</span>
            </div>
            <div className="mb-4 card-tabla card-small">
                <div className="card-content-form">
                    <div className={`col-12 col-lg-${props.col ? props.col : '8'}`}>
                        {props.children}
                    </div>
                </div>
            </div>
        </Fragment>

    )
}

export default CardForm;
