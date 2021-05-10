import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { map } from 'lodash'

import ComponentLoading from '../../components/ComponentLoading';
import { getProductApi } from '../../api/product'
import Product from './Product';

export default function ProductList({cart, products, setProducts, setReloadCart, setTotalPayment}) {
    
    useEffect(() => {
        (async()=>{
            setProducts(null)
            const productTemp = []
            let totalPaymentTemp = 0
            // para hacer un ciclo, hay que hacer un await, poruqe es info del localstorage
            for await(const product of cart){
                const {data} = await getProductApi(product.idProduct)
                data.quantity = product.quantity
                productTemp.push(data)
                data?.discount ? (totalPaymentTemp += calcPrice(data.discount, data.price) * data.quantity)
                : (totalPaymentTemp += data.price * data.quantity)
            }
            setProducts(productTemp)
            setTotalPayment(totalPaymentTemp)
        })()
    }, [cart])
    const calcPrice=(discount, price)=>{
        const currentDiscount = (price * discount) / 100;
        return (price- currentDiscount).toFixed(2)
    }
    return (
        <View>
            <Text style={styles.title} >Productos:</Text>
                {!products ? (
                <ComponentLoading text='Cargando carrito' size='large' />
            ):(map(products, (product)=> <Product setReloadCart={setReloadCart} key={product._id} product={product} /> ))}
        </View>
    )
}

const styles = StyleSheet.create({
    title:{
        fontSize: 18,
        fontWeight: 'bold'
    }
})