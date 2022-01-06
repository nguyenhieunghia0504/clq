import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import LandScreen from '../screens/LandScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <View style={{flex:1}}>
      <Tab.Navigator screenOptions={{headerShown:false,tabBarShowLabel: false}}>
        <Tab.Screen name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 4}}>
              <Ionicons name="home-outline" size={22} color={focused ? '#e32f45' : '#748c94'}/>
              <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Home</Text>
            </View>
          ),
        }}/>
        <Tab.Screen name="Chat" 
        component={ChatScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            
            <View style={{alignItems: 'center', justifyContent: 'center', top: 4}}>
              <MaterialIcons name="favorite-outline" size={22} color={focused ? '#e32f45' : '#748c94'}/>
              <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Favorite</Text>
            </View>
            
          ),
        }} />
        <Tab.Screen name="Land" 
        component={LandScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            
            <View style={{alignItems: 'center', justifyContent: 'center', top: 4}}>
              <FontAwesome5 name="landmark" size={22} color={focused ? '#e32f45' : '#748c94'}/>
              <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Land</Text>
            </View>
          ),
        }} />
        <Tab.Screen name="Acount" 
        component={AccountScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 4}}>
              <EvilIcons name="user" size={25} color={focused ? '#e32f45' : '#748c94'}/>
              <Text style={{ color : focused ? '#e32f45' : '#748c94', fontSize : 12}}>Account</Text>
            </View>
          ),
        }} />
        
      </Tab.Navigator>
    </View>
  );
}

