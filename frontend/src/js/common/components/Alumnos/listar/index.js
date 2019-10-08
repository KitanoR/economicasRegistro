import { connect } from 'react-redux';
import { actions } from '../../../../redux/modules/alumnos/alumnos';
import AlumnosGrid from './Alumnos';


const ms2p = (state) => {
  return {
    ...state.alumnos,
  };
};

const md2p = { ...actions };

export default connect(ms2p, md2p)(AlumnosGrid);
