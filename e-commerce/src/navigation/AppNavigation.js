import React from 'react'
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import Favorites from '../screens/Favorites';
import Car from '../screens/Cart';
import colors from '../styles/colors';
import AccountStack from './AccountStack';
import ProductStack from './ProductStack';

const Tab = createMaterialBottomTabNavigator();

export default function AppNavigation() {

    return (
        <NavigationContainer>
            <Tab.Navigator
                barStyle={styles.navigation}
                screenOptions={({route})=> ({
                    tabBarIcon: (routeStatus)=>{
                        return setIcon(route, routeStatus)
                    }
                })}
            >
                <Tab.Screen name="home" component={ProductStack} options={{title: "Inicio"}} />
                <Tab.Screen name="favorites" component={Favorites} options={{title: "Favoritos"}} />
                <Tab.Screen name="cart" component={Car} options={{title: "Carrito"}} />
                <Tab.Screen name="account" component={AccountStack} options={{title: "Cuenta"}} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

function setIcon({name}, routeStatus){
    let iconName = ''
    let color= ''
    switch (name) {
        case 'home':
            iconName= 'home'
            color='#3371ff'
            break;
        case 'favorites':
            iconName = 'heart'
            color= '#ff3333'
            break;
        case 'cart':
            iconName = 'shopping-cart'
            color='#fff933'
            break;
        case 'account':
            iconName = 'bars'
            color='#fffee3'
            break;
        default:
            break;
    }
    return <AwesomeIcon name={iconName} color={color} style={styles.icon} />
}

const styles = StyleSheet.create({
    navigation:{
        backgroundColor: colors.bgDark
    },
    icon:{
        fontSize: 20,
        color: colors.fontLight
    }
})