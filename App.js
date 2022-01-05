import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HouseImg from './src/assets/Pues1.svg';
import TabNavigation from './src/Navigation/Tab';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen component={TabNavigation} name="Tab" options={{headerShown:false}} />
        {/* <Stack.Screen component={HomeScreen} name="Home"options={{headerShown:false}}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const Main = ({navigation}) => {
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
    <TouchableOpacity onPress={() => navigation.navigate('Home')}
    style={{
      backgroundColor:'#AD40AF', 
      padding:20, width:'90%', 
      boderRadius:5, 
      flexDirection:'row', 
      justifyContent:'space-between'}}>
        <Text style={{
          fontWeight:'bold', 
          fontSize:15, 
          color:'#fff', 
          fontFamily:'Roboto-MediumItalic'}}>Let's Begin</Text>
        <MaterialIcons name="arrow-forward-ios" size={22} color="#fff"/>
    </TouchableOpacity>
    </SafeAreaView>
    
  );
};

//const Home = () => {
  //return (
    //<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
     // <Text>Home Screen</Text>
   // </View>
 // );
//}


export default App;
