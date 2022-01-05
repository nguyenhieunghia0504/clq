import React from 'react';
import {View, Text, SafeAreaView, ScrollView, ImageBackground, TextInput, TouchableOpacity,Dimensions  } from 'react-native';
import Feather from  'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../components/BannerSlider';
import {Projectland, apartment, sliderData} from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import { useState } from 'react';
import ListItem from '../components/ListItem';


export default function HomeScreen () {
    const [landTab,setLandTab] = useState(1);



    const renderBanner =({item,index}) => {
        return <BannerSlider data={item}/>
    };

    const onSelectSwitch = (value) => {
        setLandTab(value);

    }


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <ScrollView style={{padding: 20}}>
                <View style={{
                flexDirection:'row', 
                justifyContent:'space-between', 
                marginBottom: 20,}}>
                <Text style={{
                    fontSize:18, 
                    fontFamily:'Roboto-Medium'}}>Hello Pues</Text>
                <ImageBackground 
                source={require('../assets/a.jpg')} 
                style={{width: 35,height: 35}} 
                imageStyle={{borderRadius: 25}} />
                </View>

                <View style={{
                    flexDirection:'row', 
                    boderColor:'#C6C6C6', 
                    borderWidth:1, 
                    borderRadius:8, 
                    paddingHorizontal:10, 
                    paddingVertical:8,}}>
                <Feather 
                name="search" 
                size={30} 
                color="#C6C6C6" 
                style={{marginRight:5}}/>
                <TextInput placeholder="Search"/>
                </View>


                <View style={{
                    marginVertical:15, 
                    flexDirection:'row', 
                    justifyContent:'space-between'}}>
                    <Text style={{fontSize:15, 
                    fontFamily:'Roboto-Medium'}}>Upcoming real estate</Text>
                    <TouchableOpacity onPress={()=>{}}>
                        <Text style={{color:'#0aada8'}}>See all</Text>
                    </TouchableOpacity>
                    
                </View>  

                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    data={sliderData}
                    renderItem={renderBanner}
                    sliderWidth={Dimensions.get('window').width - 40}
                    itemWidth={300}
                    loop={true}
                />


                <View style={{marginVertical:20}}>
                    <CustomSwitch 
                    selectionMode={1} 
                    option1='Apartment' 
                    option2='Projectland' 
                    onSelectSwitch={onSelectSwitch}/>
                </View>


                {landTab == 1 &&
                    apartment.map(item => (
                        <ListItem 
                        key={item.id} 
                        photo={item.poster} 
                        title={item.title} 
                        subTitle={item.subtitle} 
                        isFree={item.isFree}
                        />
                    ))
                }
                {landTab == 2 && 
                    Projectland.map(item => (
                        <ListItem 
                        key={item.id} 
                        photo={item.poster} 
                        title={item.title} 
                        subTitle={item.subtitle} 
                        isFree={item.isFree}
                        price={item.price} 
                        />
                    ))
                }
            </ScrollView>    
        </SafeAreaView>
    );
}