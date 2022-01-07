import React,{useEffect,useState} from "react";
import {View, Text, StyleSheet,ScrollView} from 'react-native';
import * as FetchAPI from '../utils/fetchApi'
import ListItem from '../components/ListItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default  function ChatScreen ({navigation}){
    const [showContent, setshowContent] = useState(false);
    const [showList, setshowList] = useState(false);
    const [dataFavorite, setdataFavorite] = useState([]);
    useEffect(()=>{
        navigation.addListener('focus',()=>{
            getListFavorite()
        })
    },[])
    const getListFavorite = async()=>{
        let arr = [];
        let getData = await AsyncStorage.getItem('FAVORITE')
        if(getData === null){
            setshowList(false)
        }else{
            const data = JSON.parse(getData);
            data.map(async(e,index)=>{
                const data_post = {ID:e.id}
                const res= await FetchAPI.postDataAPI("land/getLandDetails",data_post)
                arr.push(res[0])
                if(index===data.length-1){
                    setdataFavorite(arr)
                    setshowList(true)
                }
            })
        }
        setshowContent(true)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ color:'black',fontWeight:'bold',fontSize:15 }}>Danh sách bất động sản yêu thích</Text>                
            </View>
            {showContent &&
            <View style={{ flex:1 }}>
                {showList ?
                    <View style={styles.wrapper}>
                    <ScrollView>
                    { dataFavorite.map(item => (
                        <ListItem 
                            key={item.ID} 
                            photo={item.Image} 
                            title={item.Title} 
                            subTitle={item.SubTitle} 
                            isFree={item.IsFree}
                            price={item.Price} 
                            navigation={navigation}
                            id = {item.ID}
                        />
                    ))
                    }
                    </ScrollView>
                    </View>
                    :
                    <View style={styles.empty}>
                        <Text style={{ fontSize:14 }}>Danh dách các bất động sản yêu thích trống...</Text>
                    </View>
                }
            </View>
            }
    
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex:1
    },
    header:{
        backgroundColor:'white',
        width:'100%',
        height:50,
        justifyContent:'center',
        paddingLeft:10,
        elevation:10
    },
    empty:{
        flex:1,
        justifyContent : "center",
        alignItems:'center'
    },
    wrapper:{
        padding:20
    }
});