import axios from 'axios';
import {constans} from '../utils/constants';
export async function registerApi(formDate){
    try {
        
        const url = `${constans.API_URI}/auth/local/register`
        const response = await axios.post(url, formDate,{
            headers:{
                "Content-Type":"application/json"
            }
        })        
        return response
    } catch (error) {
        return error.response.data
    }
}

export async function loginApi(formData){
    try {
        const url = `${constans.API_URI}/auth/local`
        const response = await axios.post(url, formData, {
            headers:{
                "Content-Type":"application/json"
            }
        })
        return response
    } catch (error) {
        
        return error.response.data
    }
}

export async function getMeApi(token){

    try {
        const url = `${constans.API_URI}/users/me`
        const {data} = await axios.get(url,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        
        return data
    } catch (error) {
        console.log(error)
        return error.response.data.error
    }
} 

export async function updateUserApi(auth, formData){
    try {
        
        const url = `${constans.API_URI}/users/${auth.idUser}`
        const {data} = await axios.put(url, formData, {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${auth.token}`
            }
        })
        
        return data
    } catch (error) {
        
        return error.response.data
    }
}