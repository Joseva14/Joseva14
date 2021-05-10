import React, { useEffect, useState } from 'react'

import { getLastProductsApi, getProductCategory } from '../../api/product'
import FlatListProduct from '../../components/Home/FlatListProduct';
import FloatingButton from '../../components/Home/FloatingButton';
import Search from '../../components/Search'
import StatusBarCustom from '../../components/StatusBarCustom'
import colors from '../../styles/colors'

export default function Home() {

    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [pageCurrent, setPageCurrent] = useState(0)
    const [categories, setCategories] = useState([])
    const [open, setOpen] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            setOpen(false)
            const response = await getProductCategory()
            setCategories(response)

            const { data } = await getLastProductsApi(pageCurrent)
            setProducts(products.concat(data))
            setIsLoading(false)
        })()
    }, [pageCurrent])

    return (
        <>
            <StatusBarCustom
                backgroundColor={colors.bgDark}
                barStyle='light-content'
            />
            <Search />


            {products &&
                <FlatListProduct products={products} isLoading={isLoading} setPageCurrent={setPageCurrent} pageCurrent={pageCurrent} setIsLoading={setIsLoading} title='Nuevos Productos' />
            }
            <FloatingButton categories={categories}/>
        </>
    )
}
