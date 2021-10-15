import React from 'react'
import { SafeAreaView, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native'
import BottomTabs, { icons, Icons } from '../components/home/BottomTabs'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
import { POST } from '../data/Post'

export default function HomeScreen({navigation}) {
    return (
        <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <Stories />
        <ScrollView showsVerticalScrollIndicator={false}>
        { POST.map((post,key)=>{
            return <Post post={post} key={key} />
        }) }
        
        </ScrollView>
        <BottomTabs icons={icons} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'black',
        flex:1,
        // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
})