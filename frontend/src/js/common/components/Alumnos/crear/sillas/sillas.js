import React, {Component, Fragment} from 'react'



const SillaOcupada = require("assets/img/ocupado.png");
const SillaSeleccionada = require("assets/img/seleccionado.png");
const SillaLibre = require("assets/img/libre.png");

export default class SillaComponent extends Component{ 
    state = {
        estado: 1
    }
    seleccionarSilla = () => {
        this.props.seleccionarSilla(this.props.codigo, this.props.lugar.id)
    }
    render() { 
        const { handleSubmit, previousStep, lugar } = this.props;
        const { estado } = this.state;
        return(
            <div className="col-1" onClick={this.seleccionarSilla}>
               <div className="text-center  m-0">
                   {lugar.fila_letra}-{lugar.no_lugar}
               </div> 
               <div>
                   
                       {lugar.estado_lugar === 3 &&  <img src={SillaOcupada} class="img-fluid img-thumbnail" alt="" />}
                       {lugar.estado_lugar === 2 &&  <img src={SillaSeleccionada} class="img-fluid img-thumbnail" alt="" />}
                       {lugar.estado_lugar === 1 &&  <img src={SillaLibre} class="img-fluid img-thumbnail" alt="" />}
                   
               </div>

            </div>
        );
    }
}