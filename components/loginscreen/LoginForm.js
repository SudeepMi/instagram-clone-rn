import React from 'react'
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import validator from 'email-validator'
import * as Yup from 'yup'
import { Formik } from 'formik'


const LoginForm = () => {
    const LoginSchema = Yup.object().shape({
        email:Yup.string().required('Email is required'),
        password: Yup.string().required('Password is required')
    })
    return (
        <Formik
        initialValues={{email:'',password:''}}
        onSubmit={values=>{
            console.log(values);
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
        <Pressable titleSize={20} style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Log In</Text>
        </Pressable>
        <View style={styles.signup}>
            <Text>Dont Have an accoutn?</Text>
            <TouchableOpacity>
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
