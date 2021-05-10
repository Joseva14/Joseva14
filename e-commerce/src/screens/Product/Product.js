import React, { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import { getProductApi } from '../../api/product'
import StatusBarCustom from '../../components/StatusBarCustom';
import colors from '../../styles/colors';
import Search from '../../components/Search';
import ComponentLoading from '../../components/ComponentLoading';
import CarouselImage from '../../components/Product/CarouselImage';
import Price from '../../components/Product/Price';
import Quantity from '../../components/Product/Quantity';
import Buy from '../../components/Product/Buy';
import Favorite from '../../components/Product/Favorite';

export default function Product({ route: { params } }) {

    const [product, setProduct] = useState(null)
    const [images, setImages] = useState([])
    const [quantity, setQuantity] = useState(1)
    console.log(quantity)
    useEffect(() => {
        (async () => {
            setProduct(null)
            const { data } = await getProductApi(params.idProduct)
            setProduct(data)

            //crea array con la primera imagen
            const arrayImages = [data.main_image]
            arrayImages.push(...data.images)
            setImages(arrayImages)
        })()
    }, [params])
    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barsStyle='light-content' />
            <Search />
            {!product? (
                <ComponentLoading size='large' text='cargando producto...' />
            ):(
                <ScrollView style={styles.conatinger} >
                    <Text style={styles.title} >{product.title}</Text>
                    <CarouselImage images={images} />
                    <View style={styles.conatingerView} >
                        <Price price={product.price} discount={product.discount} />
                        <Quantity quantity={quantity} setQuantity={setQuantity} />
                        <Buy product={product} quantity={quantity} />
                        <Favorite product={product} />
                    </View>
                    {product?.description && <Text>{product?.description}</Text>}
                </ScrollView>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    conatinger:{
        paddingBottom: 50
    },
    title:{
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        padding: 10
    },
    conatingerView:{
        padding: 10
    }
})