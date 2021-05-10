import AsyncStorage from '@react-native-async-storage/async-storage';
import {size} from 'lodash';
import axios from 'axios';

import { constans } from '../utils/constants';
import { sortArrayByDate } from '../utils/functions';

export async function getSearchHistoryApi() {
    
    try {
        const history = await AsyncStorage.getItem(constans.SEARCH_HISTORY)
        if(!history) return []
        return sortArrayByDate(JSON.parse(history))
    } catch (error) {
        console.log(error)    
        return []
    }
}

/**
 * método para guardar un historial
 * @param {*} search historial de busqueda
 */
export async function updateSearchHistoryApi(search) {
    const history = await getSearchHistoryApi()
    if(size(history)> 5) history.pop()
    history.push({
        search,
        date: new Date()
    })

    await AsyncStorage.setItem(constans.SEARCH_HISTORY, JSON.stringify(history))
}

export async function searchProductsApi(search){
    try {
        const url = `${constans.API_URI}/products?_q=${search}&_limit=40`
        const response = await axios.get(url)
        return response
    } catch (error) {
        console.log(error)
        return error.response.data       
    }
}