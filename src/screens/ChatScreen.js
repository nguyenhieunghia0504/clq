import React,{useEffect,useState} from "react";
import {View, Text, Button, StyleSheet} from 'react-native';
import {link} from '../utils/linkApi'
export default  function ChatScreen ({navigation}){
    const [dataTest,setDataTest] = useState()
    useEffect(()=>{
        getData()
    },[])
    const getData = ()=>{
        console.log(link)
        fetch(link+"api1/test1")
        .then(response=>response.json())
        .then(responseJson=>{
            console.log(responseJson)
            setDataTest(responseJson)
        })
        .catch(err=>{
            console.log(err)
        })
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