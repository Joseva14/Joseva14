import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import index from '../components/Cart';
import PaymentPayPal from '../components/Cart/PayPal/PaymentPayPal';
import SuccessPayPal from '../components/Cart/PayPal/SuccessPayPal';

const Stack = createStackNavigator();

export default function Car() {

    return (

        <Stack.Navigator initialRouteName="Index"  headerMode='none' >
            <Stack.Screen name="Index" component={index} />
            
            <Stack.Screen name="Payment" component={PaymentPayPal} />
            <Stack.Screen name="Success" component={SuccessPayPal} />
        </Stack.Navigator>

    )
}

