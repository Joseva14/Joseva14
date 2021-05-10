import React, { useEffect, useState } from 'react'
import { size } from 'lodash'
import { View, Text } from 'react-native'

import { searchProductsApi } from '../../api/search'
import StatusBar from '../../components/StatusBarCustom'
import colors from '../../styles/colors'
import Search from '../../components/Search';
import ComponentLoading from '../../components/ComponentLoading'
import ResultNotFound from '../../components/Search/ResultNotFound'
import ProductList from '../../components/Product/ProductList'
/**
 * 
 * @param {*} search parámetro de busqueda 
 */
export default function SearchScreen({route: {params:{search}}}) {
    const [products, setProducts] = useState([])
    useEffect(() => {

        (async()=>{
            setProducts(null);
            const {data} = await searchProductsApi(search)
            setProducts(data)
        })()
    }, [search])
    return (
        <>
            <StatusBar backgroundColor={colors.bgDark} barStyle='light-content' />
            <Search currentSearch={search} />
            {!products ? (
                <ComponentLoading text='Buscando productos' />
            ): size(products) === 0 ?(
                <ResultNotFound search={search} />
            ): (
                <ProductList products={products} />
            )}
        </>
    )
}
