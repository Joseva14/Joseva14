import React from 'react'
import {  ScrollView, StyleSheet, Text } from 'react-native'
import { map } from 'lodash'
import Product from './Product'

export default function FavoriteList({products, setReloadFavorites}) {
    return (
        <ScrollView contentContainerStyle={styles.container} >
            <Text styles={styles.title} >Lista de favoritos</Text>
            {map(products, (item)=>(
                <Product key={item._id} item={item} setReloadFavorites={setReloadFavorites} />
            ))}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    title:{
        fontWeight: 'bold',
        fontSize: 19,
        marginBottom: 5
    }
})