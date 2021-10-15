import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import AddNewPost from '../components/newpost/AddNewPost'

export default function NewPostScreen({navigation}) {
    return (
       <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
           <AddNewPost navigation={navigation} />
       </SafeAreaView>
    )
}
