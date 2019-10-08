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
                            dataField="id"
                            dataAlign="center"
                            width='20%'
                            dataSort
                            dataFormat={standardActions({ editar: "bodega", eliminar, ver_bodega: "bodega"})}
                        />
                        <TableHeaderColumn
                            isKey
                            dataField="nombre"
                            dataSort
                        >
                            NOMBRE
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="tipo_text"
                            dataSort
                        >
                            TIPO
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField="altura_maxima"
                            dataSort
                            dataFormat={(cell,row) => <RenderCM value={cell} />}
                        >
                            ALTURA
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataAlign="center"
                            dataField="id"
                            width='8%'
                            dataSort
                        >
                            CÓDIGO
                        </TableHeaderColumn>
                    </Grid>
                </Card>
            </div>
        )
    }
}
