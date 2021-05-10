import {constans} from '../utils/constants';
import axios from 'axios';

export async function getOrdersApi(auth){
    try {
        const url = `${constans.API_URI}/orders`
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