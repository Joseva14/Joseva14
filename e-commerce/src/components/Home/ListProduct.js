import React from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    FlatList,
} from "react-native";
import { useNavigation } from '@react-navigation/native';

import { constans } from "../../utils/constants";
import Banners from "../Product/Banners";
import { ActivityIndicator } from "react-native-paper";

export default function ListProduct({ products, isLoading, setPageCurrent, pageCurrent, setIsLoading }) {
    const navigation = useNavigation()

    const goToProduct = (id) => {
        navigation.navigate('product', { idProduct: id })
    }

    const Footer = () => {
        return (isLoading ?
            <View style={styles.loader} >
                <ActivityIndicator size='large' />
            </View> : null
        )
    }

    const rederProduct = ({ item }) => {
        return (
            <TouchableWithoutFeedback

                onPress={() => goToProduct(item._id)}
            >
                <View style={styles.containerProduct} >
                    <View style={styles.product}>
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

    const handleLoadMore = ()=>{
        console.log('handleLoadMore')
        setPageCurrent(pageCurrent + 1)
        setIsLoading(true)
    }

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    <Banners />
                    <Text style={styles.title} >Nuevos Productos</Text>
                </>
            }

            data={products}
            renderItem={rederProduct}
            keyExtractor={product => product._id}
            columnWrapperStyle={styles.tagView}
            numColumns={4}
            ListFooterComponent={
                <>
                    <Footer />
                </>
            }
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0}
        />
    );
}

const styles = StyleSheet.create({
    tagView: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: -3,
        padding: 10,
        marginTop: 20
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20
    },
    containerProduct: {
        width: '50%',
        padding: 3
    },
    product: {
        backgroundColor: '#f0f0f0',
        padding: 10
    },
    image: {
        height: 150,
        resizeMode: 'contain'
    },
    name: {
        marginTop: 15,
        fontSize: 18
    },
    loader: {
        marginTop: 10,
        alignItems: 'center'
    }
});
