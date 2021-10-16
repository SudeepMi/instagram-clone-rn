import React from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'
import { USERS } from '../../data/Users'

export default function Stories() {
    return (
        <View style={styles.storyWrapper}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                { USERS.map((user,key)=>{
                   return <View key={key} style={{alignItems:'center'}}>
                   <Image 
                   source={{uri:user.image}}
                   style={styles.story}
                   />
                   <Text style={{color:'white', textAlign:'center'}}>
                       { user.user.length > 10 ? user.user.slice(0,10).toLowerCase() +'...' : user.user.toLowerCase() }
                   </Text>
                   </View>
                }) }
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    story:{
        width:70,
        height:70,
        borderRadius:50,
        borderWidth:2,
        marginLeft:19,
        borderColor:'green'
    },
    storyWrapper:{
        marginVertical:10,
    }
})
