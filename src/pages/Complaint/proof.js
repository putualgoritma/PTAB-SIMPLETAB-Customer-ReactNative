import { faCamera,faVideo } from '@fortawesome/free-solid-svg-icons';
import React,{useEffect,useState}from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    PermissionsAndroid,
    Image,
    Video,
    Alert
  } from 'react-native';
  import {launchCamera} from 'react-native-image-picker';
import { useSelector } from 'react-redux';
  import {
    Footer,
    Title,
    ButtonIcon,
    TextInput,
    Button,
    VideoPlayer,
    Spinner} from '../../component';
import RNFetchBlob from 'react-native-fetch-blob';

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

const Proof =({navigation, route})=>{

    const TOKEN = useSelector((state) => state.TokenReducer);
    const USER = useSelector((state) => state.UserReducer);
    const [response, setResponse] = React.useState(null);
    const [loading, setLoading] = useState(false)
    const data = route.params.form
    const category = route.params.category
    const [form, setForm] = useState({
        title : data.title,
        category_id : category,
        description : data.description,
        lat : data.lat,
        lng : data.lng,
        customer_id : USER.id,
    })
    
    useEffect(() => {
        let isAmounted = true
        if(isAmounted){
            requestCameraPermission()
            console.log(form);
        }   
        return () => {
            isAmounted = false
        }
    }, [])
    // const [response, setResponse] = useState(null)
    const [image, setImage] = useState({
        name : null,
        filename : null,
        data : null
    })
    const [video, setVideo] = useState(null)


    const handleTicket = () => {
        console.log(form);
        if(form.title != '' && form.category_id != '' && form.description != '' && response != null && video !==null ){
            if(video.fileSize < 98000000){
                setLoading(true)
                RNFetchBlob.fetch(
                    'POST',
                    'https://simpletabadmin.ptab-vps.com/api/close/customer/ticket/store',
                    {
                      Authorization: `Bearer ${TOKEN}`,
                      otherHeader: 'foo',
                      'Accept' : 'application/json' ,
                      'Content-Type': 'multipart/form-data',
                    },
                    [
                      // name: image adalah nama properti dari api kita
                        {name: 'image', filename: response.fileName, data: response.base64},
                        { 
                            name : 'video', 
                            filename : video.fileName, 
                            type:'mp4', 
                            data: RNFetchBlob.wrap(video.uri)
                        },
                        {
                            name: 'form',
                            data : JSON.stringify(form)
                        }
                    ],
                ).then((result) => {
                    setLoading(false)
                    let data = JSON.parse(result.data);
                    console.log(result);
                    alert(data.message)
                    navigation.navigate('Menu')
                }).catch((e) => {
                    console.log(e);
                    setLoading(false)
                })
            }else{
                alert('Size video terlalu besar')
            }
           
        };
    }
    return(
        <View style={styles.container}> 
            {loading &&  <Spinner/>}
            <ScrollView keyboardShouldPersistTaps = 'always'>
                <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}>
                </View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
               
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadowBanner}>
                  
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Title
                        title="Bukti Laporan"
                        />
                    </View>
                    
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <TextInput
                            title="Foto"
                        />
                         {response && (
                        <Image
                            style={{width:'80%', height: 150}}
                            source={{uri: response.uri}}
                        />
                        )}
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <ButtonIcon
                        title="Ambil Foto"
                        width="80%"
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
                                    setForm({
                                        ...form,
                                        image : response.assets[0].fileName
                                    })
                                    console.log(response);
                                }
                            },  
                            )}
                        />
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10, paddingHorizontal:30}}>
                        <TextInput
                            title="Video"
                        />
                        {video && (
                            <VideoPlayer
                                src={{uri: video.uri}}
                            />
                        )}
                        </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <ButtonIcon
                            title="Ambil Video"
                            width="80%"
                            icon={faVideo}
                            onPress={
                                () => Alert.alert(
                                    'Peringatan',
                                    `Video tidak boleh lebih besar dari 10mb ! `,
                                    [
                                        {
                                            text : 'Tidak',
                                            onPress : () => console.log('tidak')
                                        },
                                        {
                                            text : 'Ya',
                                            // onPress : () => {generateCodeOTP(); setModalVisible(true)}
                                            onPress : () => {
                                                launchCamera(
                                                    {
                                                        mediaType: 'video',
                                                        quality: 1,
                                                        videoQuality: 'law'
                                                        // includeBase64: true 
                                                    }, 
                                                    (response) => {
                                                        if(response.assets){
                                                            setVideo(response.assets[0]);
                                                            setForm({
                                                                ...form,
                                                                video : response.assets[0].fileName
                                                            })
                                                            console.log(response.assets[0]);
                                                        }
                                                })
                                            }
                                        }
                                    ]
                                )
                            }
                        />
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Button
                            title="Kirim Tiket"
                            // navigation={()=>navigation.navigate('Heandling')}
                            onPress={handleTicket}
                        
                        />
                    </View>
                </View>
                </View>
                </ImageBackground>
                
                
            </ScrollView>
            <Footer
                navigation = {navigation}
                focus = 'Menu'
            />
        </View>
        
    )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
    },
    boxShadowBanner:{
        width:'90%',
        height:780,
        top:-45,
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
        justifyContent: "center",
        width:'100%',
        height:780
      },
});
export default Proof