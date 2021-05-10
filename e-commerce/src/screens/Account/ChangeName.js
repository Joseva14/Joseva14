import React, { useCallback, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import {TextInput, Button} from 'react-native-paper';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik} from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';

import { formStyle} from '../../styles';
import useAuth from '../../hooks/useAuth';
import { getMeApi, updateUserApi } from '../../api/user';

export default function ChangeName() {
    const { auth } = useAuth()
    const navigation = useNavigation()
    

    const [loading, setLoading] = useState(false)
     useFocusEffect(
        useCallback(()=>{
            (async()=>{
                const {name, lastname} = await getMeApi(auth.token)
                
                name && await formik.setFieldValue('name', name)
                lastname && await formik.setFieldValue('lastname', lastname)
            })()
        }, [])
    )
    const formik = useFormik({
        initialValues: initialValues(),
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
                setLoading(false)
            }
        }
    })
    return (
        <View style={styles.container} >
            <TextInput 
                label="Nombre"
                style={formStyle.input}
                onChangeText={text => formik.setFieldValue('name', text)}
                value={formik.values.name}
                error={formik.errors.name}
            />

            <TextInput 
                label="Appelidos"
                style={formStyle.input}
                onChangeText={text => formik.setFieldValue('lastname', text)}
                value={formik.values.lastname}
                error={formik.errors.lastname}
            />

            <Button mode="contained" style={formStyle.btnSuccess} onPress={formik.handleSubmit} loading={loading} >
                Cambiar nombre y apellidos
            </Button>
        </View>
    )
}

function initialValues(){
    return {
        name:'',
        lastname: ''
    }
}

function validationSchema(){
 return {
     name: Yup.string().required(true),
     lastname: Yup.string().required(true)
 }
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    }
})
