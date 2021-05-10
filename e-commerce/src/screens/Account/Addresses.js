import { useFocusEffect, useNavigation } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { View, StyleSheet, ScrollView, Text, TouchableWithoutFeedback } from 'react-native'
import { IconButton } from 'react-native-paper'
import {size} from 'lodash';


import { getAddressesApi } from '../../api/address'
import useAuth from '../../hooks/useAuth'
import ComponentLoading from '../../components/ComponentLoading';
import AddressList from '../../components/Address/addressList';

export default function Addresses() {
    const [addresses, setAddresses] = useState(null);
    const [realoadAddress, setRealoadAddress] = useState(false)
    const navigation = useNavigation();

    const {auth}= useAuth()
    useFocusEffect(
        useCallback(() => {
            
            (async()=>{
                setAddresses(null)
                const data =await getAddressesApi(auth)
                setAddresses(data)
                setRealoadAddress(false)
            })()
        },[realoadAddress],
    ))
    return (
        <ScrollView style={styles.container} >
            <Text style={styles.title} >Mis direcciones</Text>
            <TouchableWithoutFeedback onPress={()=> navigation.navigate('add-addresses')} >

                <View style={styles.addAddress} >
                    <Text style={styles.addAddressText} >Añadir una dirección</Text>
                    <IconButton icon='arrow-right' color='#000' size={19} />
                </View>
            </TouchableWithoutFeedback>
            {!addresses ? (
                <ComponentLoading size='large' color='#999999' />
            ):size(addresses) === 0 ? (
                <Text style={styles.noAddressText} >Crea tu primera dirección</Text>
            ): (
                <AddressList 
                    addresses={addresses}
                    setRealoadAddress={setRealoadAddress}
                />
            )}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    title: {
        fontSize: 20
    },
    addAddress: {
        borderWidth: 0.9,
        borderRadius: 5,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    addAddressText: {
        fontSize: 16
    },
    loading: {
        marginTop: 20
    },
    noAddressText:{
      fontSize: 16,
      marginVertical: 10,
      textAlign:'center',
      fontWeight: "bold"
    }
})