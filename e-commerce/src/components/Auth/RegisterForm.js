import React, { useState } from 'react'
import { View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from 'react-native-root-toast';

import { registerApi } from '../../api/user';
import { formStyle } from '../../styles';

export default function RegisterForm({ chageForm }) {

    const [loading, setLoading] = useState(false)


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true)
            try {
                await registerApi(formData)
                chageForm()
            } catch (error) {
                setLoading(false)
                Toast.show(error, {
                    position: Toast.positions.CENTER
                })
            }
        }
    })

    return (
        <View>
            <TextInput
                label="email"
                style={[formStyle.input, formStyle.btnText]}
                onChangeText={(text) => formik.setFieldValue('email', text)}
                value={formik.values.email}
                error={formik.errors.email}
            />
            <TextInput label="Name"
                style={[formStyle.input, formStyle.btnText]}
                onChangeText={text => formik.setFieldValue('username', text)}
                value={formik.values.username}
                error={formik.errors.username}
            />
            <TextInput label="Contraseña" secureTextEntry style={formStyle.input}
                onChangeText={text => formik.setFieldValue('password', text)}
                value={formik.values.password}
                error={formik.errors.password}
            />
            <TextInput label="Repetir contraseña" secureTextEntry style={formStyle.input}
                onChangeText={text => formik.setFieldValue('repeatPassword', text)}
                value={formik.values.repeatPassword}
                error={formik.errors.repeatPassword}
            />
            <Button mode="contained" 
                style={formStyle.btnSuccess} 
                onPress={formik.handleSubmit} 
                loading={loading}>
                Register
            </Button>
            <Button mode="text"
                style={formStyle.btnText}
                labelStyle={formStyle.btnTextLabel}
                onPress={chageForm}
            >
                Sign Up
            </Button>
        </View>
    )
}

/**
 * @returns valores iniciales del formulario
 */
function initialValues() {
    return {
        email: "",
        username: "",
        password: "",
        repeatPassword: ""
    }
}

/**
 * método se declara los valores de la del formulario
 * - si se quiere marcar la casilla en rojo adentro valor true
 * @returns validaciones de los campos
 */
function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        username: Yup.string().required(true),
        password: Yup.string().required(true),
        repeatPassword: Yup.string()
            .required()
            .oneOf([Yup.ref("password")], true)
    }
}