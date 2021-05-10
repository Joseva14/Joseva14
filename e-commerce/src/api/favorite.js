import axios from 'axios';
import { size } from 'lodash';
import {constans} from '../utils/constants';

/**
 * método para buscar en la lista de favoritos
 * 
 * @param {*} auth usuario atenticado
 * @param {*} idProduct identificador del producto
 */
export async function isFavoriteApi(auth, idProduct){
    try {
        const url = `${constans.API_URI}/favorites?user=${auth.idUser}&product=${idProduct}`
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export async function addFavoriteApi(auth, idProduct){
    try {
        const url = `${constans.API_URI}/favorites`
        const response = await axios.post(url,{product:idProduct, user: auth.idUser},{
            headers:{
                Authorization: `Bearer ${auth.token}`,
                "Content-Type":"application/json"
            }
        })
        return response
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

/**
 * método para eliminar un producto
 * 
 * @param {*} auth usuario autenticado
 * @param {*} idProduct identificador del producto
 */
export async function deleteFavoriteApi(auth, idProduct){
    try {
        const {data} = await isFavoriteApi(auth, idProduct)
        
        if(size(data) > 0){
            //identidicador
            const url = `${constans.API_URI}/favorites/${data[0]?._id}`
            const response = await axios.delete(url, {
                headers:{
                    Authorization: `Bearer ${auth.token}`
                }
            })
            return response
        }
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export async function getFavorite(auth){
    try {
        const url = `${constans.API_URI}/favorites?user=${auth.idUser}`
        const response = await axios.get(url, {
            headers:{
                Authorization: `Bearer ${auth.token}`
            }
        })
        
        return response
    } catch (error) {
        console.log(error)
        return []
    }
}