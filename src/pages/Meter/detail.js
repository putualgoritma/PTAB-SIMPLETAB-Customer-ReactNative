import { faCamera, faImages} from '@fortawesome/free-solid-svg-icons';
import React,{useEffect,useState} from 'react';
import {StyleSheet,View,ScrollView,ImageBackground,PermissionsAndroid,Image,Text} from 'react-native';
import {launchCamera} from 'react-native-image-picker';import {Spinner, Footer,Button,Title,Input,TextInput,TextArea,ButtonIcon,ImageFoto} from '../../component';
import Distance from '../../utils/distance'
import Config from 'react-native-config';

const DetailMeter =({navigation,route})=>{
    const data = route.params.item
    const [loading, setLoading] = useState(true)
    const [loadingImage, setLoadingImage] = useState(true)
    const background= require('../../assets/img/BackgroundInput.png')

    useEffect(() => {
        setLoading(false)         
      }, [])

    return(
        <View style={styles.container}>
            {loading &&  <Spinner/>}
              <ImageBackground source={background} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <View style={{backgroundColor:'#FFFFFF', width:'100%', height:100}}></View>
                        <View style={{alignItems:'center'}}>
                            <View style={{width:'90%'}}>
                                <View style={styles.baseBoxShadow} >
                                    <View style={styles.boxShadow} >
                                        <View style={{alignItems:'center'}}>
                                            <Title title="Detail Baca Meter" width={'90%'}/>
                                            <TextInput title="ID Pelanggan" width='90%'/> 
                                            <Text style={styles.text} >{data.nomorrekening}</Text>
                                            <TextInput title="Bulan" width='90%'/>
                                            <Text style={styles.text} >{data.bulanrekening}</Text>
                                            <TextInput title="Pemakaian" width='90%'/>
                                            <Text style={styles.text} >{data.pencatatanmeter}</Text>                                            
                                            <TextInput title="Foto" width='90%'/> 
                                            <View style={{marginVertical:5}}>
                                            <ImageBackground source={require('../../assets/img/ImageFotoLoading.png') } style={{ height : 220, width : 280}} >
                                                <Image
                                                    source={{ uri: Config.REACT_APP_BASE_CTM + `${String(data.filegambar).replace('public/', '')}` }}
                                                    style={{ width:200, height:200 }}
                                                    onLoadEnd={() => setLoadingImage(false)}
                                                    onLoadStart={() => setLoadingImage(true)}
                                                />
                                            </ImageBackground>      
                                            </View>                                  
                                         </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                </ScrollView>
                <Footer navigation={navigation} focus='Menu'/>
              </ImageBackground>
        </View>              
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    baseBoxShadow : {
        alignItems : 'center',
        paddingVertical : 20,
    },
    boxShadow : {
        backgroundColor : '#ffffff',
        width : '100%',
        paddingHorizontal:20,
        paddingVertical : 30,
        borderRadius:10,
        backgroundColor:'#FFFFFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 3,
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    text : {
        color:'black', 
        fontWeight : 'bold', 
        borderBottomWidth : 1,
        fontSize : 15,
        borderColor:'#087CDB',
        width:'90%'
      },
});
export default DetailMeter