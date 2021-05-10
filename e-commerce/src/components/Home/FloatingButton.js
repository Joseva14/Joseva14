import React from 'react'
import { FAB, Portal, Provider } from 'react-native-paper';
import { map } from 'lodash';

import colors from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';

export default function FloatingButton({categories}) {
    const navigation = useNavigation()
    const goProductCategory = (id, label)=>{
        navigation.navigate('category',{idCategory: id, nameCategory: label})
    }
    const [state, setState] = React.useState({ open: false });

    const onStateChange = ({ open }) => setState({ open });

    const { open } = state;

    return (
        <>
            <Provider>
                <Portal>
                    <FAB.Group                        
                        icon='plus'
                        open={open}
                        actions={
                            map(categories, category =>({icon: category.icon, label: category.label, onPress: ()=> goProductCategory(category._id, category.label)}))
                        }
                        onStateChange={onStateChange}
                    />
                </Portal>
            </Provider>
        </>
    )
}
