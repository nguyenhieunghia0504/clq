import React,{useEffect} from 'react';
import {View, Text, SafeAreaView, ScrollView, ImageBackground, TextInput, TouchableOpacity,Dimensions  } from 'react-native';
import Feather from  'react-native-vector-icons/Feather';
import Carousel from 'react-native-snap-carousel';
import BannerSlider from '../components/BannerSlider';
import { sliderData} from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import { useState } from 'react';
import ListItem from '../components/ListItem';
import * as FetchAPI from '../utils/fetchApi';

export default function HomeScreen ({navigation}) {
    const [landTab,setLandTab] = useState(1);
    const [apartment, setapartment] = useState([]);
    const [Projectland, setProjectland] = useState([]);
    useEffect(()=>{
        getData()
    },[])
    const getData = async()=>{
        let project = [];
        let apartment = [];
        const res = await FetchAPI.getAPI("land/getFullLand")
        res.map(item=>{
            if(item.Type==="Project Land"){
                project.push(item)
            }else{
                apartment.push(item)
            }
        })
        setapartment(apartment)
        setProjectland(project)
    }
    const renderBanner =({item,index}) => {
        return <BannerSlider data={item}/>
    };

    const onSelectSwitch = (value) => {
        setLandTab(value);

    }


    return (
        <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
            <ScrollView 
                style={{padding: 20}}
                contentContainerStyle={{ paddingBottom:20}}
            >
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
                    alignContent:'center',
                    borderWidth:1, 
                    borderColor: 'purple',
                    borderRadius:7, 
                    paddingHorizontal:10, 
                    paddingVertical:5,
                    height: 50}}>
                <TouchableOpacity onPress={()=>{
                    navigation.navigate('Search')
                }}>
                          
                <Feather 
                name="search" 
                size={22} 
                color="#C6C6C6" 
                style={{marginRight:5, marginTop: 8}}/>
                </TouchableOpacity> 
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
                    // ref={(c) => { this._carousel = c; }}
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
                {landTab == 2 && 
                    Projectland.map(item => (
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
        </SafeAreaView>
    );
}