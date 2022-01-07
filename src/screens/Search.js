import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Dimensions, StyleSheet,TextInput, ScrollView, Image } from 'react-native'
import Feather from  'react-native-vector-icons/Feather';
import * as FetchAPI from '../utils/fetchApi';
export default function Search({navigation}) {
    const [valueSearch, setvalueSearch] = useState('');
    const [DataSearch, setDataSearch] = useState([]);


    

    const handleSearch = async(value)=>{
        if(value ==''){
            alert('Bạn chưa nhập dữ liệu tìm kiếm!!!')
        }else{
            const val = {"datasearch":valueSearch}
            const res = await FetchAPI.postDataAPI('land/searchLand',val);
            // console.log(res);
                setDataSearch(res)

        }
    }

    const RenderItem = (item)=>{
        return(
            <TouchableOpacity onPress={() =>navigation.navigate('details_land',{ID_LAND:item.ID})
            } key={item.ID} style= {styles.wrapcontent}>
             <Image 
            source={{ uri:item.Image}} 
            resizeMode='contain'
            style={{ 
                width : windowW*0.40,
                height : windowH*0.18,
                borderRadius:15,
            }}
        />           
        <Text style={{...styles.text, color:'red', fontWeight:'bold'}}>{item.SubTitle}</Text>
        <Text style={{...styles.text, color:'black'}}>{item.Address}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style = {styles.container}>
            <View style={styles.header}>
                <Text style={{ color: 'black',fontWeight:'bold' }}>Search</Text>
            </View>
            <View style= {styles.search}>
            <TouchableOpacity  onPress={()=>{
                handleSearch(valueSearch);
            }}>
                <Feather 
                    name="search" 
                    size={22} 
                    color="#C6C6C6" 
                    style={{marginRight:5}}/>
            </TouchableOpacity>
                <TextInput placeholder="Search"
                value={valueSearch}
                onChangeText={(value)=>setvalueSearch(value)}/>
            </View>
            
            <ScrollView contentContainerStyle={styles.contenItem} >
                {DataSearch.length > 0 &&
                DataSearch.map(e=>{
                    return(
                        RenderItem(e)
                    )
                })}
            </ScrollView>


        </View>
    )
}
const windowW = Dimensions.get('window').width;
const windowH = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white',
    },
    contenItem:{
        marginTop:15,
        marginHorizontal: 10,
        justifyContent:"space-between",
        flexDirection:"row",
        backgroundColor: 'white',
        flexWrap:'wrap',
        paddingBottom:20,

    },
    search:{
        flexDirection:'row',
        paddingLeft: 10,
        alignItems:'center',
        width: windowW*0.94,
        height: 45,
        borderRadius: 30,
        marginTop: 15,
        marginHorizontal: 10,
        shadowColor:'#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 3,
        shadowOpacity: 0.45,
        elevation: 3,
        backgroundColor:'white'
        
    },
    wrapcontent:{
        flexDirection:'column',
        justifyContent:'flex-start',
        alignContent:'center',
        alignItems:'center',
        width: windowW*0.45,
        marginLeft: 5,
        marginBottom: 10,
        height: windowH*0.35,
        backgroundColor: "#F8F9F9",
        borderRadius: 5,
        shadowColor:'#000',
        shadowOffset:{
            width:0,
            height: 2,
        },
        shadowOpacity : 0.35,
        shadowRadius: 3.4,
        elevation:5,
        
    },
    text:{
        fontSize:14,
        maxWidth:windowW*0.40,
        alignItems:'center',
        textAlign:'center'
        
    }, header:{
        height: 40,
        justifyContent:'center',
        elevation:5,
        backgroundColor:'#F1F3F4',
        paddingLeft:10

    },
})
