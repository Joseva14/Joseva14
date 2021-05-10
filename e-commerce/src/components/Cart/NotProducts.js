import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function NotProducts() {
    return (
        <View style={styles.container} >
            <Text style={styles.text} >No tiene productos</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    text:{
        fontSize: 16,

    }
})