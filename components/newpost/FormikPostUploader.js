import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, Button, Pressable } from 'react-native'
import { Divider } from 'react-native-elements'
import * as Yup from 'yup'
import validUrl from 'valid-url'
import firebase from '../../firebase'
import { launchImageLibrary } from 'react-native-image-picker'
const image = require('../../assets/post.png')
const UploadSchema = Yup.object().shape({
    // imageUrl: Yup.string().url('URL must be valid').required("URL is required"),
    caption: Yup.string().required('Caption is Required').max(2000, 'Caption is reached to limit')
})
export default function FormikPostUploader({ navigation }) {
    const [PlaceHolderImg, setPlaceHolderImg] = useState(null)
    const [CurrentLoggedInUser, setCurrentLoggedInUser] = useState(null)
    const [Photo, setPhoto] = useState({});

    const HandleImagePick = () =>{
       
        let options = {
            mediaType:'photo',
            quality:1,
            includeBase64:true,
            selectionLimit:1
          };
          
      launchImageLibrary(options, (response)=> {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        }else {
          const source = { uri: response.assets[0].uri };
          setPlaceHolderImg('data:image/jpeg;base64,' + response.assets[0].base64);
          setPhoto({
           filePath: response.assets[0].fileName,
           fileData: response.assets[0].base64,
           fileUri: response.assets[0].uri,
           type: response.assets[0].type
          });
        }
      });
    }

    const getUsername = () => {
        const user = firebase.auth().currentUser
        const userData = firebase.firestore()
            .collection('users')
            .where('owner_id', '==', user.uid)
            .limit(1)
            .onSnapshot(snapshot => {
                return snapshot.docs.map(doc => {
                    setCurrentLoggedInUser({
                        username: doc.data().username,
                        profile_picture: doc.data().profile_picture
                    })
                })
            })
        return userData
    }
    useEffect(() => {
        getUsername()
    }, [])

    function urlToBlob(url) {
        return new Promise((resolve, reject) => {
           var xhr = new XMLHttpRequest();
           xhr.onerror = reject;
           xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                 resolve(xhr.response);
              }
           };
           xhr.open('GET', url);
           xhr.responseType = 'blob'; // convert type
           xhr.send();
        })
     }


    const UploadPost = async (caption) => {
        
        const unsubscribe =  await firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('posts')
            .add({
                imageUrl: PlaceHolderImg,
                user:CurrentLoggedInUser.username,
                caption: caption,
                profile_picture: CurrentLoggedInUser.profile_picture,
                comments: [],
                likes_by_users:[],
                owner_id:firebase.auth().currentUser.uid,
                owner_email: firebase.auth().currentUser.email,
                created_at:firebase.firestore.FieldValue.serverTimestamp()
            }).then(()=>navigation.goBack())
            return unsubscribe
    }
    return (
        <View >
            <Formik
                initialValues={{ caption: '' }}
                validationSchema={UploadSchema}
                validateOnMount={true}
                onSubmit={values => {
                  
                   UploadPost(values.caption)
                }}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={{ 
                            margin: 20, 
                            flexDirection: 'column', 
                            justifyContent: 'flex-end',
                         }}>
                            <View style={{height:250, backgroundColor:'black', marginBottom:15,flex:0 }}>
                                <Pressable onPress={HandleImagePick}>
                                <Image source={ PlaceHolderImg ? { uri: PlaceHolderImg} : image }
                                style={{ width: "100%", height: "100%", resizeMode:'cover' }}
                                progressiveRenderingEnabled={true} />
                                </Pressable>
                            
                            </View>
                            <View style={{ justifyContent: 'center', flexDirection: 'row', width: 300, alignItems: 'center', alignSelf: 'center', flex:0, height:100 }}>
                                <TextInput
                                    placeholder="Write captions here......"
                                    placeholderTextColor="gray"
                                    multiline={true}
                                    style={{ color: 'white', fontSize: 19, marginLeft: 0 }}
                                    onChangeText={handleChange('caption')}
                                    onBlur={handleBlur('caption')}
                                    value={values.caption} />
                            </View>
                        
                       
                        <View style={{ 
                                justifyContent:'center',
                                margin:'auto',
                                flexDirection: 'row', 
                                width: 200, 
                                alignItems:'center', 
                                alignSelf: 'center',
                                alignContent:'center', 
                                height:39, 
                                flexGrow:1 }}>

                            <Pressable 
                                onPress={()=>handleSubmit()} 
                                disabled={!isValid} 
                                style={
                                    { backgroundColor:'green', 
                                    width:'100%',
                                    height:'100%',
                                    justifyContent:'center',
                                    alignItems:'center',
                                    borderRadius:5
                                }
                                    }>
                                <Text style={{color:'white', fontWeight:'bold', fontSize:20 }}>POST</Text>
                            </Pressable>
                           
                        </View>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}
