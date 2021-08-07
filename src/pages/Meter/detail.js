import { faCamera, faImages} from '@fortawesome/free-solid-svg-icons';
import React,{useEffect,useState} from 'react';
import {StyleSheet,View,ScrollView,ImageBackground,PermissionsAndroid,Image,Text} from 'react-native';
import {launchCamera} from 'react-native-image-picker';import {Footer,Button,Title,Input,TextInput,TextArea,ButtonIcon,ImageFoto} from '../../component';
import Distance from '../../utils/distance'

const DetailMeter =({navigation})=>{
    const background= require('../../assets/img/BackgroundInput.png')
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
                                            <Title title="Detail Baca Meter" width={'90%'}/>
                                            <TextInput title="ID Pelanggan" width='90%'/> 
                                            <Text style={styles.text} >ID</Text>
                                            <TextInput title="Bulan" width='90%'/>
                                            <Text style={styles.text} >Bulan</Text>
                                            <TextInput title="Pemakaian" width='90%'/>
                                            <Text style={styles.text} >Pemakaian</Text>
                                            <TextInput title="Status" width='90%'/>
                                            <Text style={styles.text} >Status</Text>
                                            <TextInput title="Foto" width='90%'/> 
                                            <Image source={require('../../assets/img/ImageFotoLoading.png')} style={{width:150, height:150}}/>                                        
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