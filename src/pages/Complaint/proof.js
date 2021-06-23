import { faCamera,faVideo } from '@fortawesome/free-solid-svg-icons';
import React,{useEffect,useState}from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground,
    PermissionsAndroid,
    Image,
    Video
  } from 'react-native';
  import {launchCamera} from 'react-native-image-picker';
  import {
    Footer,
    Title,
    ButtonIcon,
    TextInput,
    Button,
    VideoPlayer} from '../../component';
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
const Proof =({navigation})=>{
    const [response, setResponse] = React.useState(null);
        useEffect(() => {
            requestCameraPermission()
        })
    // const [response, setResponse] = useState(null)
    const [image, setImage] = useState({
        name : null,
        filename : null,
        data : null
    })
    const [video, setVideo] = useState(null)
    return(
        <View style={styles.container}> 
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
                        navigation={()=>launchCamera(
                            {
                                mediaType: 'photo',
                                includeBase64:true,
                                maxHeight: 200,
                                maxWidth: 200,
                            },
                            (response) => {
                                setResponse(response);
                                setImage({
                                    name : 'img',
                                    filename : response.fileName,
                                    data : response.base64
                                })
                                // console.log(response)
                            },
                            )}
                        />
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
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
                            navigation={()=>launchCamera(
                                {
                                    mediaType: 'video'
                                }, 
                                (response) => {
                                setVideo(response);
                                
                            })
                            }
                        />
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Button
                            title="Kirim Tiket"
                            navigation={()=>navigation.navigate('Heandling')}
                        
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