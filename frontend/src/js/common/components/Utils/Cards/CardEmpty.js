import React, { Fragment} from 'react';


function CardEmpty(props) {
    return (
        <Fragment>
            <div className={`mb-4 ${props.noShadow ? 'card-empty' : 'card-tabla' }`}>
                <div className="card-content p-0 px-3 pt-3">
                    {props.children}
                </div>
            </div>
        </Fragment>

    )
}

export default CardEmpty;
