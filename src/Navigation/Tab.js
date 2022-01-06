import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import LandScreen from '../screens/LandScreen';
import AccountScreen from '../screens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <View style={{flex:1}}>
      <Tab.Navigator screenOptions={{headerShown:false}}>
        <Tab.Screen name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 4}}>
              <Image source={require('../assets/home.png')}
                      resizeMode='contain'
                      style={{
                        width:25,
                        height:25,
                        tinColor: focused ? '#e32f45' : '#748c94'
                      }}/>
            </View>
          ),
        }}/>
        <Tab.Screen name="Chat" 
        component={ChatScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image source={require('../assets/chat.png')}
                      resizeMode='contain'
                      style={{
                        width:25,
                        height:25,
                        tinColor: focused ? '#e32f45' : '#748c94'
                      }}/>
            </View>
          ),
        }} />
        <Tab.Screen name="Land" 
        component={LandScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 4}}>
              <Image source={require('../assets/table.png')}
                      resizeMode='contain'
                      style={{
                        width:25,
                        height:25,
                        tinColor: focused ? '#e32f45' : '#748c94'
                      }}/>
            </View>
          ),
        }} />
        <Tab.Screen name="Acount" 
        component={AccountScreen} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center', top: 4}}>
              <Image source={require('../assets/account.png')}
                      resizeMode='contain'
                      style={{
                        width:25,
                        height:25,
                        tinColor: focused ? '#e32f45' : '#748c94'
                      }}/>
            </View>
          ),
        }} />
        
      </Tab.Navigator>
    </View>
  );
}

