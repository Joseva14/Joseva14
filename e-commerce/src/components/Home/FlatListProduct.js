import React from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'

import Banners from '../Product/Banners'
import RenderProduct from './RenderProduct'

export default function FlatListProduct({products, isLoading, setPageCurrent, pageCurrent, setIsLoading, title}) {

    const Footer = () => {
        return (isLoading ?
            <View style={styles.loader} >
                <ActivityIndicator size='large' />
            </View> : null
        )
    }

    const handleLoadMore = () => {
        setPageCurrent(pageCurrent + 10)
        setIsLoading(true)
    }

    return (
        <FlatList
            ListHeaderComponent={
                <>
                    {title== 'Nuevos Productos' ?<Banners /> : null }
                    <Text style={styles.title} >{title}</Text>
                </>
            }
            data={products}
            renderItem={({ item }) => (<RenderProduct item={item} />)}
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
    )
}

const styles = StyleSheet.create({
    loader: {
        marginTop: 10,
        alignItems: 'center'
    },
    tagView: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "flex-start",
        margin: -3,
        padding: 5,

    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 20
    }
})