import React, {useEffect,useState} from 'react';
import {View, Text, TouchableOpacity,StyleSheet,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FetchAPI from '../utils/fetchApi'
export default function ViewSchedule ({navigation}){
    const [showContent, setshowContent] = useState(false);
    const [showList, setshowList] = useState(false);
    const [dataSchedule, setdataSchedule] = useState([]);
    useEffect(()=>{
        setshowContent(false)
        getData()
    },[])
    const getData = async()=>{
        const getUser = await AsyncStorage.getItem("USERNAME")
        const arrUser = JSON.parse(getUser);
        const res =await FetchAPI.postDataAPI("land/getScheduleByIdUser",{"idUser":arrUser.idUser})
        console.log(res)
        if(res.length===0){
            setshowList(false)
        }else{
            setdataSchedule(res)
            setshowList(true)
        }
        setshowContent(true)
    }

    const renderItem = ({item})=>{
        return(
        <TouchableOpacity style={{ width:'100%',alignItems:'center' }}>
        <View style={styles.wrapperItem}>
            <View style={styles.wrapperTitle}>
                <Text style={{ fontWeight:'bold' }}>Mã lịch : </Text>
                <Text>{'# '+item.ID}</Text>
            </View>
            <View style={styles.wrapperTitle}>
                <Text style={{ fontWeight:'bold' }}>Bất động sản : </Text>
                <Text>{item.SubTitle} </Text>
            </View>
            <View style={styles.wrapperTitle}>
                <Text style={{ fontWeight:'bold' }}>Thời gian : </Text>
                <Text>{new Date(item.Time).toLocaleString()} </Text>
            </View>
        </View>
        </TouchableOpacity>
        )
    }
    return(
        <View style={styles.container}>
            {showContent &&
            <View style={{ flex:1 }}>
                {showList ?
                <View style={{ flex:1}}>
                    <FlatList 
                        data={dataSchedule}
                        renderItem={renderItem}
                        keyExtractor={item => item.ID}
                        style={{flex:1}}
                        contentContainerStyle={{ paddingBottom:20 }}
                    />
                </View>
                :
                <View style={{ flex:1,justifyContent: 'center', alignItems: 'center'}}>
                    <Text>Bạn chưa đặt lịch ....</Text>
                </View>
                }
               
            </View>
           
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1
    },
    wrapperItem:{
        width:'90%',
        padding:20,
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop:20
    },
    wrapperTitle:{
        flexDirection: 'row',
    }
})