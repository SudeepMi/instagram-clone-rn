import React, { useEffect, useState } from 'react'
import SignedInStack, { SignedOutStack } from './navigation'
import firebase from './firebase';
import * as SplashScreen from 'expo-splash-screen';

const AuthNavigation = () => {
    const [CurrentUser, setCurrentUser] = useState(null)
    const [isReady, setisReady] = useState(false)

    const userHandler = async (user) =>{
        await (user) ? setCurrentUser(user) : setCurrentUser(null)
        return setisReady(true);
    } 
    useEffect(() => {
        
        async function prepare(){
            try {
            await SplashScreen.preventAutoHideAsync().then((res)=>{
                if(!res){
                    setisReady(false)
                    firebase.auth().onAuthStateChanged(user => userHandler(user))
                }
            })
           
            } catch (error) {
                console.warn(error)
            }
        }
        prepare()
    }, [])

    useEffect(() => {
        async function handle(){
            if(isReady){
                await SplashScreen.hideAsync()
             }else{
                SplashScreen.preventAutoHideAsync()
            }  
        }
        handle()
    }, [isReady])

    
    

        
    return <>{ isReady && (CurrentUser ? <SignedInStack  /> : <SignedOutStack />)}</>


    
}

export default AuthNavigation
