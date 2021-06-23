import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    ImageBackground
  } from 'react-native';
  import {Footer,Button,Title,Input,TextInput} from '../../component';
  import Background from '../../assets/img/background.svg'
  import { faQrcode } from '@fortawesome/free-solid-svg-icons';
const Public =({navigation})=>{
    return(
        <View style={styles.container}> 
            <ScrollView>
                <View style={{backgroundColor:'#FFFFFF', width:'100%', height:165}}>
                </View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
               
                <View style={{alignItems:'center'}}>
                    <View style={styles.boxShadowBanner}>
                        
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Title
                        title="Masyarakat Umum"
                        />
                        <TextInput
                        title="Nama"
                        />
                        <Input
                        placeholder="Nama"
                         />
                         <TextInput
                        title="Alamat"
                        />
                        <Input
                        placeholder="Alamat"
                         />
                         <TextInput
                        title="No Handphone"
                        />
                        <Input
                        placeholder="No Handphone"
                         />
                    </View>
                    <View style={{alignItems:'center',paddingVertical:10}}>
                        <Button
                        title="Lanjut"
                        navigation={()=>navigation.navigate('SMS')}
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
        height:490,
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
        
      },
});
export default Public