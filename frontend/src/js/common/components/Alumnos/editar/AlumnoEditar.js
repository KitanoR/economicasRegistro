import React, {Component, Fragment} from 'react'
import LoadMask from 'Utils/LoadMask/LoadMask';

import Card from "Utils/Cards/Card"

import "react-step-progress-bar/styles.css";

import PasoUnoForm from '../crear/PasoUnoForm';

export default class AlumnoEditar extends Component{

    state = {
        editar: false,
        step: 1
    };
      componentWillMount(){
        this.props.getSemestres()
        this.props.getCarreras()
          this.props.listarSillas();
          if(this.props.match.params.id){
              this.props.detail(this.props.match.params.id);
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
        this.props.cleanForm()
      }
    

    render() {
        const { listar: onPageChange, onSortChange, eliminar, filtro, create } = this.props;
        const { data, cargando, page, onFiltroChange, seleccionarSilla } = this.props;
        const { step } = this.state;
        return(
            <div className="mb-4 col-12 mt-5">
                <Card
                    icon="bodega"
                    titulo="Edición alumno"
                    subtitulo="">
                          
                          
                        <LoadMask loading={cargando} blur>

                                    <PasoUnoForm 
                                        editar={true}
                                        onSubmit={this.props.update} semestres={this.props.semestres}
                                        carreras ={this.props.carreras} />
            


                    </LoadMask>
                </Card>
            </div>
        )
    }
}

