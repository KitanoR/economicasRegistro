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

export default class PasoDosForm extends Component{ 
    render() { 
        const { handleSubmit, previousStep, sillas, seleccionarSilla } = this.props;
        return(
            <div className="mb-4 col-12 mt-5 ">
                <div className="d-flex justify-content-center col-12 p-0 m-0">
                    <div className="col-md-7">
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
                
                

                <div className="buttons-box mt-5 col-12">
                    <button className="btn btn-outline-dark mr-5" onClick={previousStep}>ANTERIOR</button>
                    <button type="submit" className="btn btn-outline-primary">GUARDAR</button>
                </div>
            </div>
        );
    }
}