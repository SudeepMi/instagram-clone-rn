import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import validator from 'email-validator'
import * as Yup from 'yup'
import { Formik } from 'formik'
import firebase from '../../firebase'


const SignupForm = ({navigation}) => {
    const [Loading, setLoading] = useState(false)
  
    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required'),
        username: Yup.string().required('Email is required'),
    })


    const onSignup = async (email,password,username) =>{
        setLoading(true)
        try {
            const response = await fetch('https://randomuser.me/api');
            const data = await response.json()
            const img =  data.results[0].picture.large
            const Authuser  = await firebase.auth().createUserWithEmailAndPassword(email,password);
            await firebase.firestore().collection('/users').doc(Authuser.user.email).set({
                        owner_id: Authuser.user.uid,
                        username:username,
                        email:email,
                        profile_picture: img
                    }).then(res=>{
                        if(res){
                            console.log(res.id)
                            setLoading(false)
                        }
                    })
        } catch (error) {
            Alert.alert("🔥 Signup Failed", error.message)
            setLoading(false)
        }
    }
    return (
        <View>
        <Formik
            initialValues={{ email: '', password: '', username: '' }}
            onSubmit={values => {
                onSignup(values.email, values.password, values.username)
            }}
            validationSchema={LoginSchema}
            validateOnMount={true} >

            {({ handleBlur, handleChange, handleSubmit, values, errors, isValid }) => (
                <View>
                    <View style={styles.wrapper}>
                        <TextInput
                            style={[styles.inputField, {
                                borderColor: values.email.length < 1 || validator.validate(values.email) ? '#ccc' : 'red'
                            }]}
                            placeholder="Email"
                            placeholderTextColor="#444"
                            autoCapitalize="none"
                            keyboardType="email-address"
                            textContentType="emailAddress"
                            autoFocus={true}
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                            value={values.email}
                        />

                        <TextInput
                            style={styles.inputField}
                            placeholder="Username"
                            placeholderTextColor="#444"
                            autoCapitalize="none"
                            textContentType="givenName"
                            autoFocus={true}
                            onBlur={handleBlur('username')}
                            onChangeText={handleChange('username')}
                            value={values.username}
                        />

                        <TextInput
                            style={styles.inputField}
                            placeholder="Password"
                            placeholderTextColor="#444"
                            autoCapitalize="none"
                            textContentType="password"
                            autoCorrect={false}
                            secureTextEntry={true}
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            value={values.password} />
                    </View>
                            { Loading ?  
                    <Pressable titleSize={20} style={styles.btn} disabled={true}>
                        <Text style={styles.btnText}>🔥 Signing up</Text>
                    </Pressable> : 
                    <Pressable titleSize={20} style={styles.btn} onPress={handleSubmit}>
                    <Text style={styles.btnText}>Sign up</Text>
                </Pressable> 
                    }
                    <View style={styles.signup}>
                        <Text>Already Have an accoutn?</Text>
                        <TouchableOpacity onPress={()=>navigation.push('LoginScreen')}>
                            <Text style={{ color: "#6bb0f5" }}> Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#fafafa",
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    wrapper: {
        marginTop: 40
    },
    btn: {
        backgroundColor: "#0096f6",
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40,
        borderRadius: 5,
    },
    btnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    signup: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        marginTop: 40
    }
})

export default SignupForm
