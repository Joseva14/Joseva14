import React from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import {  IconButton} from 'react-native-paper';
import { decreaseProductCartApi, deleteProductCartApi, increaseProductCartApi } from '../../api/cart';
import colors from '../../styles/colors';
import { constans } from '../../utils/constants';

export default function Product({product, setReloadCart}) {
    const calPrice = (price, discount)=>{
        if(!discount) return price
        const discountAmount = (price * discount) / 100
        return (price - discountAmount).toFixed(2)
    }
    
    const deleteProductPrice = async()=>{
        const response = await deleteProductCartApi(product._id)
        if(response) setReloadCart(true)
    }

    const increaseProductCart = async()=>{
        
        const response = await increaseProductCartApi(product._id)
        if(response) setReloadCart(true)
    }
    const decreaseProductCart = async ()=>{
        const response = await decreaseProductCartApi(product._id)
        if(response) setReloadCart(true)
    }
    return (
        <View style={styles.product} >
            <View style={styles.containerImage} >
                <Image style={styles.image}  source={{uri: `${constans.API_URI}${product.main_image.url}`}} />
            </View>
            <View style={styles.info} >
                <View>
                    <Text style={styles.name} numberOfLines={3} ellipsizeMode='tail' >{product.title}</Text>
                    <View style={styles.prices} >
                        <Text style={styles.currentPrice} >${calPrice(product.price, product.discount)}</Text>
                    </View>
                    {product.discount &&(
                        <View style={styles.containerDiscount} >
                            <Text style={styles.discountText} >Ahorras: </Text>
                            <Text style={styles.discountValue} >{((product.price * product.discount)/100).toFixed(2)}
                                ({product.discount} %)
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.btnsContainer} >
                <View style={styles.selectQuantity} >
                    <IconButton icon='plus' color='#fff' size={19} style={styles.btnQuantity} onPress={increaseProductCart} />
                    <TextInput style={styles.inputQuantity} value={product.quantity.toString()} />
                    <IconButton icon='minus' color='#fff' size={19} style={styles.btnQuantity} onPress={decreaseProductCart} />
                </View>
                
                <IconButton icon='delete' color='#fff' size={20} style={styles.btnQuantityDelete} onPress={deleteProductPrice} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    product:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#dadde1'
    },
    containerImage: {
        width: '40%',
        height: 170,
        backgroundColor: '#ebebeb',
        padding: 5
    },
    image:{
        height: '100%',
        resizeMode: 'contain'
    },
    info:{
        padding: 10,
        width: '60%',
        justifyContent: 'space-between'
    },
    name:{
        fontSize: 16,
    },
    prices:{
        flexDirection: 'row',
        marginTop:5,
        alignItems: 'flex-end'
    },
    currentPrice:{
        fontSize: 18,
        color: '#b12704'
    },
    btnsContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%'
    },
    selectQuantity:{
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnQuantity:{
        backgroundColor: colors.primary,
        borderRadius: 5,
        margin: 0
    },
    btnQuantityDelete:{
        backgroundColor: '#b12704',
        borderRadius: 5,
        margin: 0
    },
    inputQuantity:{
        paddingHorizontal: 10,
        fontSize: 16
    },
    containerDiscount:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    discountText:{
        fontSize: 14,
        color: '#747474'
    },
    discountValue:{
        fontSize: 14,
        color: '#747474',
        paddingLeft: 5
    }
})