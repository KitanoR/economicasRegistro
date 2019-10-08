import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import './acciones.css';
import Swal from 'sweetalert2';
const eliminar_img = require('assets/img/icons/borrar.png');
const ver_img = require('assets/img/icons/ver.png');
const ver_bodega_img = require('assets/img/icons/ver_bodega.png');
const editar_img = require('assets/img/icons/editar.png');

class Acciones extends Component {
    constructor(props) {
        super(props);
    }

    eliminar = (id) => {
        return () => {
            Swal.fire({
                title: '¿Eliminar?',
                text: '¡No podrá revertir esta acción!',
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: '¡Sí, eliminar!',
                cancelButtonText: 'No, cancelar',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    this.props.eliminar(id);
                }
            });
        }
    };

    render() {
        const { id, ver, ver_bodega, editar, eliminar } = this.props;

        return (
            <div className="d-flex justify-content-center">
                {(eliminar !== undefined) && (
                    <a className="px-2" style={{cursor: "pointer", color: "#c4183c"}} onClick={this.eliminar(id)}><img
                        src={eliminar_img} alt="Eliminar" className="action_img"/></a>
                )}
                {(editar !== undefined) && (
                    <Link className="text-warning" to={`${editar}/${id}/editar`} ><img src={editar_img} alt="Editar" className="action_img"/></Link>
                )}
                {(ver !== undefined) && (
                    <Link to={`${ver}/${id}/`} className="px-2" ><img src={ver_img} alt="Ver" className="action_img"/></Link>
                )}
                {(ver_bodega !== undefined) && (
                    <Link to={`${ver_bodega}/${id}/`} className="px-2" ><img src={ver_bodega_img} alt="Ver" className="action_img"/></Link>
                )}
            </div>
        );
    }
}
Acciones.propTypes = {
};

export function standardActions(acciones) {
    return (cell, row) => {
        return ( <Acciones id={cell} {...acciones}/> )
    };
}
