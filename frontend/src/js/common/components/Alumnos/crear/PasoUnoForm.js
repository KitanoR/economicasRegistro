import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';
import { validate, validators } from 'validate-redux-form';
import { Field, reduxForm, formValueSelector, } from 'redux-form';
import {AsyncSelectField, renderField, SelectField, SelectMulti, renderNoAsyncSelectField} from 'Utils/renderField/renderField';
import { api } from "api";




let PasoUnoForm = props => {
    const { handleSubmit, previousStep } = props;

    const { setStep } = props;
    return(
        <form onSubmit={handleSubmit}>
            <div className="form-group grid-container ">
                <h6 className="ml-4 mb-4">DATOS DEL ALUMNO</h6>
                <div className="row  col-md-12 m-0">
                    <div className="col-md-6 p-0">
                        <div className="col-md-12 col-sm-12">
                            <label htmlFor="carnet" className="m-0">Carnet</label>
                        </div>
                        <div className="col-md-12  form-group">
                            <Field name="carnet" component={renderField} type="number" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row  col-md-12 m-0">
                    <div className="col-md-6 p-0">
                        <div className="col-md-12 col-sm-12">
                            <label htmlFor="nombre" className="m-0">Nombre</label>
                        </div>
                        <div className="col-md-12  form-group">
                            <Field name="nombre" component={renderField} type="text" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="col-md-12 col-sm-12">
                            <label htmlFor="apellido" className="m-0">Apellido</label>
                        </div>
                        <div className="col-md-12  form-group">
                            <Field name="apellido" component={renderField} type="text" className="form-control" />
                        </div>
                    </div>
                </div>
                <div className="row  col-md-12 m-0">
                    <div className="col-md-6 p-0">
                        <div className="col-md-12 col-sm-12">
                            <label htmlFor="correo" className="m-0">Correo</label>
                        </div>
                        <div className="col-md-12  form-group">
                            <Field name="correo" component={renderField} type="email" className="form-control" />
                        </div>
                    </div>
                    <div className="col-md-6 p-0">
                        <div className="col-md-12 col-sm-12">
                            <label htmlFor="carrera" className="m-0">Carrera</label>
                        </div>
                        <div className="col-md-12  form-group">
                        <Field
                                    name="carrera"
                                    options={props.carreras}
                                    component={renderNoAsyncSelectField}
                                />
                        </div>
                    </div>
                </div>
                <div className="row  col-md-12 m-0">
                    <div className="col-md-6 p-0">
                        <div className="col-md-12 col-sm-12">
                            <label htmlFor="semestres" className="m-0">Semestres</label>
                        </div>
                        <div className="col-md-12  form-group">
                            <Field
                                    name="semestres"
                                    isMulti
                                    options={props.semestres}
                                    component={renderNoAsyncSelectField}
                                />
                        </div>
                    </div>
                </div>

                <div className="buttons-box mt-5 pb-5">
                    <Link className="btn btn-outline-dark mr-5" to="/alumnos">CANCELAR</Link>
                    <button type="submit" className="btn btn-outline-primary">{props.editar ? 'GUARDAR' : 'SIGUIENTE'}</button>
                </div>
            </div>
        </form>
    )
};
PasoUnoForm = reduxForm({
    form: 'alumnoForm',
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate: data => {
        return validate(data, {
            'nombre': validators.exists()('Campo requerido.'),
            'apellido': validators.exists()('Campo requerido.'),
            'correo': validators.exists()('Campo requerido.'),
            'carrera': validators.exists()('Campo requerido.'),
            'semestre': validators.exists()('Campo requerido.'),
            'carnet': validators.exists()('Campo requerido.'),
        })
    }
})(PasoUnoForm);

export default PasoUnoForm
