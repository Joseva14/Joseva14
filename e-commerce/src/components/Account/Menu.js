import React from 'react'
import { Alert } from 'react-native'
import { List } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import useAuth from '../../hooks/useAuth';

/**
 * Menu con diferentes opciones e iconos
 */
export default function Menu() {
    const navigation = useNavigation();
    const { logout } = useAuth() 
    const logoutAccount = ()=> {
        //Mensaje de alerta
        Alert.alert(
            'Cerrar sesión',
            '¿Estás seguro de salir?',
            [{text: 'No'}, {text: 'Si', onPress: ()=> logout()}],
            // solo se cierra si da en alguna opcion
            {cancelable: false}
        )
    }
    return (
        <>
        <List.Section>
            <List.Subheader>Mi Cuenta</List.Subheader>
            <List.Item
                title="Cambiar Nombre"
                description="Cambia el nombre de tú cuenta"
                left={(props) => <List.Icon {...props} icon="face" />}
                onPress={() => navigation.navigate('change-name')}
            />
            <List.Item
                title="Cambiar Email"
                description="Cambia el email de tú cuenta"
                left={(props) => <List.Icon {...props} icon="at" />}
                onPress={() => navigation.navigate('change-email')}
            />

            <List.Item
                title="Cambiar Username"
                description="Cambia el nombre de usuario de tú cuenta"
                left={(props) => <List.Icon {...props} icon="sim" />}
                onPress={() => navigation.navigate('change-username')}
            />
            <List.Item
                title="Cambiar Constraseña"
                description="Cambia la contraseña de tú cuenta"
                left={(props) => <List.Icon {...props} icon="key" />}
                onPress={() => navigation.navigate('change-password')}
            />
            <List.Item
                title="Mis direcciones"
                description="Administra tus direcciones de envio"
                left={(props) => <List.Icon {...props} icon="map" />}
                onPress={() => navigation.navigate('addresses')}
            />
        </List.Section>
        <List.Section>
            <List.Subheader>App</List.Subheader>
            <List.Item
                title="Mis Pedidos"
                description="Listado de todos los pedidos"
                left={(props) => <List.Icon {...props} icon="clipboard-list" />}
                onPress={() => navigation.navigate('orders')}
            />
            <List.Item
                title="Lista de deseos"
                description="Listado de todos los productos que quieres comprar"
                left={(props) => <List.Icon {...props} icon="heart" />}
                onPress={() => navigation.navigate('favorites')}
            />
            <List.Item
                title="Cerrar sesión"
                description="Cierra está sesión y inicia con otra"
                left={(props) => <List.Icon {...props} icon="logout" />}
                onPress={logoutAccount}
            />
        </List.Section>
        </>
    )
}

