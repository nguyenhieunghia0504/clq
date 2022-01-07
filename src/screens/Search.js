import React, {useState} from 'react'
import { View, Text, TouchableOpacity, Dimensions, StyleSheet,TextInput, ScrollView } from 'react-native'
import Feather from  'react-native-vector-icons/Feather';
import * as FetchAPI from '../utils/fetchApi';
export default function Search() {
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
            <View key={item.ID}>
                <Text>{item.Address}</Text>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
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
            
            <ScrollView  contentContainerStyle={styles.contenItem} >
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

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    contenItem:{
        flex:1,
        marginTop:15,
        marginHorizontal: 10,
        justifyContent:"space-between",
        flexDirection:"row",
        backgroundColor: 'white',
        flexWrap:'wrap',
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
        
    }
})
