import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {getPriceVND} from '../model/getPriceVND'

export default function ListItem ({id,photo, title, subTitle, isFree, price,navigation}) {
    return (
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginBottom: 20,
        }}>
            <View style={{flexDirection:'row', align:'center', flex:1}}>
                <Image source={{ uri:photo }} style={{width:55,height:55,borderRadius:10,marginRight:8}}

                />
                <View style={{maxWidth:"70%" }}>
                    <Text style={{
                        color:'#333', 
                        fontFamily:'Roboto-Medium', 
                        fontSize:13}}>{subTitle}</Text>
                    <Text style={{
                        color:'#333', 
                        fontFamily:'Roboto-Medium', 
                        fontSize:10, 
                        textTransform:'uppercase'}}>{title}</Text>
                </View>
            </View>

            <TouchableOpacity style={{
                backgroundColor:'#0aada8', 
                padding:10, 
                width:100, 
                borderRadius:10}}
                onPress={() =>navigation.navigate('details_land',{ID_LAND:id})}
            >
                <Text style={{
                    color:'#fff', 
                    textAlign:'center', 
                    fontFamily:'Roboto-Medium', 
                    fontSize:14}}>
                    {isFree == 0 && 'Details'}
                    {isFree == 1 && getPriceVND(price)+" vnđ" }
                </Text>
            </TouchableOpacity>
        </View>
    );
}