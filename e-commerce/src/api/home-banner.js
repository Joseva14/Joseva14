import { constans } from '../utils/constants';
import axios from 'axios';

export async function getBannersApi(){
    try {
        const url = `${constans.API_URI}/home-banners`
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}