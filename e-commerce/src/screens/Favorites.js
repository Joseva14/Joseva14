import React, { useCallback, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import StatusBarCustom from '../components/StatusBarCustom'
import Search from '../components/Search'
import colors from '../styles/colors'
import { getFavorite } from '../api/favorite'
import useAuth from '../hooks/useAuth'
import ComponentLoading from '../components/ComponentLoading'
import { size } from 'lodash'
import FavoriteList from '../components/Favorites/FavoriteList'

export default function Favorites ()  {
    const [products, setProducts] = useState(null)
    const [reloadFavorites, setReloadFavorites] = useState(false)
    const { auth } = useAuth()

    useFocusEffect(
        useCallback(() => {        
            (async()=>{
                setProducts(null)
                const {data} = await getFavorite(auth)
                setProducts(data)
            })()
            setReloadFavorites(false)
        },[reloadFavorites],)
    )
    return (
        <>
        <StatusBarCustom backgroundColor={colors.bgDark} barStyle='light-content' />
        <Search />
        {!products ?(
            <ComponentLoading text='cargando lista' />
        ): size(products) === 0 ?(
            <View style={styles.container} >
                <Text style={styles.title} >Lista de favoritos</Text>
                <Text>No tienes productos en tú lista</Text>
            </View>
        ):(
            <FavoriteList products={products} setReloadFavorites={setReloadFavorites} />
        )}
        </>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    title:{
        fontSize:19,
        fontWeight: 'bold',
        marginBottom: 5
    }
})