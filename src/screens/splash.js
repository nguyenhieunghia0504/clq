import React, {useEffect} from 'react'
import { View, Text, SafeAreaView, TouchableOpacity} from 'react-native'
import HouseImg from '../../src/assets/Pues1.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
export default function Splash({navigation}) {


    useEffect(() => {
       setTimeout(() => {
        navigation.replace('Tab')
       }, 2000);
    }, [])

    
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <View>
          <TouchableOpacity>
          <Text style={{
            fontSize: 30, 
            fontWeight: 'bold', 
            color: '#20315f'}}>PUES HOME</Text>
          </TouchableOpacity>
          
        </View>
        <HouseImg width={300} height={300}/>
        {/* <View
        style={{
          backgroundColor:'#AD40AF', 
          padding:20, width:'90%', 
          boderRadius:5, 
          flexDirection:'row', 
          justifyContent:'space-between'}}>
        </View> */}
        </SafeAreaView>
        
      )
}
