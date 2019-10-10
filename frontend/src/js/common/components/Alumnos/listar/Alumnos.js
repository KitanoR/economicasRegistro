import React, {Component} from 'react'
import Grid from "Utils/Grid";
import {TableHeaderColumn} from "react-bootstrap-table";
import {standardActions} from "Utils/Grid/StandardActions";
import Card from "Utils/Cards/Card"
import Header from "Utils/Grid/Header";
import {RenderCM} from "Utils/renderField/renderReadField"

export default class AlumnosList extends Component{
    componentWillMount() {
        const { listar, page } = this.props;
        listar(page);
        this.props.getSemestres()
        this.props.getCarreras()
    }

    render() {
        const { listar: onPageChange, onSortChange, eliminar, filtro } = this.props;
        const { data, loader, page, onFiltroChange } = this.props;
        return(
            <div className="mb-4 col-12 mt-5">
                <Card
                    icon="bodega"
                    titulo="Listado de alumnos"
                    subtitulo="">
                    <Header to="alumno/crear" textBtn="Inscripción" {...this.props}
                    filtro={filtro} onChange={onFiltroChange}/>
                    <Grid hover striped data={data} loading={loader} onPageChange={onPageChange}
                          onSortChange={onSortChange} page={page} >
                       
                        <TableHeaderColumn
                            isKey
                            dataField="carnet"
                            dataSort
                        >
                            Carnet
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="nombre"
                            dataSort
                        >
                            nombre
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="semestre"
                            dataSort
                            dataFormat={(cell,row) => <RenderCM value={cell} />}
                        >
                            semestre
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign="center"
                            dataField="id"
                            width='8%'
                            dataSort
                        >
                            lugar
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="id"
                            dataAlign="center"
                            width='10%'
                            dataSort
                            dataFormat={standardActions({ })}
                        />
                    </Grid>
                </Card>
            </div>
        )
    }
}
