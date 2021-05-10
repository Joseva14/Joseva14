import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Home from './PayPal';
import PaymentPayPal from './PayPal/PaymentPayPal';


const Stack = createStackNavigator();

export default function Payment({ selectedAddress, products, totalPayment }) {


    return (

        <Stack.Navigator initialRouteName="Home" >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Payment" component={PaymentPayPal} />
            
        </Stack.Navigator>

    )
}

