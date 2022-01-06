
import React,{useState,useEffect,useRef} from "react";
import {View, Text,TextInput,Button,StyleSheet,Alert,ImageBackground,StatusBar,TouchableOpacity} from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup'
import bglogin from '../assets/bg-login.jpg'
import Entypo from 'react-native-vector-icons/Entypo';
import * as GETAPI from '../utils/fetchApi';
const loginValidationSchema = yup.object().shape({
username: yup
    .string()
    .min(3, ({ min }) => `Tên đăng nhập có ít nhất ${min} ký tự`)
    .required('Nhập tên đăng nhập !!'),
  password: yup
    .string()
    .min(3, ({ min }) => `Mật khẩu có ít nhất ${min} ký tự`)
    .required('Nhập mật khẩu để đăng nhập'),
})
export default function Login ({navigation,route}){
    const [hidePass, sethidePass] = useState(true);
 
    const formRef = useRef();
    const handleLogin  = async(values,{ setErrors, resetForm })=>{
        console.log(values)
        const res = await GETAPI.postDataAPI("user/login",values)
        console.log(res)
        if(res.msg){
            if(res.msg==="Invalid account"){
                setErrors({username:"Tài khoản không tồn tại"})
            }else if(res.msg==="Incorrect password"){
                setErrors({password:"Mật khẩu sai !!!"})
            }else{
                navigation.navigate("Tab")
                await AsyncStorage.setItem("USERNAME",JSON.stringify(values))
            }
        }
       
    }

    return(
        <View style={styles.wrapper}>
        <ImageBackground source={bglogin} resizeMode="cover" style={styles.background}>
            <View style={styles.child}>
            <StatusBar 
                animated={true}
                translucent backgroundColor="transparent"
                barStyle="light-content" 
            />
            <Text style={{ color:'white',fontSize: 28,fontWeight:'bold',fontFamily:"Comforter"}}>PUES</Text>
            <Text style={{ color:'white',marginBottom:10 }}>road to the future</Text>
                <Formik
                    validationSchema={loginValidationSchema}
                    initialValues={{ username: '', password: '' }}
                    innerRef={formRef}
                    onSubmit={handleLogin}
                >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    isValid,
                    touched 
                }) => (
                    <>
                    <View style={styles.wrapperInput}>
                    <Entypo name="user" size={20} color="white" style={styles.inputIcon}/>
                    <TextInput
                        name="username"
                        placeholder="Nhập tên đăng nhập"
                        style={[errors.username&&touched.username?{...styles.textInput,borderColor: 'red'}
                        :{...styles.textInput}]}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        placeholderTextColor="gray"
                        value={values.username}
                    />
                    </View>
                    {(errors.username && touched.username) &&
                        <Text style={styles.errorText}>{errors.username}</Text>
                    }
                    <View style={styles.wrapperInput}>
                    <Entypo name="lock" size={20} color="white" style={styles.inputIcon}/>
                    <TextInput
                        name="password"
                        placeholder="Mật khẩu"
                        placeholderTextColor="gray"
                        style={[errors.password && touched.password ?{...styles.textInput,borderColor: 'red'}
                        :{...styles.textInput}]}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={hidePass}
                    />
                    <TouchableOpacity onPress={()=>sethidePass(!hidePass)} style={styles.inputIconShowPass}>
                            {hidePass ?
                                <Entypo name="eye-with-line" size={20} color="white" />
                            :
                                <Entypo name="eye" size={20} color="white" />
                            }
                          
                    </TouchableOpacity>
                    </View>
                    {(errors.password && touched.password) &&
                        <Text style={styles.errorText}>{errors.password}</Text>
                    }
                    <View style={{ paddingTop:10 }}>
                        <Button
                            onPress={handleSubmit}
                            title="Đăng nhập"
                            disabled={!isValid}
                            color="tomato"
                        />
                    </View>
                    </>
                )}
                </Formik>
            <TouchableOpacity 
                onPress={()=>navigation.navigate("Singup")} 
                style={{position:'absolute',bottom:0, paddingBottom:20 }}
            >
                <Text style={{ color:'white',fontSize:16 }}>Đăng ký</Text>
            </TouchableOpacity>
            </View>
        </ImageBackground>
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper:{
        flex:1, 
        justifyContent : "center",
        alignItems : "center",
    },
    child: {
        flex: 1,
        width:'100%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: "center",
        alignItems:'center',  
    },
    loginContainer: {
        width: '90%',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 10,
        elevation: 10,

    },
    background:{
        flex:1,
        width:'100%',
    },
    textInput: {
        height: 40,
        width: '80%',
        margin: 10,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        color:"white",
        paddingLeft:40,
        paddingRight:40
    },
    errorText: {
        marginLeft:10,
        fontSize: 14,
        color: 'red',
    },
    inputIconShowPass: {
        position:'absolute',
        right:30
    },
    wrapperInput: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputIcon: {
        position:'absolute',
        left:20
    },
})