import React, { useCallback, useState } from 'react'
import { ScrollView } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import { getMeApi } from '../../api/user';
import Search from '../../components/Search';
import StatusBarCustom from '../../components/StatusBarCustom';
import useAuth from '../../hooks/useAuth';
import colors from '../../styles/colors';
import ComponentLoading from '../../components/ComponentLoading';
import UserInfo from '../../components/Account/UserInfo';
import Menu from '../../components/Account/Menu';

export default function Account() {
    const [user, setUser] = useState(null)
    const { auth } = useAuth()

    //Funciona como useEffect, pero se puede hacer funciones asincronas
    useFocusEffect(
        useCallback(
            () => {
                (async () => {
                    const response = await getMeApi(auth.token)
                    setUser(response)
                })()
            },
            [],
        )
    )

    return (
        <>
            <StatusBarCustom backgroundColor={colors.bgDark} barStyle="light-content" />
            {!user ? (
                <ComponentLoading size='large' />
            )
                : (
                    <>
                        <Search />
                        <ScrollView >

                            <UserInfo user={user} />
                            <Menu />
                        </ScrollView>
                    </>
                )}

        </>
    )
}
