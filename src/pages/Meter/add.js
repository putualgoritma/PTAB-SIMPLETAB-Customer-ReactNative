import { faCamera, faImages} from '@fortawesome/free-solid-svg-icons';
import React,{useEffect,useState} from 'react';
import {StyleSheet,View,ScrollView,ImageBackground,PermissionsAndroid,Image,} from 'react-native';
import {launchCamera} from 'react-native-image-picker';import {Footer,Button,Title,Input,TextInput,TextArea,ButtonIcon,ImageFoto} from '../../component';
import Distance from '../../utils/distance'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const requestCameraPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
            title: "Cool Photo App Camera Permission",
            message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
        }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        } else {
        console.log("Camera permission denied");
        }
    } catch (err) {
        console.warn(err);
    }
};
const AddMeter =({navigation})=>{
    const background= require('../../assets/img/BackgroundInput.png')
    const [response, setResponse] = React.useState(null);
        useEffect(() => {
            requestCameraPermission()
        })
    const [image, setImage] = useState({
        name : null,
        filename : null,
        data : null
    })
    return(
        <View style={styles.container}>
              <ImageBackground source={background} style={styles.image}>
                <ScrollView keyboardShouldPersistTaps = 'always'>
                    <View style={{backgroundColor:'#FFFFFF', width:'100%', height:100}}></View>
                        <View style={{alignItems:'center'}}>
                            <View style={{width:'90%'}}>
                                <View style={styles.baseBoxShadow} >
                                    <View style={styles.boxShadow} >
                                        <View style={{alignItems:'center'}}>
                                            <Title title="Meter Mandiri" width='90%'/>
                                            <TextInput title="ID Pelanggan" width='90%'/>
                                            <Input
                                                placeholder="ID Pelanggan"
                                                editable={false}
                                                value='CUS00128'
                                                width='90%'
                                            />
                                            <TextInput title="Stand Meter" width='90%'/>
                                            <Input  
                                                placeholder="00000" 
                                                keyboardType = 'number-pad' 
                                                width='90%'/>
                                            <TextInput title="Foto" width='90%'/>
                                            <Image
                                                style={{width:'90%', height: 150}}
                                                source={response==null ? require('../../assets/img/ImageFoto.png') : {uri: response.uri}}
                                            />
                                            <Distance distanceV={10}/>
                                            <ButtonIcon
                                            backgroundColor='#1DA0E0'
                                            title="Ambil Foto"
                                            width="90%"
                                            icon={faCamera}
                                            onPress={()=>launchCamera(
                                                {
                                                    mediaType: 'photo',
                                                    includeBase64:true,
                                                    maxHeight: 500,
                                                    maxWidth: 500,
                                                },
                                                (response) => {
                                                    if(response.assets){
                                                        setResponse(response.assets[0]);
                                                        setImage({
                                                            name : 'img',
                                                            filename : response.assets[0].fileName,
                                                            data : response.assets[0].base64
                                                        })
                                                    
                                                        console.log('ini response',response);
                                                    }
                                                },  
                                                )}
                                            />
                                            <TextInput title = 'Keterangan' width='90%'/>
                                            <TextArea
                                                placeholder="Keterangan"
                                                width='90%'
                                            />
                                             <Distance distanceV={10}/>
                                            <Button
                                                title="Kirim"
                                                width='90%'
                                                onPress={()=>console.log('iniresponse variable',response.uri)}
                                            />
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
});
export default AddMeter