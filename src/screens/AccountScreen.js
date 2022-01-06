import React from "react";
import {View, Text, Button, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';

export default  function AccountScreen ({navigation}){
    return (
        <View style = {styles.container}>

            <TouchableOpacity style = {styles.btnlogin} onPress={()=>{
                navigation.navigate('Login')
            }}>
                <Text style={styles.login}>ĐĂNG NHẬP NGAY</Text>
            </TouchableOpacity>

        </View>
    )
}

const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        flex:1,

    },
    btnlogin:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:"center",
    },
    login:{ 
        width : windowW*0.4,
        height: 40,
        backgroundColor: 'green',
        textAlign:'center', 
        color: 'white',
        textAlignVertical:'center',
        borderRadius: 5,
        fontWeight: "bold"
    }
});