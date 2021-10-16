import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { View, Text, Image, TextInput, Button } from 'react-native'
import { Divider } from 'react-native-elements'
import * as Yup from 'yup'
import validUrl from 'valid-url'
import firebase from '../../firebase'

const UploadSchema = Yup.object().shape({
    imageUrl: Yup.string().url('URL must be valid').required("URL is required"),
    caption: Yup.string().required('Caption is Required').max(2000, 'Caption is reached to limit')
})
export default function FormikPostUploader({ navigation }) {
    const [PlaceHolderImg, setPlaceHolderImg] = useState('https://images.pexels.com/photos/1501392/pexels-photo-1501392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
    const [CurrentLoggedInUser, setCurrentLoggedInUser] = useState(null)

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

    const UploadPost = (imageUrl, caption) => {
        const unsubscribe = firebase.firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.email)
            .collection('posts')
            .add({
                imageUrl: imageUrl,
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
                initialValues={{ imageUrl: '', caption: '' }}
                onSubmit={(values) => console.log(values)}
                validationSchema={UploadSchema}
                validateOnMount={true}
                onSubmit={values => {
                   UploadPost(values.imageUrl,values.caption)
                }}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                    <>
                        <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Image source={{ uri: validUrl.isUri(PlaceHolderImg) ? PlaceHolderImg : 'https://images.pexels.com/photos/1501392/pexels-photo-1501392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }}
                                style={{ width: 100, height: 100 }} />
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    placeholder="Write captions here......"
                                    placeholderTextColor="gray"
                                    multiline={true}
                                    style={{ color: 'white', fontSize: 19, marginLeft: 10 }}
                                    onChangeText={handleChange('caption')}
                                    onBlur={handleBlur('caption')}
                                    value={values.caption} />
                            </View>
                        </View>
                        <Divider orientation='vertical' width={0.2} />

                        <TextInput
                            placeholder="Enter URL "
                            placeholderTextColor="gray"
                            style={{ color: 'white' }}
                            onChangeText={handleChange('imageUrl')}
                            onBlur={handleBlur('imageUrl')}
                            value={values.imageUrl}
                            onChange={(e) => setPlaceHolderImg(e.nativeEvent.text)}
                        />
                        {!!errors.imageUrl && (
                            <Text style={{ color: 'red', fontSize: 12 }}>
                                {errors.imageUrl}
                            </Text>
                        )}
                        <View style={{ justifyContent: 'center', flexDirection: 'row', width: 200, alignItems: 'center', alignSelf: 'center', }}>
                            <Button title="Post" onPress={handleSubmit} disabled={!isValid} ></Button>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
}
