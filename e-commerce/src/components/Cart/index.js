
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { size } from 'lodash'
import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Button } from 'react-native-paper'
import Search from '../Search';

import { getAddressesApi } from '../../api/address'
import { getProductCartApi } from '../../api/cart'
import useAuth from '../../hooks/useAuth'
import colors from '../../styles/colors'
import StatusBarCustom from '../StatusBarCustom'
import AddressList from './AddressList'
import NotProducts from './NotProducts'
import ProductList from './ProductList'

export default function index() {

    const [cart, setCart] = useState(null)
    const [products, setProducts] = useState(null)
    const [reloadCart, setReloadCart] = useState(false)
    const [addresses, setAddresses] = useState(null)
    const [selectedAddress, setSelectedAddress] = useState(null)
    const [totalPayment, setTotalPayment] = useState(null)
    const { auth } = useAuth()
    const navigation = useNavigation()
    useFocusEffect(
        useCallback(() => {
            (async () => {
                setCart(null)
                setAddresses(null)
                setSelectedAddress(null)

                loadCart()
                loadAddress()
            })()
        }, [])
    )

    /**
     * recarga cada vez que cambia de estado del listado de carrito
     */
    useEffect(() => {
        if (reloadCart) {
            loadCart()
            setReloadCart(false)
        }

    }, [reloadCart])
    const loadCart = async () => {
        const response = await getProductCartApi()
        setCart(response)
    }

    const loadAddress = async () => {
        const response = await getAddressesApi(auth)
        setAddresses(response)
    }

    const pay = ()=>{
        
        if(totalPayment != null && selectedAddress != null && products != null ){
            
            navigation.navigate('Payment',{
                'amt':totalPayment, 
                'description': `${selectedAddress.user.name}_${selectedAddress.user.lastname}`,
                'products':products,
                'selectedAddress': selectedAddress
            });
        }
    }
    
    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barStyle='light-content' />
            {!cart || size(cart) === 0 ? (
                <>
                    <Search />
                    <NotProducts />
                </>
            ) : (
                    <KeyboardAwareScrollView extraScrollHeight={25} >
                        <ScrollView style={styles.cartContainer} >
                            <ProductList cart={cart}
                                products={products}
                                setProducts={setProducts}
                                setReloadCart={setReloadCart}
                                setTotalPayment={setTotalPayment}
                            />
                            <AddressList selectedAddress={selectedAddress} addresses={addresses} setSelectedAddress={setSelectedAddress} />
                            <Button
                                mode="contained"
                                contentStyle={styles.btnContent}
                                labelStyle={styles.btnText}
                                onPress={pay}
                                
                            >
                                Pagar {totalPayment && `($ ${totalPayment})`}
                            </Button>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                )}
        </>
    )
}

const styles = StyleSheet.create({

    cartContainer: {
        padding: 10
    },
    btnContent: {
        paddingVertical: 4,
        backgroundColor: colors.primary,
    },
    btnText: {
        fontSize: 16,
    },
})