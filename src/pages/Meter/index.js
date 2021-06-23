import { faCamera, faImage } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {
    StyleSheet,
    View,
    ScrollView,
    ImageBackground
  } from 'react-native';
  import {launchCamera,launchImageLibrary} from 'react-native-image-picker';
  import {
    Footer,
    Button,
    Title,
    Input,
    TextInput,
    TextArea,
    Dropdown,
    ButtonIcon} from '../../component';
const Meter =({navigation})=>{
    const [response, setResponse] = React.useState(null);
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
                        title="Meter Mandiri"
                        />
                        <TextInput
                        title="ID Pelanggan"
                        />
                        <Input
                        placeholder="ID Pelanggan"
                        />
                         <TextInput
                        title="Stand Meter"
                        />
                        <Input
                        placeholder="Stand Meter"
                        />
                         <TextInput
                        title="Foto"
                        />
                        <View style={{width:'80%', height:150, borderWidth:1, borderColor:'#c4c4c4'}}>
                        </View>
                        <View style={{flexDirection:'row', width:'90%',paddingTop:10}}>
                            <View style={{ flex:1,alignItems:'center'}}>
                                <ButtonIcon
                                title="Ambil Foto"
                                icon={faCamera}
                                width='85%'
                                navigation={()=>launchCamera(
                                    {
                                        mediaType: 'photo',
                                        includeBase64: false,
                                        maxHeight: 200,
                                        maxWidth: 200,
                                    },
                                    (response) => {
                                        setResponse(response);
                                    },
                                    )}
                                />
                            </View>
                            <View style={{flex:1,alignItems:'center'}}>
                                <ButtonIcon
                                title="Pilih Foto"
                                icon={faImage}
                                width='85%'
                                navigation={()=>launchImageLibrary(
                                    {
                                      mediaType: 'photo',
                                      includeBase64: false,
                                      maxHeight: 200,
                                      maxWidth: 200,
                                    },
                                    (response) => {
                                      setResponse(response);
                                    },
                                  )}
                                />
                            </View>
                        </View>
                         <TextInput
                        title="Keterangan"
                        />
                        <TextArea
                        placeholder="Keterangan"
                         />
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Button
                        title="Kirim"
                        navigation={()=>navigation.navigate('Menu')}
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
export default Meter