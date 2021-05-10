import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

/**
 * Hooks para usar variables en toda la app
 */
export default ()=> useContext(AuthContext)