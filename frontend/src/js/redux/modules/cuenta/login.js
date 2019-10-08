import { createAction, handleActions } from 'redux-actions';
import { push } from "react-router-redux";
import { NotificationManager } from "react-notifications";
import { api } from "api";

const SUBMIT = 'LOGIN_SUBMIT';
const LOADER = 'LOGIN_LOADER';
const ME = 'LOGIN_ME';

export const constants = {
    SUBMIT,
};

// ------------------------------------
// Pure Actions
// ------------------------------------

export const setLoader = loader => ({
    type: LOADER,
    loader,
});

export const setMe = me => ({
    type: ME,
    me,
});

// ------------------------------------
// Actions
// ------------------------------------

export const onSubmit = (data = {}) => (dispatch, getStore) => {
    dispatch(setLoader(true));
    api.post('token', data).then((response) => {
        localStorage.setItem('token', response.token);
        dispatch(push("/"));
    }).catch(() => {
        NotificationManager.error('Credenciales incorrectas, vuelva a intentar', 'ERROR', 0);
    }).finally(() => {
        dispatch(setLoader(false));
    });
};

export const getMe = () => (dispatch) => {
    api.get('/user/me').then(result => dispatch(setMe(me)))
        .catch(() => {
    }).finally(() => {});
};

export const logOut = () => (dispatch) => {
    localStorage.removeItem('token');
};


export const actions = {
    onSubmit,
    logOut,
};

export const reducers = {
    [LOADER]: (state, { loader }) => {
        return {
            ...state,
            loader,
        };
    },
    [ME]: (state, { me }) => {
        return {
            ...state,
            me,
        };
    },
};

export const initialState = {
    loader: false,
    me: {},
};

export default handleActions(reducers, initialState);
