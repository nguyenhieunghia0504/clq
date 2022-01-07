import React ,{useEffect,useState} from 'react';
import {View, Text,StyleSheet} from 'react-native'
import * as FetchAPI from '../utils/fetchApi'
import {getPriceVND} from '../model/getPriceVND'
export default function DetailsHome ({navigation,route}){
    const [data, setdata] = useState([]);
    const [showContent, setshowContent] = useState(false);
    const {ID_LAND} = route.params
    useEffect(()=>{
        setshowContent(false)
        getData() 
    },[])
    const getData = async()=>{
        const res = await FetchAPI.postDataAPI("land/getHomeDetails",{"ID":ID_LAND})
        setdata(res[0])
        setshowContent(true)
    }
    const Item = ({title,content,styleContent})=>(
        <View style={styles.wrapperItem}>
            <Text>{title}</Text>
            <Text style={styleContent!==undefined?{...styleContent}:null}>{content}</Text>
        </View>
    )
    return(
        <View style={styles.container}>
            {showContent &&
                <View>
                    <Item title="Mã căn" content={`# ${data.ID}`} styleContent={{fontWeight:'bold'}}/>
                    <Item title="Giá" content={getPriceVND(data.Price)+" vnđ"} styleContent={{fontWeight:'bold'}} />
                    <Item title="Dự án" content={data.Project} styleContent={{color:'blue'}}/>
                    <Item title="Loại hình" content={data.Paradigm} styleContent={{fontWeight:'bold'}}/>
                    <Item title="Hướng" content={data.Direction}/>
                    <Item title="Tầng" content={data.Floor}/>
                    <Item title="Diện tích" content={data.Area +" m2"}/>
                    <Item title="Phòng ngủ" content={data.BedRoom}/>
                    <Item title="Phòng tắm" content={data.BathRoom}/>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingLeft:20,
        paddingRight:20
    },
    wrapperItem: {
        justifyContent:'space-between',
        flexDirection: 'row',
        padding:15,
        paddingLeft:0,
        paddingRight:0,
        borderBottomWidth:.5,
        borderColor: 'gray',
    }
})