import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { validate, validators } from 'validate-redux-form';
import { Field, reduxForm, formValueSelector, } from 'redux-form';
import { renderField, renderSwitch } from '../renderField/renderField';
import Alerta from "Utils/Alerta/Alerta";

let BajaForm = props => {
    const { handleSubmit, closeModal, activar } = props;
    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group grid-container d-flex align-items-center flex-column">
                {!activar ?
                    (<Alerta texto="Para dar de baja la justificación es requerida" />)
                :
                    (<Alerta texto="Esta a punto de reactivar la finca" />)}
                {!activar &&(<div className="row  col-md-8 p-0">
                    <div className="col-12 p-0">
                        <div className="col-md-12 col-sm-12 text-center">
                            <label htmlFor="justificacion" className="m-0">INGRESA JUSTIFICACIÓN</label>
                        </div>
                        <div className="col-md-12  form-group">
                            <Field name="justificacion" component={renderField} type="text" className="form-control" />
                        </div>
                    </div>
                </div>)}
                <div className="buttons-box mt-1">
                    {/*<button className="btn btn-outline-dark mr-5" onClick={closeModal}>CANCELAR</button>*/}
                    <button type="submit" className="btn btn-outline-primary">{`${activar ? 'ACTIVAR' : 'DESACTIVAR'}`}</button>
                </div>
            </div>
        </form>
    )
};
BajaForm = reduxForm({
    form: 'bajaForm',
    validate: data => {
        return validate(data, {
            'justificacion': validators.exists()('Campo requerido.'),
        })
    }
})(BajaForm);

export default BajaForm
