import React, { useCallback, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native'
import { Button, TextInput } from 'react-native-paper';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';

import useAuth from '../../hooks/useAuth';
import { formStyle } from '../../styles';
import { getMeApi, updateUserApi } from '../../api/user';
import { useFormik } from 'formik';

export default function ChangeUsername() {
    const { auth } = useAuth();
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const { username } = await getMeApi(auth.token)
                await formik.setFieldValue('username', username)
            })()
        }, []))
    const formik = useFormik({
        initialValues:initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(formData)=>{
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
                formik.setFieldError('username', true)
                setLoading(false)
            }
        }
    })
    return (
        <View style={styles.container}>
            <TextInput label='Nombre de usuario' style={formStyle.input} 
                onChangeText={text => formik.setFieldValue('username', text)} 
                value={formik.values.username}
                error={formik.errors.username}
            />
            <Button mode='contained' style={formStyle.btnSuccess} onPress={formik.handleSubmit} loading={loading} >
                Cambiar nombre de usuario
            </Button>
        </View>
    )
}

function validationSchema(){
    return {
        username: Yup.string().required(true).min(4, true)
    }
}

function initialValues(){
    return {
        username: ''
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    }
})