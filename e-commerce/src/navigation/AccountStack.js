import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';

import Account from '../screens/Account/Account';
import ChangeName from '../screens/Account/ChangeName';
import ChangeEmail from '../screens/Account/ChangeEmail';
import colors from '../styles/colors';
import ChangeUsername from '../screens/Account/ChangeUsername';
import ChangePassword from '../screens/Account/ChangePassword';
import Addresses from '../screens/Account/Addresses';
import AddAddress from '../screens/Account/AddAddress';
import Orders from '../screens/Account/Orders';

const Stack = createStackNavigator();

export default function AccountStack() {
    return (
        // Trasiciones entre pantallas, la primera aparece y las otras por medio de link
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colors.fontLight , 
                headerStyle: {backgroundColor: colors.bgDark}, 
                cardStyle:{backgroundColor: colors.bgLight}}}
        >
            <Stack.Screen name="account" component={Account} options={{title:'Cuenta', headerShown: false}} />
            <Stack.Screen name="change-name" component={ChangeName} options={{title:'Cambiar Nombre y apellido'}} />
            <Stack.Screen name="change-email" component={ChangeEmail} options={{title:'Cambiar Email '}} />
            <Stack.Screen name="change-username" component={ChangeUsername} options={{title:'Cambiar Username '}} />
            <Stack.Screen name="change-password" component={ChangePassword} options={{title:'Cambiar Contraseña '}} />
            <Stack.Screen name="addresses" component={Addresses} options={{title:'Mis direcciones'}} />
            <Stack.Screen name="add-addresses" component={AddAddress} options={{title:'Nueva Dirección'}} />
            <Stack.Screen name="orders" component={Orders} options={{title:'Mis Pedidos'}} />
        </Stack.Navigator>
    )
}
