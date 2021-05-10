import { constans } from "../utils/constants";
import axios from "axios";

export async function getLastProductsApi(pageCurrent=0, idCategory){
    const url = idCategory==null ?`${constans.API_URI}/products?_limit=10&_sort=createAt:DESC&_start=${pageCurrent}`
        : `${constans.API_URI}/products?_limit=10&_sort=createAt:DESC&_start=${pageCurrent}&category=${idCategory}`
    
    try {
        const response = await axios.get(url)
        return response
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export async function getProductApi(id){
    try {
        const url = `${constans.API_URI}/products/${id}`
        const response = await axios.get(url)
        return response
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}

export async function getProductCategory(){
    try {
        const url = `${constans.API_URI}/categories`
        const {data} = await axios.get(url)
        return data
    } catch (error) {
        console.log(error)
        return error.response.data
    }
}