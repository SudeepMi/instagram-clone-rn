import React from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import validator from 'email-validator'
import * as Yup from 'yup'
import { Formik } from 'formik'
import firebase from '../../firebase'


const LoginForm = ({navigation}) => {
    const LoginSchema = Yup.object().shape({
        email:Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    })

    const onLogin = async (email, password) =>{
        try {
            await firebase.auth().signInWithEmailAndPassword(email,password);
            console.log("logged in");
        } catch (error) {
           
            Alert.alert(
                "🔥 Login Failed",
                error.message +"\n \n What would you want to do next? 🤔"  ,[
                    {
                        text:"Cancel",
                        style:'cancel',
                        onPress:()=>console.log("ok")
                    },
                    {
                        text:"Sign Up",
                        style:'default',
                        onPress:()=> navigation.push('SignupScreen')
                    },                    
                ]);
        }
    }
    return (
        <Formik
        initialValues={{email:'',password:''}}
        onSubmit={values=>{
            onLogin(values.email, values.password)
        }}
        validationSchema={LoginSchema}
        validateOnMount={true} >
            
             {({ handleBlur, handleChange, handleSubmit, values, errors, isValid })=>(
        <View>
            
            <View style={styles.wrapper}>
            <TextInput
            style={[styles.inputField,{
                borderColor: values.email.length < 1 || validator.validate(values.email) ? '#ccc' :'red'
            }]}
            placeholder="Phone Number, Email, username"
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
        <View style={{alignItems:'flex-end', marginBottom:30}}>
            <Text style={{color:"#6bb0f5"}}>Forgot Password?</Text>
        </View>
        <Pressable titleSize={20} style={styles.btn} onPress={handleSubmit} disabled={( validator.validate(values.email) || validator.validate(values.password)) ? false : true }>
            <Text style={styles.btnText}>Log In</Text>
        </Pressable>
        <View style={styles.signup}>
            <Text>Dont Have an accoutn?</Text>
            <TouchableOpacity onPress={()=>navigation.push('SignupScreen')}>
                <Text style={{color:"#6bb0f5"}}> Sign Up</Text>
            </TouchableOpacity>
        </View>
        </View> )}
        </Formik>
    )
}

const styles=StyleSheet.create({
    inputField:{
        borderRadius:4,
        padding:12,
        backgroundColor:"#fafafa",
        marginBottom:10,
        borderWidth:1
    },
    wrapper:{
        marginTop:40
    },
    btn:{
        backgroundColor:"#0096f6",
        alignItems:'center',
        justifyContent:'center',
        minHeight:40,
        borderRadius:5,
    },
    btnText:{
        color:'white',
        fontWeight:'bold',
        fontSize:20
    },
    signup:{
        flexDirection:'row',
        width:'100%',
        justifyContent:'center',
        marginTop:40
    }
})

export default LoginForm
