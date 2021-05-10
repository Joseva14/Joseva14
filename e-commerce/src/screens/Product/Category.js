import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { View, Text } from 'react-native'

import { getLastProductsApi } from '../../api/product';
import FlatListProduct from '../../components/Home/FlatListProduct';

export default function Category({ route: { params } }) {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pageCurrent, setPageCurrent] = useState(0)

    useFocusEffect(
        useCallback(
            () => {
                (async () => {
                    setIsLoading(true)

                    const { data } = await getLastProductsApi(pageCurrent, params.idCategory)
                    setProducts(data)
                    setProducts(products.concat(data))
                    setIsLoading(false)
                })()
            },
            [],
        )
    )
    return (
        <>
            {products &&
                <FlatListProduct products={products} isLoading={isLoading} setPageCurrent={setPageCurrent} setIsLoading={setIsLoading} title={params.nameCategory} />
            }
        </>
    )
}
