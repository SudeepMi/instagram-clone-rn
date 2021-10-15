import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { View, Text, StatusBar } from 'react-native'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import NewPostScreen from './screens/NewPostScreen'
import SignupScreen from './screens/SignupScreen'

const Stack = createStackNavigator()

const ScreenOption = {
    headerShown:false,
}
const SignedInStack = () =>
     (
       <NavigationContainer>
           <Stack.Navigator initialRouteName='LoginScreen' screenOptions={ScreenOption}>
               <Stack.Screen name='HomeScreen' component={HomeScreen} />
               <Stack.Screen name='NewPostScreen' component={NewPostScreen} />
               <Stack.Screen name='LoginScreen' component={LoginScreen} />
               <Stack.Screen name='SignupScreen' component={SignupScreen} />
           </Stack.Navigator>
       </NavigationContainer>
    )


export default SignedInStack
