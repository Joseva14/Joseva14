import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import Toast from 'react-native-root-toast';

import { addProductCartApi } from '../../api/cart'

export default function Buy({ quantity, product }) {
  
    
    const addProductCart = async() => {
        const response = await addProductCartApi(product._id, quantity)
        if(response){
          Toast.show('Producto añadido al carrito',{
            position: Toast.positions.CENTER
          })
        }else{
          Toast.show('Error al añadir el producto',{
            position: Toast.positions.CENTER
          })
        }
    }
    return (
        <View style={{zIndex: 1}} >
            <Button
                style={styles.btn}
                mode='contained'
                contentStyle={styles.btnBuyContent}
                labelStyle={styles.btnLabel}
                onPress={addProductCart}
            >
                Añadir a la cesta
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
  btnBuyContent: {
    backgroundColor: "#008fe9",
    paddingVertical: 5,
  },
});