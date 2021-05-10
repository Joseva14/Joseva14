import React, { useEffect, useMemo, useState } from 'react';
import { Text, View, Button } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { RootSiblingParent } from 'react-native-root-siblings';

import AuthScreen from './src/screens/Auth';
import AuthContext from './src/context/AuthContext';
import AppNavigation from './src/navigation/AppNavigation';
import { getTokenApi, removeTokenApi, setTokenApi } from './src/api/token';
import jwtDecode from 'jwt-decode';


export default function App() {
  const [auth, setAuth] = useState(undefined);

  useEffect(() => {
    (async()=>{
      const token = await getTokenApi()
      
      if(token){
        
        setAuth({
          
          token,
          idUser:jwtDecode(token).id
        })
      }else{
        setAuth(null)
      }
    })()
  }, [])

  const logout = ()=>{
    if(auth){
      removeTokenApi()
      setAuth(null)
    }
  }

  const login = async (user) =>{
    console.log('user:',user)
    const {jwt} = user
    await setTokenApi(jwt)
    
    setAuth({
      token: jwt,
      idUser: jwtDecode(user.jwt).id,
    })
  }

  /**
   * @returns devuleve el objeto cada vez que el auth cambie
   */
  const authData = useMemo(
    ()=>({
      auth,
      login,
      logout
  }), [auth])
  
  if(auth === undefined) return null

  return (
    <AuthContext.Provider value={authData} >
      <PaperProvider>
        <RootSiblingParent>

          {auth ? 
          <AppNavigation />
          : <AuthScreen />}
        </RootSiblingParent>

      </PaperProvider>
    </AuthContext.Provider>
  );
}
