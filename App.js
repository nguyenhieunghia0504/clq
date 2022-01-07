import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HouseImg from './src/assets/Pues1.svg';
import TabNavigation from './src/Navigation/Tab';
import Splash from './src/screens/splash';
import Login from './src/screens/Login';
import Singup from './src/screens/singup';
import DetailsLand from './src/screens/DetailsLand';
import ViewSchedule from './src/screens/ViewSchedule';
import Search from './src/screens/Search'
import DetailsHome from './src/screens/DetailsHome'
const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Splash"
      >
        <Stack.Screen component={Search} name="Search" options={{headerShown:false}}/>    
        <Stack.Screen component={Singup} name="Singup" options={{headerShown:false}} />
        <Stack.Screen component={Login} name="Login" options={{headerShown:false}} />
        <Stack.Screen component={Splash} name="Splash" options={{headerShown:false}} />
        <Stack.Screen component={Main} name="Main" options={{headerShown:false}} />
        <Stack.Screen component={TabNavigation} name="Tab" options={{headerShown:false}} />
        <Stack.Screen component={DetailsLand} name="details_land" options={{title: 'Chi tiết'}} />
        <Stack.Screen component={ViewSchedule} name="view_schedule" options={{title: 'Lịch xem bất động sản'}} />
        <Stack.Screen component={DetailsHome} name="details_home" options={{title: 'Chi tiết'}} />
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
    <TouchableOpacity onPress={() => navigation.navigate('Tab')}
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




export default App;
