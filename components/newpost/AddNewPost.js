import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import FormikPostUploader from './FormikPostUploader'

export default function AddNewPost({navigation}) {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <FormikPostUploader navigation={navigation} />
        </View>
       
    )
}

const Header = ({navigation}) =>{
    return(
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Image source={{uri: 'https://img.icons8.com/ios-filled/50/ffffff/back.png'}}
        style={{width:30,height:30}} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Add New Post</Text>
        <Text></Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal:10
    },
    headerContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    headerText:{
        color:'white',
        fontSize:20,
        marginRight:27.5,
        fontWeight:'bold'
    }
})
