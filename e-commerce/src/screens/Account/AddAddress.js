import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-root-toast';

import { formStyle } from '../../styles';
import { addAddressApi, getAddressApi,updateAddressApi } from '../../api/address';
import useAuth from '../../hooks/useAuth';

/**
 * @param params contiene la información que se le envia desde el navigate
 */
export default function AddAddress({route: {params}}) {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [newAddress, setNewAddress] = useState(true)
    const { auth } = useAuth()
    
    useEffect(() => {
        (async()=> {
            if(params?.idAddress){
                navigation.setOptions({title:'Actualizar dirección'})
                setNewAddress(false)
                const {data} = await getAddressApi(auth, params.idAddress)
                await formik.setFieldValue('_id', data._id)
                await formik.setFieldValue('title', data.title)
                await formik.setFieldValue('name_lastname', data.name_lastname)
                await formik.setFieldValue('address', data.address)
                await formik.setFieldValue('postal_code', data.postal_code)
                await formik.setFieldValue('city', data.city)
                await formik.setFieldValue('state', data.state)
                await formik.setFieldValue('country', data.country)
                await formik.setFieldValue('phone', data.phone)
                
            }
        })()
    }, [params])

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async(addressData)=> {
            setLoading(true)
            try {
                if(newAddress){
                    const {statusCode, error} = await addAddressApi(auth, addressData);   
                    if(statusCode) throw error
                }
                else{
                    const {statusCode, error} = await updateAddressApi(auth, addressData)
                    if(statusCode) throw error
                } 
                //volver a la vista anterior
                navigation.goBack();
            } catch (error) {
                Toast.show(error,{
                    position: Toast.positions.BOTTOM
                }) 
                setLoading(false)
            }
        }
    })
    return (
        <KeyboardAwareScrollView extraHeight={25} >
            <View style={styles.container} >
                <Text style={styles.title} >{newAddress ? 'Crear dirección': 'Actualizar Dirección'}</Text>
                <TextInput label='Titulo' style={formStyle.input} 
                    onChangeText={text => formik.setFieldValue('title', text)} 
                    value={formik.values.title}
                    error={formik.errors.title}
                />
                <TextInput 
                    label='Nombre y apellido' style={formStyle.input} 
                    onChangeText={text => formik.setFieldValue('name_lastname', text)} 
                    value={formik.values.name_lastname}
                    error={formik.errors.name_lastname}
                />
                <TextInput label='Dirección' style={formStyle.input} 
                    onChangeText={text => formik.setFieldValue('address', text)} 
                    value={formik.values.address}
                    error={formik.errors.address}
                />
                <TextInput label='Codigo-Postal' style={formStyle.input} 
                    onChangeText={text => formik.setFieldValue('postal_code', text)} 
                    value={formik.values.postal_code}
                    error={formik.errors.postal_code}
                />
                <TextInput label='Ciudad' style={formStyle.input} 
                    onChangeText={text => formik.setFieldValue('city', text)} 
                    value={formik.values.city}
                    error={formik.errors.city}
                />
                <TextInput label='Estado' style={formStyle.input} 
                    onChangeText={text => formik.setFieldValue('state', text)} 
                    value={formik.values.state}
                    error={formik.errors.state}
                />
                <TextInput label='País' style={formStyle.input} 
                    onChangeText={text => formik.setFieldValue('country', text)} 
                    value={formik.values.country}
                    error={formik.errors.country}
                />
                <TextInput label='Telefono' style={formStyle.input} 
                    onChangeText={text => formik.setFieldValue('phone', text)} 
                    value={formik.values.phone}
                    error={formik.errors.phone}
                />
                <Button mode='contained' style={[formStyle.btnSuccess, styles.btnSuccess]} onPress={formik.handleSubmit} loading={loading} >
                    {newAddress ? 'Crear dirección': 'Actualizar Dirección'}
                </Button>
            </View>
        </KeyboardAwareScrollView>
    )
}

function validationSchema(){
    return {
        title: Yup.string().required(true),
        name_lastname: Yup.string().required(true),
        address: Yup.string().required(true).min(5, true),
        postal_code: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        country: Yup.string().required(true),
        phone: Yup.string().required(true).min(5, true)
    }
}

function initialValues(){
    return {
        title: 'Casa Desconocido',
        name_lastname: 'Deconocido',
        address: '#0 calle 0-00',
        postal_code: '0000',
        city: 'Deconocido',
        state: 'Activo',
        country: 'Deconocido',
        phone: '00000000'
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 20
    },
    title:{
        fontSize: 20,
        paddingVertical: 20
    },
    btnSuccess:{
        marginBottom: 10
    }
})