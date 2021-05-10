import { add, map } from 'lodash'
import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'

import ComponentLoading from '../ComponentLoading';
import colors from '../../styles/colors'

export default function AddressList({addresses, selectedAddress, setSelectedAddress}) {
    
    useEffect(() => {
        addresses && setSelectedAddress(addresses[0])
    }, [addresses])
    return (
        <View style={styles.container} >
            
            <Text style={styles.containerTitle}>Dirección de envio:</Text>
            {!addresses && <ComponentLoading text='Cargando direcciones' /> }
            {map(addresses, (address)=>(
                <TouchableWithoutFeedback key={address._id} onPress={()=> setSelectedAddress(address)} >
                    <View style={[
                        styles.address,
                        address._id=== selectedAddress?._id && styles.checked
                    ]} >
                        <Text style={styles.title} >{address.title}</Text>
                        <Text >{address.name_lastname}</Text>
                        <Text>{address.address}</Text>
                        <View style={styles.blockLine} >
                            <Text>{address.state}, </Text>
                            <Text>{address.city}, </Text>
                            <Text>{address.postal_code}</Text>
                        </View>
                        <Text>{address.country}</Text>
                        <Text>Numero de telefono: {address.phone}</Text>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        marginTop: 50
    },
    containerTitle:{
        paddingBottom: 10,
        fontSize: 18,
        fontWeight: 'bold'
    },
    address:{
        borderWidth: .5,
        borderRadius: 5,
        borderColor: '#ddd',
        padding:15,
        marginBottom: 15
    },
    title:{
        fontWeight: 'bold',
        paddingBottom: 5
    },
    blockLine:{
        flexDirection: 'row'
    },
    checked:{
        borderColor: colors.primary,
        backgroundColor: '#0098d330'
    }
})