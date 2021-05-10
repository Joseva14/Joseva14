import  AsyncStorage  from "@react-native-async-storage/async-storage";
import {size, map, filter} from 'lodash';
import axios from 'axios';

import {constans} from '../utils/constants';

/**
 * método devuelve un arrar con los productos agregados
 */
export async function getProductCartApi(){
    
    try {
        const cart = await AsyncStorage.getItem(constans.CART)
        if(!cart) return []
        return JSON.parse(cart)
    } catch (error) {
        return null
    }
}

/**
 * método para agregar producto al carro en el storage
 * @param {*} idProduct identificador del producto
 * @param {*} quantity cantidad
 */
export async function addProductCartApi(idProduct, quantity){
    try {
        const cart = await getProductCartApi()
        if(!cart) throw 'Error al obtener el carrito'
        if(size(cart) === 0){
            cart.push({
                idProduct,
                quantity
            })
        }else{
            let found = false;
            map(cart, (product)=>{
                if(product.idProduct === idProduct){
                    product.quantity += quantity
                    found = true
                    return product
                }
            })

            if(!found){
                cart.push({
                    idProduct,
                    quantity
                })
            }
        }
        await AsyncStorage.setItem(constans.CART, JSON.stringify(cart))
        return true
    } catch (error) {
        return false
    }
}

/**
 * método para eliminar el producto del localStorage
 * @param {*} idProduct identificador del producto
 */
export async function deleteProductCartApi(idProduct){
    try {
        const cart = await getProductCartApi()
        const newCart = filter(cart, (product)=>{
            return product.idProduct !== idProduct
        })
        await AsyncStorage.setItem(constans.CART, JSON.stringify(newCart))
        return true
    } catch (error) {
        return null
    }
}

/**
 * método para incrementar la cantidad del producto
 * @param {*} idProduct identificador del producto
 */
export async function increaseProductCartApi(idProduct){
    try {
        const cart = await getProductCartApi()
        map(cart, (product)=>{
            if(product.idProduct === idProduct){
                return (product.quantity += 1)
            }
        })
        await AsyncStorage.setItem(constans.CART, JSON.stringify(cart))
        return true
    } catch (error) {
        return null
    }
}

/**
 * método para decrementar la cantidad del producto
 * @param {*} idProduct identificador del producto
 */
export async function decreaseProductCartApi(idProduct){
    let isDelete = false;
    try {
        const cart = await getProductCartApi()
        //disminuye la cantidad
        map(cart, (product)=>{
            if(product.idProduct === idProduct){
                if(product.quantity === 1){
                    isDelete = true;
                    return null
                }else{
                    return (product.quantity -= 1)
                }
            }
        })
        // elimina el producto si isDelete = true
        if(isDelete){
            await deleteProductCartApi(idProduct)
        }else{
            await AsyncStorage.setItem(constans.CART, JSON.stringify(cart))
        }
        return true
    } catch (error) {
        return null
    }
}

export async function paymentCartApi(auth, tokenPaypal, products, address){
    try {
        const addressShipping = address
        delete addressShipping.user
        delete addressShipping.createAt
        const url = `${constans.API_URI}/orders`

        const response = await axios.post(url, {tokenPaypal, products, idUser: auth.idUser, addressShipping},{
            headers: {
                Authorization: `Bearer ${auth.token}`,
                "Content-Type":"application/json"
            }
        })
        return response
    } catch (error) {
        
    }
}

export async function deleteCartApi(){
    try {
        await AsyncStorage.removeItem(constans.CART)
        return true
    } catch (error) {
        return null
    }
}