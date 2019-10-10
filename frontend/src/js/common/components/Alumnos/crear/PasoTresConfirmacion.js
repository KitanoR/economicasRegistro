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


export default class PasoTresConfirmacion extends Component{ 
    render() { 
        const { handleSubmit, previousStep, sillas, seleccionarSilla } = this.props;
        return(
            <div className="mb-4 col-12 mt-5 ">
                
               
                

                <div className="buttons-box mt-5 col-12">
                    <button className="btn btn-outline-dark mr-5" onClick={previousStep}>Salir</button>
                </div>
            </div>
        );
    }
}