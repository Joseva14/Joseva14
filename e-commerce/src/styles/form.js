import { StyleSheet } from 'react-native';
import colors from './colors';

/**
 * Estilos de formulario
 */
const formStyles = StyleSheet.create({
    input:{
        marginBottom: 20
    },
    btnSuccess:{
        padding: 5,
        backgroundColor: colors.primary
    },
    btnText:{
        marginTop: 10
    },
    btnTextLabel:{
        color: colors.dark
    }
});

export default formStyles;