import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import SignupForm from '../components/loginscreen/SignupForm.js'

export default function SignupScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
            <Image source={{
                    uri: 'https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-png-instagram-logo-camel-productions-website-25.png', 
                    width:100,
                    height:100
                }} />
            </View>
            {/* loginform */}
            <SignupForm navigation={navigation} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white',
        paddingTop:50,
        paddingHorizontal:12
    },
    logoContainer:{
        alignItems:'center',
        marginTop:60
    }
})
