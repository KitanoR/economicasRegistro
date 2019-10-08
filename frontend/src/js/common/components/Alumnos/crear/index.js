import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/alumnos/alumnos';
import AlumnosCrear from './AlumnosCrear';


const ms2p = (state) => {
  return {
    ...state.alumnos,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(AlumnosCrear);
