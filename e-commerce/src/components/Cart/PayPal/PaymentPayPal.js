import { useNavigation, useRoute } from '@react-navigation/native';
import { size } from 'lodash';
import React, { useEffect, useState } from 'react'
import { View, Dimensions, Image } from 'react-native'
import { WebView } from 'react-native-webview';
import Toast from 'react-native-root-toast';

import { deleteCartApi, paymentCartApi } from '../../../api/cart';
import useAuth from '../../../hooks/useAuth';

const { width, height } = Dimensions.get('screen');

export default function PaymentPayPal() {
    const route = useRoute()
    const navigation = useNavigation()
    const { auth } = useAuth()
    const [check, setCheck] = useState(false)
    const [productsMessages, setProductsMessages] = useState('')
    
    useEffect(() => {
        let productTex=''
        route.params.products.forEach(product=>{
            productTex+=`${product.title},`
        })
        setProductsMessages(productTex)
    }, [])
    
    const stateChng = async(navState) => {
        
        const { url, title } = navState
        
        if (title.startsWith('https://pymes-shop-strapi.herokuapp.com/success') && !check) {
            console.log(title)
            let splitUrl = url.split('?')
            let splitOtherHalf = splitUrl[1].split('&');
            let paymentId = splitOtherHalf[0].replace("paymentId=", "");
            let token = splitOtherHalf[1].replace("token=", "");
            let PayerID = splitOtherHalf[2].replace("PayerID=", "");
            const {data}=await paymentCartApi(auth, paymentId, route.params.products, route.params.selectedAddress)
            if(size(data) > 0){
                await deleteCartApi()
                navigation.navigate('account', {screen: 'orders'})
            }else{
                Toast.show('Error al realizar el pedido',{
                    position: Toast.positions.CENTER
                })
            }
        }else{
            setCheck(!check)
        }
    }
    

    return (
        <WebView 
            startInLoadingState={true}
            onNavigationStateChange={stateChng}
            renderLoading={() => <Loading />}
            source={{ uri: `https://pymes-shop-strapi.herokuapp.com/orders/${route.params.amt}/${route.params.description}/${productsMessages}`, 
                    headers:{
                        Authorization: `Bearer ${auth.token}`
                    }
            }} />

                
     );
}

const Loading = () => {
    return(
      <View style={{height:height,width:width,justifyContent:'center',alignItems:'center'}}>
          <Image 
          source={require('./paypal.png')}
          style={{width:250,height:100,resizeMode:'contain'}}
          />
      </View>
    )
  }