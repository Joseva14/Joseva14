import React, { useState } from 'react'
import { StyleSheet, View, Keyboard, Animated } from 'react-native'
import { Searchbar } from 'react-native-paper'
import { useNavigation, useRoute } from '@react-navigation/native';

import { AnimatedIcon, inputAnimation, inputAnimationWidth, animatedTransition, animatedTransitionReset, arrowAnimation } from './SearchAnimation';
import colors from '../../styles/colors';
import SearchHistory from './SearchHistory';
import { updateSearchHistoryApi } from '../../api/search';

export default function Search({currentSearch}) {
    const navigation = useNavigation()
    const [searchQuery, setSearchQuery] = useState('')
    const [showHistory, setShowHistory] = useState(false)
    const [containerHeight, setContainerHeight] = useState(0)
    /**
     * información de la ruta
     */
    const route = useRoute()

    const onChangeSearch = (query) => setSearchQuery(query)
    
    const openSearch = () => {
        animatedTransition.start();
        setShowHistory(true)
    }

    const closeSearch = () => {
        animatedTransitionReset.start()
        Keyboard.dismiss()
        setShowHistory(false)
    }

    const onSearch = async (reuseSearch) => {
        const isReuse = typeof reuseSearch === 'string';

        closeSearch();

        !isReuse && (await updateSearchHistoryApi(searchQuery))

        if(route.name === 'search'){
            navigation.push('search', {
                search: isReuse ? reuseSearch : searchQuery
            })
        }else{

            navigation.navigate('search', {
                search: isReuse ? reuseSearch : searchQuery
            })
        }
    }
    return (
        <View
            style={styles.container}
            onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
        >
            <View style={styles.containerInput}>
                <AnimatedIcon
                    name="arrow-left"
                    size={20}
                    style={[styles.backArrow, arrowAnimation]}
                    onPress={closeSearch}
                />

                <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
                    <Searchbar
                        placeholder="Busca tu producto"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        onFocus={openSearch}
                        onSubmitEditing={onSearch}
                    />
                </Animated.View>
            </View>
            <SearchHistory
                showHistory={showHistory}
                containerHeight={containerHeight}
                onSearch={onSearch}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.bgDark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    containerInput: {
        position: "relative",
        alignItems: "flex-end",
    },
    backArrow: {
        position: "absolute",
        left: 0,
        top: 15,
        color: colors.fontLight,
    },
});