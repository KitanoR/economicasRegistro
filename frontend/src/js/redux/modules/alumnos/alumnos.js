import Swal from 'sweetalert2';
import { api } from "api";
import { createActions, handleActions } from 'redux-actions'
import { goBack } from 'react-router-redux'
import { initialize as initializeForm } from 'redux-form'
import { push } from 'react-router-redux';
const url = 'alumnos';

const LOADER_ALUMNOS = 'LOADER_ALUMNOS';
const SET_DATA_ALUMNOS = 'SET_DATA_ALUMNOS';
const SET_PAGE_ALUMNOS = 'SET_PAGE_ALUMNOS';
const SET_UPDATE_DATA_ALUMNOS ='SET_UPDATE_DATA_ALUMNOS';
const SET_BUSCADOR_ALUMNOS = 'SET_BUSCADOR_ALUMNOS';
const SET_FILTRO_ALUMNOS = 'SET_FILTRO_ALUMNOS';

const SET_SILLAS = 'SET_SILLAS';
const SET_SILLA_SELECCIONADA = 'SET_SILLA_SELECCIONADA';

const listar = (page = 1) =>  (dispatch, getStore) => {
    dispatch({type: LOADER_ALUMNOS, cargando: true});
    const store = getStore();
    const search = store.alumnos.buscador;
    const filtro = store.alumnos.filtro_alumnos;
    let params = {page, search};

    if(filtro){
        params[''] = filtro
    }
    api.get(`${url}`, params).catch((error) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false});
        Swal(
            'Error',
            error.detail || 'Ha ocurrido un error, por favor vuelva a intentar.',
            'error'
        );
    }).then((data) => {
        if(data){
            dispatch({type: SET_DATA_ALUMNOS, data});
            dispatch({type: SET_PAGE_ALUMNOS, page});
        }
        dispatch({type: LOADER_ALUMNOS, cargando: false});
    })
};



const listarSillas = (page = 1) =>  (dispatch, getStore) => {
    dispatch({type: LOADER_ALUMNOS, cargando: true});
    const store = getStore();
   
    api.get(`sillas/get_lugares/`).catch((error) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false});
        Swal(
            'Error',
            error.detail || 'Ha ocurrido un error, por favor vuelva a intentar.',
            'error'
        );
    }).then((data) => {
        if(data){
            dispatch({type: SET_SILLAS, sillas: data});
        }
        dispatch({type: LOADER_ALUMNOS, cargando: false});
    })
};


const detail = id => (dispatch, getState) =>{
    dispatch({type: LOADER_ALUMNOS, cargando: true});
    api.get(`${url}/${id}`).catch((error) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false});
        if(error.statusCode  === 404){
            dispatch(push('/alumnos'))
        }
    }).then((data) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false});
        if(data){
            dispatch({type: SET_UPDATE_DATA_ALUMNOS, updateData: data});
            dispatch(initializeForm('bodega', data))
        }
    })
}

const create = () => (dispatch, getStore) => {
    const formData = getStore().form.bodega.values;
    dispatch({type: LOADER_ALUMNOS, cargando: true})
    api.post(`${url}`, formData).then((data) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false})
        Swal('Éxito', 'Se ha creado la bodega.', 'success')
        .then(() => {
            dispatch(push('/alumnos'))
        })
    }).catch((error) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false})
        Swal(
            'Error',
             error.detail || 'Ha ocurrido un error, por favor vuelva a intentar.',
            'error'
        );
    }).finally(() => {
        dispatch({type: LOADER_BODEGA, cargando: false})
    });
};

const seleccionarSilla = (codigo, id) => (dispatch, getStore) => {
    let sillas = _.cloneDeep(getStore().alumnos.sillas);

    _.forEach(sillas, (filas) => {
        _.forEach(filas.data, (lugar) => {
            if (lugar.estado_lugar !== 3) {
                lugar.estado_lugar = 1
            }
        })
    }); 
    

    const silla_encontrada = _.find(sillas, (silla)=> {
        return silla.codigo === codigo
    });

    const lugar  = _.find(silla_encontrada.data, (lugar) => {return lugar.id === id})
    lugar.estado_lugar = 2

   

    dispatch({type: SET_SILLAS, sillas: sillas});
    dispatch({type: SET_SILLA_SELECCIONADA, silla_seleccionada: lugar});
}

const update = () => (dispatch, getStore) => {
    const formData = _.cloneDeep(getStore().form.bodega.values);
    dispatch({type: LOADER_ALUMNOS, cargando: true});
    api.put(`${url}/${formData.id}`, formData)
    .then((data) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false});
        if(data){
            Swal(
                'Éxito',
                'Datos editados correctamente.',
                'success'
            ).then(() => {
                dispatch(push('/alumnos'));
            })
        }
    })
    .catch((error) =>{
        dispatch({type: LOADER_ALUMNOS, cargando: false});
        Swal(
            'Error',
             error.detail || 'Ha ocurrido un error, verifique los datos.',
            'error'
        )
        if(error.statusCode === 404){
            dispatch(push('/alumnos'));
        }
    })
}
const destroy = (id) => (dispatch, getStore) => {
    dispatch({type: LOADER_ALUMNOS, cargando: true});
    api.eliminar(`${url}/${id}`).catch((error) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false});
        Swal('Error', 'No se ha logrado borrar el registro.', 'error')
            .then(() => {
                dispatch(listar(1));
        })
    }).then((data) => {
        dispatch({type: LOADER_ALUMNOS, cargando: false});
        Swal('Éxito', 'Se ha eliminado correctamente.', 'success')
            .then(() => {
                dispatch(listar(1));
            })
    })
}

const search = (search) => (dispatch, getStore) => {
    dispatch({type: SET_BUSCADOR_ALUMNOS, buscador: search});
    dispatch(listar(1));
};
const filtro = (filtro) => (dispatch, getStore) => {
    if (filtro == 0){
        filtro = null
    }
    dispatch({type: SET_FILTRO_ALUMNOS, filtro_alumnos: filtro});
    dispatch(listar(1));
};
export const actions = {
    listar,
    detail,
    create,
    update,
    destroy,
    search,
    listarSillas,
    filtro,
    seleccionarSilla
};
export const reducer = {
    [LOADER_ALUMNOS]: (state, { cargando }) => {
        return {...state, cargando }
    },
    [SET_DATA_ALUMNOS]: (state, { data }) => {
        return {...state, data }
    },
    [SET_PAGE_ALUMNOS]: (state, { page }) => {
        return {...state, page }
    },
    [SET_UPDATE_DATA_ALUMNOS]: (state, { updateData }) => {
        return {...state, updateData }
    },
    [SET_BUSCADOR_ALUMNOS]: (state, { buscador }) => {
        return {...state, buscador }
    },
    [SET_FILTRO_ALUMNOS]: (state, { filtro_alumnos }) => {
        return {...state, filtro_alumnos }
    },
    [SET_SILLAS]: (state, { sillas }) => {
        return {...state, sillas }
    },
    [SET_SILLA_SELECCIONADA]: (state, { silla_seleccionada }) => {
        return {...state, silla_seleccionada }
    },
}
export const initialState = {
    cargando: false,
    page: 1,
    data: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    buscador: '',
    filtro_alumnos: null,
    updateData: {},
    sillas: [],
    silla_seleccionada: null
};
export default handleActions(reducer, initialState) 