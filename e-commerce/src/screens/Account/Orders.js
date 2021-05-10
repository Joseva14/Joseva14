import React, { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, ActivityIndicator } from 'react-native'
import {size} from 'lodash';

import { getOrdersApi } from '../../api/order';
import StatusBarCustom from '../../components/StatusBarCustom'
import useAuth from '../../hooks/useAuth';
import colors from '../../styles/colors';
import ListOrder from '../../components/Order/ListOrder';

export default function Orders() {
    const [orders, setOrders] = useState()
    const { auth } = useAuth()

    useFocusEffect(
        useCallback(() => {
            (async()=>{
                const response = await getOrdersApi(auth)
                setOrders(response)
            })()
        }, [])
    )

    return (
        <>
        <StatusBarCustom />
        <ScrollView style={styles.container} >
            <Text style={styles.title} >Mis pedidos</Text>
            {!orders ? (
                <ActivityIndicator size='large' style={styles.loading} />
            ):size(orders) === 0?(
                <Text style={styles.noOrderText} >No tienes pedidos</Text>
            ):(<ListOrder orders={orders} />)}
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 20
    },
    title:{
        fontSize: 20
    },
    loading:{
        marginTop:20
    },
    noOrderText:{
        textAlign: 'center',
        paddingTop: 20,
        fontSize: 18
    },
})