import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { constans } from '../../utils/constants'

export default function Order({order}) {
    return (
        <View style={styles.container} >
            <View style={styles.containerImage} >
                <Image style={styles.image} source={{uri: `${constans.API_URI}${order.product.main_image.url}`}} />
            </View>
            <View style={styles.info} >
                <Text style={styles.name} numberOfLines={2} ellipsizeMode='tail' >
                    {order.product.title}
                </Text>
                <Text>Cantidad: {order.quantity}</Text>
                <Text>Total pagado: ${order.productsPayment}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        borderBottomWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: -20,
        paddingVertical: 5,
        flexDirection: 'row' 
    },
    containerImage:{
        width:'30%',
        height: 120,
        padding: 10
    },
    image:{
        height:'100%',
        resizeMode: 'contain'
    },
    info:{
        width: '70%',
        justifyContent: 'center'
    },
    name:{
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5
    }
})