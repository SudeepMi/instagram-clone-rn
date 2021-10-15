import { Formik } from 'formik'
import React, { useState } from 'react'
import { View, Text, Image, TextInput, Button } from 'react-native'
import { Divider } from 'react-native-elements'
import * as Yup from 'yup'
import validUrl from 'valid-url'

const UploadSchema  = Yup.object().shape({
    imageUrl:Yup.string().url('URL must be valid').required("URL is required"),
    caption:Yup.string().required('Caption is Required').max(2000,'Caption is reached to limit')
})
export default function FormikPostUploader({navigation}) {
    const [PlaceHolderImg, setPlaceHolderImg] = useState('https://images.pexels.com/photos/1501392/pexels-photo-1501392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')
    return (
        <View >
            <Formik
            initialValues={{imageUrl:'',caption:''}}
            onSubmit={(values)=>console.log(values)}
            validationSchema={UploadSchema}
            validateOnMount={true}
            onSubmit={values=>{
                console.log(values);
                navigation.goBack()
            }}
            >
                {({ handleBlur, handleChange, handleSubmit, values, errors, isValid })=>(
                    <>
                    <View style={{margin:20, flexDirection:'row',justifyContent:'space-between'}}>
                        <Image source={{uri: validUrl.isUri(PlaceHolderImg) ? PlaceHolderImg : 'https://images.pexels.com/photos/1501392/pexels-photo-1501392.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'}} 
                        style={{width:100, height:100}} />
                       <View style={{flex:1}}>
                        <TextInput 
                        placeholder="Write captions here......" 
                        placeholderTextColor="gray"
                        multiline={true}
                        style={{color:'white', fontSize:19, marginLeft:10}}
                        onChangeText={handleChange('caption')}
                        onBlur={handleBlur('caption')}
                        value={values.caption} />
                        </View>
                        </View>
                        <Divider orientation='vertical' width={0.2} />
                        
                            <TextInput 
                        placeholder="Enter URL " 
                        placeholderTextColor="gray"
                        style={{color:'white'}}
                        onChangeText={handleChange('imageUrl')}
                        onBlur={handleBlur('imageUrl')}
                        value={values.imageUrl}
                        onChange={(e)=>setPlaceHolderImg(e.nativeEvent.text)}
                         />
                      {!!errors.imageUrl && (
                          <Text style={{color:'red', fontSize:12}}>
                              {errors.imageUrl}
                          </Text>
                      )}
                      <View style={{ justifyContent:'center', flexDirection:'row', width:200, alignItems:'center', alignSelf:'center',}}>
                        <Button title="Post" onPress={handleSubmit} disabled={!isValid} ></Button>
                      </View>
                    </>
                )}
            </Formik>
        </View>
    )
}
