import { useFocusEffect, useRoute } from '@react-navigation/native';
import React, { useCallback} from 'react'
import { View, Text } from 'react-native'

import { paymentCartApi } from '../../../api/cart';
import useAuth from '../../../hooks/useAuth';

export default function SuccessPayPal() {
    const route = useRoute();
    const { auth } = useAuth()

    useFocusEffect(
        useCallback(
            () => {
                (async()=>{
                    const response = await paymentCartApi(auth, route.params.token, route.params.products, route.params.selectedAddress)
                    console.log('response',response)
                })()
            },
            [],
        )
    )
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Payment Successfull</Text>
            
            <Text style={{ marginTop: 10, }}> token - {route.params.token}</Text>
            
        </View>
    )
}
