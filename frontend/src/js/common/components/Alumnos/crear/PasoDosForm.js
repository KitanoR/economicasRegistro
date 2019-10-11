import React, {Component, Fragment} from 'react'
import Grid from "Utils/Grid";
import LoadMask from 'Utils/LoadMask/LoadMask';

import {TableHeaderColumn} from "react-bootstrap-table";
import {standardActions} from "Utils/Grid/StandardActions";
import Card from "Utils/Cards/Card"
import Header from "Utils/Grid/Header";

import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

import PasoUnoForm from './PasoUnoForm';

import SillaComponent from './sillas/sillas';

const SillaOcupada = require("assets/img/asientos/ocupado.png");
const SillaSeleccionada = require("assets/img/asientos/seleccionado.png");
const SillaLibre = require("assets/img/asientos/disponible.png");
const SillaReservada = require("assets/img/asientos/reservado.png");
export default class PasoDosForm extends Component{ 
    render() { 
        const { handleSubmit, previousStep, sillas, seleccionarSilla } = this.props;
        return(
            <div className="mb-4 col-12 mt-5 ">
                <div className="d-flex justify-content-center col-12 p-0 m-0">
                    <div className="col-md-2 mt-5">
                        <div>
                            <img src={SillaLibre} /> Disponible
                        </div>
                        <div className="mt-2">
                            <img src={SillaReservada} /> Reservado
                        </div>
                        <div className="mt-2">
                            <img src={SillaOcupada} /> Ocupado
                        </div>
                        <div className="mt-2">
                            <img src={SillaSeleccionada} /> Seleccionado
                        </div>
                    </div>
                    <div className="col-md-7 d-flex justify-content-center row">
                        <div className="text-center mb-3 pt-2" style={{background: "#efefef", height: 50, width: "70%"}} >
                                <span className="h4">Escenario</span>
                        </div>
                        {
                            sillas.map(silla => {
                                return(
                                    <div className={`col-md-12 row ${silla.letra === 'K' ? "mt-5" : ""}`}>
                                        <div className="col-1">
                                            <h3>{silla.letra}</h3>
                                        </div>
                                        {
                                            silla.data.map(lugar => {
                                                return (
                                                    <SillaComponent seleccionarSilla={seleccionarSilla} codigo={silla.codigo} lugar={lugar} />
                                                );
                                            })
                                        }
                                    </div>
                                )
                            })
                        }


                        
                    </div>
                </div>
                
                

                <div className="buttons-box mt-5 col-12 pb-5">
                    <button className="btn btn-outline-dark mr-5" onClick={previousStep}>ANTERIOR</button>
                    <button type="button" onClick={this.props.crear} className="btn btn-primary">GUARDAR</button>
                </div>
            </div>
        );
    }
}