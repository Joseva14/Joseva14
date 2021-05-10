import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native'

import logo from '../../assets/logo.png'
import LoginForm from '../components/Auth/LoginForm'
import RegisterForm from '../components/Auth/RegisterForm'
import { layoutStyle } from '../styles'

export default function Auth() {
    const [showLogin, setShowLogin] = useState(true)
    const chageForm = ()=> setShowLogin(!showLogin)
    return (
        <View style={layoutStyle.conatiner}>
            <Image style={styles.logo} source={logo} />
            {/* Diseño para teclado acomodar el teclado */}
            <KeyboardAvoidingView behavior={Platform.OS === "ios"? "padding": "height"} >
                {showLogin
                    ? <LoginForm chageForm={chageForm} />
                    : <RegisterForm chageForm={chageForm} />}

            </KeyboardAvoidingView>

        </View>
    )
}

/**
 * @param styles estilos para este componente
 */
const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 50,
        margin: 20,
        resizeMode: 'contain'
    }
})
