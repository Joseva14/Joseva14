import React, { useState } from 'react'
import { useFormik } from 'formik'
import Toast from 'react-native-root-toast';
import { View, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import useAuth from '../../hooks/useAuth';
import { formStyle } from '../../styles'
import { updateUserApi } from '../../api/user';

export default function ChangePassword() {
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()
    const { auth } = useAuth()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData) => {
            setLoading(true)
            try {
                const {statusCode, error} = await updateUserApi(auth, formData);
                if(statusCode) throw error
                //volver a la vista anterior
                navigation.goBack();
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.BOTTOM
                })
                
                formik.setFieldError('email', true)
                setLoading(false)
            }
        }
    })
    return (
        <View style={styles.container} >
            <TextInput
                label='Nueva Contraseña'
                style={formStyle.input}
                onChangeText={text => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
                secureTextEntry
            />
            <TextInput
                label='Repetir nueva contraseña'
                style={formStyle.input}
                onChangeText={text => formik.setFieldValue('repeatPassword', text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
                secureTextEntry
            />
            <Button mode="contained" style={formStyle.btnSuccess} onPress={formik.handleSubmit} loading={loading} >
                Cambiar Contraseña
            </Button>
        </View>
    )
}

function initialValues() {
    return {
        password: '',
        repeatPassword: ''
    }
}

function validationSchema() {
    return {
        password: Yup.string().min(4, true).required(true),
        repeatPassword: Yup.string().min(4, true).required(true).oneOf([Yup.ref('password')], true)
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})