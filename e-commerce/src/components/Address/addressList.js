import React from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { map } from 'lodash'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import colors from '../../styles/colors'
import { deleteAddressApi } from '../../api/address';
import Toast from 'react-native-root-toast';
import useAuth from '../../hooks/useAuth';

export default function AddressList({ addresses,setRealoadAddress }) {
    const { auth } = useAuth()
    const navigation = useNavigation()

    const deleteAddressAlert = address => {
        //Mensaje de alerta
        Alert.alert(
            'Eliminando dirección',
            `¿Estás seguro de eliminar la direción ${address.title}?`,
            [{text: 'No'}, {text: 'Si', onPress: ()=> deleteAddress(address._id)}],
            // solo se cierra si da en alguna opcion
            {cancelable: false}
        )
    }

    const deleteAddress = async (idAddress)=>{
        try {
            await deleteAddressApi(auth, idAddress)
            setRealoadAddress(true)
        } catch (error) {
            Toast.show(error,{
                position: Toast.positions.BOTTOM
            }) 
            setLoading(false)
        }
    }

    const goToUpdateAddress= (idAddress)=>{
        navigation.navigate('add-addresses', {idAddress})
    }

    return (
        <View style={styles.container} >
            {map(addresses, (address) => (
                <View key={address.id} style={styles.address} >
                    <Text style={styles.title} >{address.title}</Text>
                    <Text>{address.name_lastname}</Text>
                    <View style={styles.blockLine} >
                        <Text>{address.state},</Text>
                        <Text>{address.city},</Text>
                        <Text>{address.postal_code}</Text>
                    </View>
                    <Text>{address.country}</Text>
                    <Text>Número de telefono: {address.phone}</Text>
                    <View style={styles.actions} >
                        
                        <Icon.Button name="edit" backgroundColor={colors.primary} >
                            <Text style={{ fontSize: 15, color: colors.bgLight }} 
                                onPress={()=> goToUpdateAddress(address._id)} 
                            >
                                Editar
                            </Text>
                        </Icon.Button>
                        
                        <Icon.Button name="trash" backgroundColor={colors.danger} onPress={()=> deleteAddressAlert(address)} >
                            <Text style={{ fontSize: 15, color: colors.bgLight }}>
                                Eliminar
                            </Text>
                        </Icon.Button>
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    address: {
        borderWidth: 0.9,
        borderRadius: 0.5,
        borderColor: '#ddd',
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginBottom: 15
    },
    title: {
        fontWeight: 'bold',
        paddingEnd: 5
    },
    blockLine: {
        /* todo en una linea */
        flexDirection: 'row'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30
    }
})