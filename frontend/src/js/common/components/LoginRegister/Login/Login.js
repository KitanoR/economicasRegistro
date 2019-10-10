import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import LoginForm from './LoginForm';
import './login.css';
import LoadMask from "Utils/LoadMask/LoadMask";

const logo = require('../../../../../assets/img/Logo-Meso-BN-1024x962 copia.png')
class Login extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit, loader } = this.props;
        if (localStorage.getItem('token')) {
            return (<Redirect to="/" />);
        }
        return (
            <div className="fondo-login ">
                
                <div className="login-wrapper col-12 d-flex justify-content-end m-0 p-0">
                    <div className="card  card-login col-lg-3 col-md-4 col-11 m-0 fondo-card d-flex justify-content-center align-content-center" style={{height:'100vh'}}>
                        <div className="mb-5 d-flex justify-content-center">
                            <img src={logo} />
                        </div>
                        
                        <LoadMask loading={loader} light>
                        <div className=" d-flex justify-content-center">
                            <LoginForm onSubmit={onSubmit} />
                        </div>

                        </LoadMask>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
