import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Platform, StatusBar, ScrollView } from 'react-native'
import BottomTabs, { icons, Icons } from '../components/home/BottomTabs'
import Header from '../components/home/Header'
import Post from '../components/home/Post'
import Stories from '../components/home/Stories'
import { POST } from '../data/Post'
import firebase from '../firebase'

export default function HomeScreen({navigation}) {
    const [posts, setposts] = useState([])
    useEffect(() => {
        return firebase.firestore().collectionGroup('posts')
        .orderBy('created_at','desc')
        .onSnapshot(snap=>{
            setposts(snap.docs.map(doc=> (
                {id: doc.id, ...doc.data()}
                )));
        })
    }, [])
    return (
        <SafeAreaView style={styles.container}>
        <Header navigation={navigation} />
        <Stories />
        <ScrollView showsVerticalScrollIndicator={false}>
        { posts.map((post,key)=>{
            return <Post post={post} key={key} navigation={navigation} />
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