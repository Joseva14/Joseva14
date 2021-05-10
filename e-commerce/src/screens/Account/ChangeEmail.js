import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, ToastAndroid } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import Toast from 'react-native-root-toast';

import { getMeApi, updateUserApi } from '../../api/user';
import useAuth from '../../hooks/useAuth';
import { formStyle } from '../../styles';
import colors from '../../styles/colors';

export default function ChangeEmail() {
    const { auth } = useAuth()
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation()

    useFocusEffect(
        useCallback(() => {
            (async () => {
                const { email } = await getMeApi(auth.token)
                await formik.setFieldValue('email', email)
            })()
        }, [])
    )

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema),
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
        <View style={styles.conatiner} >
            <TextInput
                label="Email"
                style={formStyle.input}
                onChangeText={(text)=> formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <Button mode='contained' style={formStyle.btnSuccess} onPress={formik.handleSubmit} loading={loading} >
                cambiar email
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        padding: 20
    }
})

function validationSchema() {
    return {
        email: Yup.string().email(true).required()
    }
}

function initialValues() {
    return {
        email: ''
    }
}