import React, { useState } from 'react'
import { View, Text } from 'react-native'
import {TextInput, Button} from 'react-native-paper'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';

import useAuth from '../../hooks/useAuth';
import { loginApi } from '../../api/user';
import { formStyle } from '../../styles';

export default function LoginForm({chageForm}) {
    const [loading, setLoading] = useState(false)
    const {login} = useAuth();
    

    const formik = useFormik({
        initialValues: initialValue(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formdata)=>{
            try {
                setLoading(true)    
                
                const {data, error, statusCode} = await loginApi(formdata)
                if(statusCode === 400)
                    throw `Error: ${error}`
                
                login(data)
            } catch (error) {
                
                Toast.show(error, {
                    position: Toast.positions.BOTTOM
                })
            }
            setLoading(false)
        }
    })

    return (
        <View>
            <TextInput label="Email o Username" style={formStyle.input} 
                onChangeText={(text)=> formik.setFieldValue('identifier', text)} 
                value={formik.values.identifier}
                error={formik.errors.identifier}
            />
            <TextInput label="Contraseña" style={formStyle.input} 
                onChangeText={(text)=> formik.setFieldValue('password', text)} 
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <Button mode='contained' style={formStyle.btnSuccess} onPress={formik.handleSubmit} loading={loading} >
                Login
            </Button>
            <Button mode="text" 
                style={formStyle.btnText} 
                labelStyle={formStyle.btnTextLabel} 
                onPress={chageForm}
                >
                Register
            </Button>
        </View>
    )
}


/**
 * @returns valores iniciales del formulario
 */
function initialValue(){
    return {
        identifier:'',
        password: ''
    }
}

/**
 * método se declara los valores de la del formulario
 * - si se quiere marcar la casilla en rojo adentro valor true
 * @returns validaciones de los campos
 */
function validationSchema(){
    return {
        identifier: Yup.string().required(true),
        password: Yup.string().required(true)
    }
}