import React, { useState } from 'react'
import { Image, StyleSheet, Dimensions } from 'react-native'
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {size} from 'lodash';

import { constans } from '../../utils/constants';

/**
 * @param width ancho de la pantalla
 */
const width = Dimensions.get('window').width
const height = 500
export default function CarouselImage({images}) {
    const [imageActive, setImageActive] = useState(0)
    const renderItem = ({item, index})=>{
        return <Image style={styles.carousel} source={{uri: `${constans.API_URI}${item.url}`}} />
    }
    return (
        <>
            <Carousel 
                layout={'default'}
                data={images}
                sliderWidth={width}
                itemWidth={width}
                renderItem={renderItem}
                onSnapToItem={(index) => setImageActive(index) }
            />
            <Pagination 
                dotsLength={size(images)}
                activeDotIndex={imageActive}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}

            />
        </>
    )
}

const styles = StyleSheet.create({
    carousel:{
        width,
        height,
        resizeMode: 'contain'
    }
})