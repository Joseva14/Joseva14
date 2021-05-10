import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-root-toast';

import { addFavoriteApi, isFavoriteApi, deleteFavoriteApi } from '../../api/favorite'
import useAuth from '../../hooks/useAuth'
import { size } from 'lodash'

export default function Favorite({ product }) {
    const [isFavorite, setIsFavorite] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const { auth } = useAuth()
    useEffect(() => {
      (async ()=>{
        const {data} = await isFavoriteApi(auth,product._id)
        
        if(size(data) === 0) setIsFavorite(false)
        else setIsFavorite(true)
      })()
    }, [product])

    const addFavortite = async() => {
      if(!loading){
        setLoading(true)
        try {
          await addFavoriteApi(auth,product._id)
          setIsFavorite(true)
        } catch (error) {
          Toast.show(error,{
            position: Toast.positions.BOTTOM
          }) 
          setLoading(false)
        }
        setLoading(false)
      }
    }
    const deleteFavorites  = async() =>{
      if(!loading){
        setLoading(true)
        try {
          await deleteFavoriteApi(auth, product._id)
          setIsFavorite(false)
        } catch (error) {
          console.log(error)
        }
        setLoading(false)
      }
    }
    if(isFavorite === undefined ) return null
    return (
        <View style={{zIndex:1}} >
            <Button mode='contained' contentStyle={ isFavorite ? styles.btnDeleteFavoritesContent : styles.btnAddFavoritesContent} labelStyle={styles.btnLabel} onPress={ isFavorite ? deleteFavorites :addFavortite} style={styles.btn} loading={loading} >
                {isFavorite ? 'Eliminar de favoritos': 'Añadir a favoritos'}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    btnLabel: {
      fontSize: 18,
    },
    btn: {
      marginTop: 20,
    },
    btnAddFavoritesContent: {
      backgroundColor: "#057b00",
      paddingVertical: 5,
    },
    btnDeleteFavoritesContent: {
      backgroundColor: "red",
      paddingVertical: 5,
    }
  });