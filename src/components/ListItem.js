import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';


export default function ListItem ({photo, title, subTitle, isFree, price}) {
    return (
        <View style={{
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center',
            marginBottom: 20,
        }}>
            <View style={{flexDirection:'row', align:'center', flex:1}}>
                <Image source={photo} style={{width:55,height:55,borderRadius:10,marginRight:8}}

                />
                <View>
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
                borderRadius:10}}>
                <Text style={{
                    color:'#fff', 
                    textAlign:'center', 
                    fontFamily:'Roboto-Medium', 
                    fontSize:14}}>
                    {isFree == 'Yes' && 'Details'}
                    {isFree == 'No' && price }
                </Text>
            </TouchableOpacity>
        </View>
    );
}