import React,{useEffect,useState} from "react";
import {View, Text, Button, StyleSheet} from 'react-native';
import * as FetchAPI from '../utils/fetchApi'
export default  function ChatScreen ({navigation}){
    const [dataTest,setDataTest] = useState()
    useEffect(()=>{
        getData()
    },[])
    const getData = async()=>{
        const res = await FetchAPI.getAPI("api1/test1");
        setDataTest(res)
    }
    return (
        <View>
            {dataTest!==undefined &&
            dataTest.map(e=>(
                <View key={e.id}>
                <Text>{e.name}</Text>
                </View>
            ))
            
            }
            <Button 
                title="Click Here"
                onPress={() =>  alert('Button Clicked!')} />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    },
});