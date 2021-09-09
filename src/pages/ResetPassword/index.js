import React from 'react'
import Distance from '../../utils/distance';
import { ImageBackground, ScrollView, StyleSheet, PermissionsAndroid, Image, Text, TouchableOpacity, View } from 'react-native';
import { Button, ButtonIcon, Input, TextArea, TextInput, Title, Spinner } from '../../component';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { launchCamera } from 'react-native-image-picker';
import { useSelector } from 'react-redux';
import RNFetchBlob from 'react-native-fetch-blob';
import { useIsFocused } from '@react-navigation/native';
import API from '../../service';


const ResetPassword=({navigation})=>{
    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={{ backgroundColor: '#FFFFFF', width: '100%', height: 165 }}></View>
                <ImageBackground source={require('../../assets/img/background.png')} style={styles.image}>
                        <View style={{ alignItems: 'center' }}>
                            <View style={styles.boxShadowBanner}>
                                <View style={{ alignItems: 'center', paddingVertical: 10 }}>
                                    <Title title="Reset Password"/>
                                    <Distance distanceV={15} />
                                    <TextInput title="No Telepon"/>
                                    <Input placeholder="Masukan No Telepon"/>
                                    <Distance distanceV={15} />
                                    <Button title="Kirim" onPress={()=>navigation.navigate('Login')} />
                                    <Distance distanceV={10}/>
                                </View>
                            </View>
                        </View>
                </ImageBackground>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    boxShadowBanner: {
        width: '90%',
        height: '100%',
        top: -45,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
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
        width: '100%',
        height: 600,
    },
})
export default ResetPassword