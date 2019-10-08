import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import './acciones.css';
import Swal from 'sweetalert2';
import BajaForm from './BajaForm';

const eliminar_img = require('assets/img/icons/borrar.png');
const ver_img = require('assets/img/icons/ver.png');
const editar_img = require('assets/img/icons/editar.png');
const activar_img  = require('assets/img/icons/activar.png');
const desactivar_img  = require('assets/img/icons/desactivar.png');
import Modal from 'react-responsive-modal';

class Acciones extends Component {
    constructor(props) {
        super(props);
        this.state = { open: false }
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
    openModal =(activar) => {
        this.setState({ open: true, activar})
    };
    closeModal = () => {
        this.setState({open: false})
    };
    onSubmit = (data) => {
        if(this.state.activar){
            this.props.activar(this.props.id)
        } else {
            this.props.desactivar(this.props.id, data)
        }
    };

    render() {
        const { id, row, ver, editar, eliminar, desactivar } = this.props;

        return (
            <Fragment>
                <Modal open={this.state.open} onClose={this.closeModal}>
                    <div className="pb-4 titulo-modal d-flex justify-content-center">
                        {this.state.activar ? (
                            <h2>REACTIVAR LA FINCA</h2>
                        ): (
                            <h2>DAR DE BAJA/DESACTIVAR FINCA</h2>
                        )}
                    </div>
                    <BajaForm onSubmit={this.onSubmit} closeModal={this.closeModal} activar={this.state.activar} />
                </Modal>
                <div className="d-flex justify-content-center">
                    {(desactivar !== undefined) && (
                        <a className="px-2" style={{cursor: "pointer", color: "#c4183c"}} onClick={e =>{e.preventDefault();this.openModal(!!row.de_baja)}}><img
                            src={row.de_baja ? activar_img : desactivar_img} alt="De baja" className="action_img" title={`${this.state.activar ? 'Activar': 'Desactivar'}`}/></a>
                    )}
                    {(eliminar !== undefined && row.estado_ingreso === 10) && (
                        <a className="px-2" style={{cursor: "pointer", color: "#c4183c"}} onClick={this.eliminar(id)}><img
                            src={eliminar_img} alt="Eliminar" className="action_img"/></a>
                    )}
                    {(editar !== undefined && (row.estado_ingreso === 10 || row.estado_ingreso === 30)) && (
                        <Link className="text-warning" to={`${editar}/${id}/editar`} ><img src={editar_img} alt="Editar" className="action_img"/></Link>
                    )}
                    {(ver !== undefined) && (
                        <Link to={`${ver}/${id}/`} className="px-2" ><img src={ver_img} alt="Ver" className="action_img"/></Link>
                    )}
                </div>
            </Fragment>
        );
    }
}
Acciones.propTypes = {
};

export function recepcionActions(acciones) {
    return (cell, row) => {
        return ( <Acciones id={cell} row={row} {...acciones}/> )
    };
}
