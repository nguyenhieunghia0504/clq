import React ,{useEffect,useState} from "react";
import {View, Text, StyleSheet, Dimensions, TouchableOpacity,Modal} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
export default  function AccountScreen ({navigation}){
    const [statusUser, setstatusUser] = useState(false);
    const [showContent, setshowContent] = useState(false);
    const [visibleModalLogout, setvisibleModalLogout] = useState(false);
    const [dataUser, setdataUser] = useState([]);
    useEffect(()=>{
        navigation.addListener('focus',()=>{
            setshowContent(false)
            checkUser()
        })
    },[])
    const checkUser = async()=>{
        const getData = await AsyncStorage.getItem("USERNAME")
        if(getData===null){
            setstatusUser(false)
        }else{
            setdataUser(JSON.parse(getData))
            setstatusUser(true)
        }
        setshowContent(true)
    }
    const handleLogout = async()=>{
        setvisibleModalLogout(false)
        await AsyncStorage.removeItem("USERNAME")
        checkUser()
    }
    const ModalLogout = ()=>(
        <Modal
            visible={visibleModalLogout}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontWeight:'bold',color:'black',fontSize:15,textAlign:'center' }}>
                        {`Bạn có chắc chắn muốn đăng xuất ?`}
                    </Text>
                    <View style={{ flexDirection:'row',alignItems:'space-around',paddingTop:20 }}>
                        <TouchableOpacity 
                            style={{backgroundColor:'tomato',marginRight:10,...styles.btnModal}}
                            onPress={handleLogout}
                        >
                            <Text style={{ color:'white' }}>Có</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{backgroundColor:'blue',...styles.btnModal}}
                            onPress={() =>setvisibleModalLogout(false)}
                        >
                            <Text style={{ color:'white' }}>Không</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
    return (
        <View style = {styles.container}>
            {showContent &&
            <View style={{ flex:1 }}>
                {statusUser ?
                <View style={styles.wrapper}>
                    <ModalLogout />
                    <View style={{ flexDirection:'row',alignItems:'center' }}>
                        <FontAwesome name="user-circle-o" size={50} color="gray"/> 
                        <Text style={{ marginLeft:20,color:'black',fontSize:16,fontWeight:'bold' }}>{dataUser.Name}</Text>
                    </View>
                    <TouchableOpacity style={styles.bar} onPress={()=>navigation.navigate("view_schedule")}>
                        <FontAwesome name="history" size={24} color="black" /> 
                        <Text style={styles.text_bar}>Lịch sử đặt lịch</Text> 
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bar}>
                        <FontAwesome name="user" size={24} color="black"/> 
                        <Text style={styles.text_bar}>Quản lý thông tin cá nhân</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bar} onPress={()=>setvisibleModalLogout(true)}>
                        <Feather name="log-out" size={24} color="black"/> 
                        <Text style={styles.text_bar}>Đăng xuất</Text>
                    </TouchableOpacity>
                </View>
                :
                <TouchableOpacity style = {styles.btnlogin} onPress={()=>{
                    navigation.navigate('Login')
                }}>
                    <Text style={styles.login}>ĐĂNG NHẬP NGAY</Text>
                </TouchableOpacity>
                }
            </View>
            }
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
    },
    wrapper:{
        flex: 1,
        padding:20
    },
    bar:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:15,
        backgroundColor:'white',
        padding:10,
        borderRadius:10,
        elevation:5
    },
    text_bar:{
        marginLeft:10,
        color:'black'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    btnModal:{
        padding:10,
        width:80,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10,
        elevation:8
    }
});