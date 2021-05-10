import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet } from 'react-native'

import colors from '../../styles/colors'
import { constans } from '../../utils/constants'

export default function RenderProduct({ item }) {
    const navigation = useNavigation()
    const goToProduct = (id) => {
        navigation.navigate('product', { idProduct: id })
    }
    return (
        <TouchableWithoutFeedback
            onPress={() => goToProduct(item._id)}
        >
            <View style={styles.containerProduct} >
                <View style={styles.product}>
                    <View style={styles.rectanglePrice} ><Text style={styles.titleDiscount} >${item.price}</Text></View>
                    {item.discount && <View style={styles.rectangleDiscount} ><Text style={styles.titleDiscount} >{item.discount}%</Text></View>}
                    <Image
                        style={styles.image}
                        source={{
                            uri: `${constans.API_URI}${item.main_image.url}`,
                        }}
                    />
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail' >
                        {item.title}
                    </Text>

                </View>
            </View>

        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    containerProduct: {
        width: '50%',
        padding: 3
    },
    product: {
        backgroundColor: '#f0f0f0',
        padding: 10
    },
    rectanglePrice:{
        height: 20,
        width: 40,
        backgroundColor: colors.bgDark,
        position: 'absolute',
        zIndex: 99,
        marginBottom:140
    },
    titleDiscount:{
        fontWeight: 'bold',
        color:'white'
    },
    rectangleDiscount: {
        height: 20,
        width: 40,
        backgroundColor: 'red',
        position: 'absolute',
        zIndex: 99,
        marginTop:140
    },
    image: {
        height: 150,
        resizeMode: 'contain'
    },
    name: {
        marginTop: 15,
        fontSize: 18
    }
})