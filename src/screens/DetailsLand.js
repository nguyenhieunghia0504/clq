import React ,{useEffect,useState} from 'react';
import {View,Text,Image,StyleSheet,ScrollView,TouchableOpacity,Modal,ToastAndroid} from 'react-native'
import * as FetchAPI from '../utils/fetchApi'
import {getPriceVND} from '../model/getPriceVND'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
export default  function DetailsLand({navigation,route}){
    const [data, setdata] = useState();
    const [showContent, setshowContent] = useState(false);
    const [statusFavorite, setstatusFavorite] = useState(false);
    const [visibleModal, setvisibleModal] = useState(false);
    const [date, setDate] = useState(new Date());
    const [showDate, setshowDate] = useState(false);
    const {ID_LAND} = route.params;
    useEffect(()=>{
        setshowContent(false)
        getData()
        DisplayProductFavorite()
    },[])
    const getData = async()=>{
        const data = {ID:ID_LAND}
        const res= await FetchAPI.postDataAPI("land/getLandDetails",data)
        setdata(res[0])
        setshowContent(true)
    }
    const DisplayProductFavorite = async()=>{
        try {
            let id = ID_LAND;
            let arr = [];
            let getData = await AsyncStorage.getItem('FAVORITE')
            if(getData != null){
                arr = JSON.parse(getData);
                for(const item of arr){
                    if(item.id == id){
                        setstatusFavorite(true)
                        return 0;
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    
    }
    const handleFavorite = ()=>{
        if(statusFavorite){
            DeleteFavorite()
        }else{
            addFavorite()
        }
    }
    const addFavorite = async()=>{
        try {      
            console.log("2") 
            let arr = [];
            let id = ID_LAND;
            let getData = await AsyncStorage.getItem("FAVORITE");
            if(getData == null){
                arr = [{'id': id }]
                setstatusFavorite(true)
            }else{
                arr = JSON.parse(getData);
                arr = arr.concat([{'id':id}]);
                setstatusFavorite(true)
            }
            await AsyncStorage.setItem('FAVORITE', JSON.stringify(arr))
            // dispatch(updatequantityFavorite(arr.length))
        } catch (error) {
            console.log(error)
        }
    }
    const DeleteFavorite = async()=>{
        try {
            console.log("3") 
            let id = ID_LAND;
            let arr = [];
            let getData = await AsyncStorage.getItem('FAVORITE');
            if(getData != null){
                arr = JSON.parse(getData);
                if(arr.length===1){
                    await AsyncStorage.removeItem("FAVORITE");
                }else{
                    for(let i = 0; i < arr.length; i++){
                        if(arr[i].id === id){
                            arr.splice(i,1);
                        }
                    }
                    await AsyncStorage.setItem("FAVORITE",JSON.stringify(arr))
                }
              
            }
            setstatusFavorite(false)
        } catch (error) {
            console.log(error)
        }
        
    }
    const onChangeDate = (event, selectedDate) => {
        if(event.type=="dismissed"){
            ToastAndroid.show("Bạn không chọn lịch !", ToastAndroid.SHORT);
            setshowDate(false)
        }else{
            if(selectedDate<new Date()){
                ToastAndroid.show("Vui lòng chọn lịch hẹn muộn hơn hiện tại !", ToastAndroid.SHORT);
                setshowDate(false);
            }
            else{
                setshowDate(false)
                ToastAndroid.show("Chọn ngày thành công !", ToastAndroid.SHORT);
                setvisibleModal(true)
                setDate(selectedDate)
            }
        }
       
    }
    const handleAddSchedule = async()=>{
        const user = await AsyncStorage.getItem("USERNAME")
        console.log(user)
        if(user== null){
            ToastAndroid.show("Vui lòng đăng nhập để đặt lịch !", ToastAndroid.SHORT);
        }else{
            const arrUser = JSON.parse(user)
            const data = {"Time":date,"idLand":ID_LAND,"idCustommer":arrUser.idUser,"Email":arrUser.Email}
            const res = await FetchAPI.postDataAPI("land/addSchedule",data)
            console.log(res)
            if(res.msg){
                if(res.msg=="Success"){
                    ToastAndroid.show("Đặt lịch thành công !", ToastAndroid.SHORT);
                    setvisibleModal(false)
                }
            }
        }
    }
    const ModalAsk = ()=>(
        <Modal
            visible={visibleModal}
            animationType="slide"
            transparent={true}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={{ fontWeight:'bold',color:'black',fontSize:15,textAlign:'center' }}>
                        {`Bạn có chắc chắn muốn đặt lịch hẹn vào ${date.toLocaleString()} ?`}
                    </Text>
                    <View style={{ flexDirection:'row',alignItems:'space-around',paddingTop:20 }}>
                        <TouchableOpacity 
                            style={{backgroundColor:'tomato',marginRight:10,...styles.btnModal}}
                            onPress={handleAddSchedule}
                        >
                            <Text style={{ color:'white' }}>Có</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{backgroundColor:'blue',...styles.btnModal}}
                            onPress={() =>setvisibleModal(false)}
                        >
                            <Text style={{ color:'white' }}>Không</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
    return(
        <View style={styles.wrapper}>
            {showContent &&
                <>
                <ScrollView contentContainerStyle={{ paddingBottom:80 }}>
                    <Image style={ styles.imageDetails } source={{uri:data.Image}} />
                    <View style={styles.content}>
                        <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                            <Text style={{fontSize:16,...styles.title}}>
                                {`${data.SubTitle} - ${data.Title}`}
                            </Text>
                            <TouchableOpacity 
                                onPress={()=>handleFavorite()}
                            >
                                <FontAwesome name={statusFavorite?"heart":"heart-o"} color="red" size={28}/>
                            </TouchableOpacity>
                        </View>
                        <Text style={{ fontSize:18,paddingTop:10,...styles.title }}>
                            {`${getPriceVND(data.Price)} vnđ`}
                        </Text>
                        <Text style={{ paddingTop:10,color:'black' }}>
                            <Text style={styles.title}>Địa chỉ : </Text>
                            {`${data.Address}`} 
                        </Text>
                        <Text style={{ paddingTop:10,color:'black' }}> 
                            <Text style={styles.title}>Mô tả : </Text>
                            {`Mô tả: ${data.Description}`} 
                        </Text>
                        <TouchableOpacity
                            style={styles.btnDetails}
                            onPress={()=>navigation.navigate("details_home",{ID_LAND:data.ID})}
                        >
                            <Text>Chi tiết</Text>
                        </TouchableOpacity>
                        <View style={{ width:'100%',alignItems:'center' }}>
                        <View style={styles.hotline}>
                            <Text style={{ color:'tomato',fontSize:14,fontWeight:'bold' }}>Hotline : 0929303655</Text>
                        </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottom}>
                    <TouchableOpacity 
                        style={styles.btn_add_schedule}
                        onPress={() =>setshowDate(true)}
                    >
                        <Text style={{ color:'white',fontSize:14 }}>Đăng ký xem bất động sản</Text>
                    </TouchableOpacity>
                </View>
                <ModalAsk />
                {showDate &&
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                    locale="vi-VN"
                />
                }
                </>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    wrapper :{
        flex:1
    },
    imageDetails:{
        width:"100%",
        height:250
    },
    content:{
        padding:20
    },
    title:{
        fontWeight:'bold',
        color:'black'
    },
    bottom:{
        position:'absolute',
        width:'100%', 
        backgroundColor: 'white',
        height: 60,
        bottom:0,
        elevation:10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn_add_schedule:{
        justifyContent: 'center',
        alignItems: 'center',
        padding:14,
        backgroundColor: 'tomato',
        width: "70%",
        elevation:10,
        borderRadius:5
    },
    hotline:{
        marginTop:10,
        width:'90%',
        padding:10,
        justifyContent:'center',
        alignItems: 'center',
        borderStyle:'dashed',
        borderWidth:1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    btnModal:{
        padding:10,
        width:80,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10,
        elevation:8
    },
    btnDetails:{
        padding:10,
        borderColor:'tomato',
        borderWidth:.8,
        width:80,
        marginTop:10,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius:10
    }
})