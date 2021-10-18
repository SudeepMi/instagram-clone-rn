import React, { useState } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Divider } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
export const icons = [
    {
        name:'Home',
        active:'https://img.icons8.com/ios/50/ffffff/home--v1.png',
        inactive:'https://img.icons8.com/ios-glyphs/50/ffffff/home--v1.png'
    },
    {
        name:'Search',
        active:'https://img.icons8.com/ios/50/ffffff/search.png',
        inactive:'https://img.icons8.com/ios-filled/50/ffffff/search--v1.png'
    },
    {
        name:'Reels',
        active:'https://img.icons8.com/ios/50/ffffff/instagram-reel.png',
        inactive:'https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png'
    },
    {
        name:'Shop',
        active:'https://img.icons8.com/ios/50/ffffff/shop.png',
        inactive:'https://img.icons8.com/ios-filled/50/ffffff/shop.png'
    },
    {
        name:'Profile',
        active:'https://randomuser.me/api/portraits/men/79.jpg',
        inactive:'https://randomuser.me/api/portraits/men/79.jpg'
    },
]
export default function BottomTabs({icons}) {
    const [ActiveTab, setActiveTab] = useState('Home')
    const IconSet = icons || []
    const Icon =({icon})=>(
       <TouchableOpacity onPress={()=>setActiveTab(icon.name)}>
            <Image source={{uri: ActiveTab===icon.name ? icon.inactive : icon.active}} 
            style={[styles.icons, icon.name==='Profile' ? styles.profilePic(ActiveTab):'']} />
        </TouchableOpacity>)
    
    return (
        <View  style={styles.wrapper}>
            <Divider orientation='vertical' width={1} />
        <View style={styles.container}>
            {IconSet.map((icon,index)=>(
                <Icon icon={icon} key={index} />
            ))}
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    icons:{
        width:30,
        height:30
    },
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
        height:50,
        padding:10
    },
    wrapper:{
        // position:'absolute',
        width:'100%',
        bottom:'0%',
        zIndex:999,
        backgroundColor:'#000'
    },
    profilePic:(activeTab='')=>({
        borderRadius:50,
        borderColor:'#fff',
        borderWidth: activeTab==='Profile' ? 2 : 0
    })
})


