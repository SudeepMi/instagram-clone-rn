import React, { useEffect, useState } from 'react'
import SignedInStack, { SignedOutStack } from './navigation'
import firebase from './firebase';

const AuthNavigation = () => {
    const [CurrentUser, setCurrentUser] = useState(null)
    const userHandler = user => user ? setCurrentUser(user) : setCurrentUser(null)
    useEffect(() => {
        firebase.auth().onAuthStateChanged(user => userHandler(user))
    }, [])
    return <>{CurrentUser ? <SignedInStack /> : <SignedOutStack />}</>
}

export default AuthNavigation
