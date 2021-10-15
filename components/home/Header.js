import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'

export default function Header({navigation}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity >
           <Image
           source={require('../../assets/logo.png')}
           style={styles.logo}
           />
            </TouchableOpacity>
            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={()=>navigation.push('NewPostScreen')}>
                    <Image
                    source={{
                        uri:'https://img.icons8.com/ios/50/ffffff/plus.png'
                    }}
                    style={styles.icon}
                     />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                    source={{
                        uri:'https://img.icons8.com/ios/50/ffffff/like.png'
                    }}
                    style={styles.icon}
                     />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge}>
                        <Text style={styles.unreadBadgeText}>2</Text>
                    </View>
                    <Image
                    source={{
                        uri:'https://img.icons8.com/ios/50/ffffff/facebook-messenger.png'
                    }}
                    style={styles.icon}
                     />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    logo:{
        height:50,
        width:100,
        resizeMode:'contain',
        paddingVertical:20
    },
   
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        marginHorizontal:10,
       
    },
    iconsContainer:{
        flexDirection:'row'
    },
    icon:{
        width:25,
        height:25,
        marginLeft:10,
        resizeMode:'contain',
    },
    unreadBadge:{
        backgroundColor:'red',
        position:'absolute',
        left:20,
        bottom:13,
        width:20,
        height:20,
        borderRadius:20,
        alignItems:'center',
        zIndex:100,
    },
    unreadBadgeText:{
        color:'white',
        fontWeight:'800'
    }

})