import axios from "axios";
import { constans } from "../utils/constants";

export async function getAddressesApi(auth){
    try {
        const url = `${constans.API_URI}/addresses?user=${auth.idUser}`;
        const {data} = await axios.get(url, {
            headers:{
                Authorization: `Bearer ${auth.token}`
            }
        })
        return data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export async function addAddressApi(auth, address){
    try {
        const url = `${constans.API_URI}/addresses`;
        const response = await axios.post(url, {user: auth.idUser, ...address},{
            headers:{
                Authorization: `Bearer ${auth.token}`,
                "Content-Type":"application/json"
            }
        })
        return response
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export async function deleteAddressApi(auth, idAddress){
    try {
        const url = `${constans.API_URI}/addresses/${idAddress}`;
        const response = await axios.delete(url,{
            headers:{
                Authorization: `Bearer ${auth.token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
        return error.response.data       
    }
}

export async function getAddressApi(auth, idAddress){
    try {
        const url = `${constans.API_URI}/addresses/${idAddress}`;
        const response = await axios.get(url, {
            headers:{
                Authorization: `Bearer ${auth.token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}


export async function updateAddressApi(auth, address){
    try {
        const url = `${constans.API_URI}/addresses/${address._id}`;
        const response = await axios.put(url, address,{
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.token}`
            }
        })
        return response
    } catch (error) {
        console.log(error)
        return error.response.data       
    }
}