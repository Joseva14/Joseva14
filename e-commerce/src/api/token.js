import AsyncStorage from '@react-native-async-storage/async-storage';
import { constans } from '../utils/constants';

/**
 * método para guardar el token en el localStorage del dispositivo
 * @param {*} token token enviado desde el App.js
 */
export async function setTokenApi(token){
    try {
        await AsyncStorage.setItem(constans.TOKEN, token)
        return true;
    } catch (error) {
        return null
    }
}

/**
 * @returns devuelve el token enviado obtenido desde el localStorage
 */
export async function getTokenApi(){
    try {
        const token = await AsyncStorage.getItem(constans.TOKEN)
        return token
    } catch (error) {
        return null
    }
}

export async function removeTokenApi(){
    try {
        await AsyncStorage.removeItem(constans.TOKEN)
        return true
    } catch (error) {
        return false
    }
}