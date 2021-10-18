import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Pressable } from 'react-native'
import { Divider } from 'react-native-elements';
import firebase from '../firebase';

export default function LikesScreen({route, navigation}) {
    const [Likes, setLikes] = useState([])

    const getLikes = (post) =>{
        setLikes(post);
    }
    
    useEffect(() => {
        const {likes_by_users} = route.params
        getLikes(likes_by_users);
    }, [])
    return (
        <SafeAreaView style={{flex:1, backgroundColor:'black'}}>
        <View style={styles.container}>
           <Header navigation={navigation} />
           <Divider width={0.2} orientation='horizontal'  />
            {
                Likes.map((like,key)=>(
                    <LikesTab likes={like} key={key} />
                ))
            }
        </View>
       
        </SafeAreaView>
    )
}





const Header = ({navigation}) =>{
    return(
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={{uri: 'https://img.icons8.com/ios-filled/50/ffffff/back.png'}}
        style={{width:25,height:25}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Likes</Text>
        <Text></Text>
    </View>
    )
}


const LikesTab = ({likes}) => {

    const [Profile, setProfile] = useState({})
    useEffect(() => {
        firebase.firestore()
        .collection('users')
        .doc(likes)
        .onSnapshot(snap=>{
            setProfile(snap.data());
        })
    }, [])
    
    
   return (
    <View style={{ 
        flexDirection:'row', 
        justifyContent:'space-between',
        margin:5,
        marginVertical:10,
        alignItems:'center'
        }}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
            <Image
            source={{
                uri:Profile?.profile_picture
            }}
            style={styles.story} />
            <Text style={{color:'#a9b0ba',fontWeight:'bold',marginLeft:10, fontSize:15}}>
                {Profile?.username}
            </Text>
        </View>
        <View>
            <Pressable style={{backgroundColor:'#4d8bf0', padding:10, borderRadius:3 }}>
            <Text style={{color:'aliceblue', fontWeight:'bold', fontSize:14}}> Follow </Text>
            </Pressable>
        </View>
    </View>
   );
}
   


const styles = StyleSheet.create({
    container:{
        marginHorizontal:10,
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        marginVertical:10,
       
    },
    headerText:{
        color:'#a9b0ba',
        fontSize:20,
        marginRight:27.5,
        fontWeight:'bold'
    },
        story:{
            width:60,
            height:60,
            borderRadius:50,
            borderWidth:1,
            marginLeft:15,
            borderColor:'green'
        },
        storyWrapper:{
            marginVertical:10,
        },
       
        
    
})
