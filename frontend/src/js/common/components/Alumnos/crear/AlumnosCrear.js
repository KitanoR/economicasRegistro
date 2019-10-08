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
import PasoDosForm from './PasoDosForm';


export default class AlumnosCrear extends Component{

    state = {
        editar: false,
        step: 1
    };
      componentWillMount(){
          this.props.listarSillas();
          if(this.props.match.params.id){
              this.props.leer(this.props.match.params.id);
              this.setState({editar: true});
          }
      }
      actualizar = (data) =>{
          this.props.editar(data, this.props.match.params.id)
      };
      nextStep = () => {
          this.setState({ step: this.state.step + 1 })
      };
  
      previousStep =() => {
          this.setState({ step: this.state.step - 1 })
      };
      componentDidMount() {
         // this.props.cleanForm()
      }
    

    render() {
        const { listar: onPageChange, onSortChange, eliminar, filtro } = this.props;
        const { data, loader, page, onFiltroChange, seleccionarSilla } = this.props;
        const { step } = this.state;
        return(
            <div className="mb-4 col-12 mt-5">
                <Card
                    icon="bodega"
                    titulo="Inscripción de alumnos"
                    subtitulo="">
                        <div className="mb-4 d-flex justify-content-center">
                            <div className="col-md-8">
                                <ProgressBar
                                    percent={step === 1 ? 45: step === 2 ? 60 : step === 3 ? 65 : 90}
                                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                                >
                                    
                                    <Step transition="scale">
                                        {({ accomplished, index }) => (
                                            <div
                                                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                            >
                                                {index + 1}
                                            </div>
                                        )}
                                    </Step>
                                    <Step transition="scale">
                                    {({ accomplished, index }) => (
                                        <div
                                            className={`indexedStep ${accomplished ? "accomplished" : null}`}
                                        >
                                            {index + 1}
                                        </div>
                                    )}
                                    </Step>
                                </ProgressBar>
                            </div>
                           
                        </div>
                        <LoadMask loading={loader} blur>
                        {
                                (<Fragment>
                                    {step === 1 && (<PasoUnoForm onSubmit={this.nextStep} />)}
                                    {step === 2 && (<PasoDosForm onSubmit={this.nextStep} 
                                                                sillas={this.props.sillas}
                                                                seleccionarSilla={seleccionarSilla}
                                                                previousStep={this.previousStep} />)}
                                </Fragment>)
                        }
                    </LoadMask>
                </Card>
            </div>
        )
    }
}

