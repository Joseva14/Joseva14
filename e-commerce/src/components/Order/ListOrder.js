import React from 'react'
import { map } from 'lodash'
import { View, Text, StyleSheet } from 'react-native'
import Order from './Order'

export default function ListOrder({orders}) {
    
    return (
        <View style={styles.container} >
            {map(orders, order=>(
                <Order order={order} key={order._id} />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginTop: 20,
        marginBottom: 40
    }
})