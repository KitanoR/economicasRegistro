import React, { Fragment} from 'react';


function Card(props) {
    return (
        <Fragment>
            <div className="d-flex align-items-baseline ml-3">
               
                <h2 className="mr-2">{props.titulo}</h2>
                <span>{props.subtitulo}</span>
            </div>
            <div className="mb-4 card-tabla card-small">
                <div className="card-content p-0 px-3 pt-3 mb-4">
                    {props.children}
                </div>
            </div>
        </Fragment>

    )
}

export default Card;
